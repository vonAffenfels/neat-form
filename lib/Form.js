"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("./Field.js");
const Group = require("./Group.js");
const path = require("path");
const crypto = require("crypto");
const _ = require("underscore");

let fieldTypes = {};

module.exports = class Form {

    /**
     *
     */
    constructor() {
        this.groups = [];
        this.fields = {};
        this.connectedId = null;
        this.valid = true;

        this.defaultGroup = this.addGroup({
            label: "DEFAULT"
        });

        this.init();
    }

    /**
     *
     */
    init() {

    }

    getModel() {
        return Application.modules.database.getModel(this.model);
    }

    /**
     *
     * @param group
     */
    addGroup(group) {
        if (!(group instanceof Group)) {
            group = new Group(group);
        }

        this.groups.push(group);
        group.setForm(this);
        return group;
    }

    /**
     *
     * @param field
     */
    addField(field) {
        let id;

        if (field.path) {
            id = this.getFieldIdFromPath(field.path);

            // return existing field instance if we need a duplicate!
            if (this.fields[id]) {
                // add field to the other group
                if (field.group) {
                    field.group.addField(this.fields[id]);
                }
                return this.fields[id];
            }
        }

        if (!(field instanceof Field)) {
            if (!field.group) {
                field.group = this.defaultGroup;
            }

            let type = field.type;

            if (!type) {
                field = new Field(field);
            } else {
                let FieldTypeClass = this.loadField(type);
                field = new FieldTypeClass(field);
            }
        }

        id = field.getId();

        this.fields[id] = field;
        return field;
    }


    /**
     *
     * @returns {string}
     */
    getFieldIdFromPath(path) {
        if (typeof path === "object") {
            try {
                path = JSON.stringify(path);
            } catch (e) {
                throw new Error("Error while generating Field id, this means path is of type object but not JSON.stringify'able");
            }
        }

        let id = crypto.createHash('md5').update(path).digest("hex");
        return id;
    }

    /**
     *
     * @param type
     */
    loadField(type) {
        type = type.toLowerCase();
        type = type.charAt(0).toUpperCase() + type.slice(1);

        if (fieldTypes[type]) {
            return fieldTypes[type];
        }

        Application.modules.form.log.debug("Loading Field " + type);
        try {
            fieldTypes[type] = require(path.join(
                "../fields",
                type + ".js"
            ));
        } catch (e) {
            Application.modules.form.log.debug("Couldn't find Field " + type + " in built in fields, trying external");
            fieldTypes[type] = require(path.join(
                Application.config.root_path,
                Application.modules.form.config.fieldsRootPath,
                type + ".js"
            ));
        }

        return fieldTypes[type];
    }

    /**
     *
     */
    getSchema() {
        return Promise.map(this.groups, (group) => {
            return group.getSchema();
        }).then((groups) => {
            if (groups.length === 1) {
                return {
                    fields: groups[0].fields,
                    hasError: groups[0].hasError
                };
            } else {
                // check if first (default) group is empty
                if (groups[0].fields.length === 0) {
                    // ok ... drop it
                    groups.shift();
                }
            }

            let hasError = !this.valid || false;

            let options = _.deepExtend({
                labels: {
                    save: "Save",
                    update: "Save",
                    reset: "Reset"
                },
                groups: {
                    saveButtons: true,
                    collapsible: true,
                    maximize: true,
                    navigation: true
                }
            }, this.renderOptions || {});

            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                if (group.hasError) {
                    hasError = true;
                }
            }

            return {
                groups: groups,
                submitted: true,
                connectedId: this.connectedId,
                hasError: hasError,
                renderOptions: options,
                isSubform: this.isSubform || false
            };
        });
    }

    /**
     *
     * @param data
     */
    submit(data) {
        this.submitted = true;
        return this.loadData(data).then((loadedData) => {
            return this.validate(loadedData);
        }).then((valid) => {
            if (valid) {
                this.valid = true;
                return this.save().then(() => {
                    return this.loadDataFromId(this.connectedId);
                });
            } else {
                this.valid = false;
            }
        }, (mongooseValidationErrors) => {
            let errs = Tools.formatMongooseError(mongooseValidationErrors);
            this.setErrorByPath(errs);
            return;
            this.valid = false;
        }).then(() => {
            return this.getSchema();
        });
    }

    setConnectedId(_id) {
        this.connectedId = _id;
    }

    loadDataFromId(_id) {
        if (!_id) {
            return Promise.resolve();
        }

        let model = this.getModel();
        this.setConnectedId(_id);

        try {
            return model.findOne({
                _id: _id
            }).read("primary").then((doc) => {
                return this.loadDataFromDocument(doc);
            })
        } catch (e) {
            return Promise.resolve();
        }
    }

    loadDataFromDocument(doc, debug) {
        if (!doc) {
            return Promise.resolve();
        }

        return Promise.map(Object.keys(this.fields), (fieldKey) => {

            let path = this.fields[fieldKey].getPath();
            let fieldValue;

            if (!(doc instanceof Application.modules.database.mongoose.Model) && doc.constructor.name !== "EmbeddedDocument") {
                let tempModel = Application.modules.database.getModel(this.model || "neat-form-plain");
                doc = new tempModel(doc);
            }

            if (!path) {
                return;
            }

            let populatePromise = Promise.resolve();

            if (this.fields[fieldKey].config.populate) {
                populatePromise = new Promise((resolve, reject) => {

                    // subdocuments dont have a populate in their constructor (weird)
                    if (doc.constructor.name === "EmbeddedDocument") {
                        return resolve();
                    }

                    doc.populate(this.fields[fieldKey].config.populate, (err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    })
                });
            }

            return populatePromise.then(() => {

                if (path instanceof Object) {
                    fieldValue = {};
                    for (let pathKey in path) {
                        fieldValue[pathKey] = doc.get(path[pathKey]);
                    }
                } else {
                    fieldValue = doc.get(path);
                }

                return Promise.resolve().then(() => {
                    return this.fields[fieldKey].setValue(fieldValue, true);
                });
            });
        });
    }

    save() {
        return this.getDocumentValues().then((values) => {
            let model = this.getModel();

            if (this.connectedId) {
                return model.findOne({_id: this.connectedId}).then((doc) => {
                    if (!doc) {
                        throw new Error("Connected document does not exist");
                    }

                    for (let path in values) {
                        doc.set(path, values[path]);
                    }

                    return this.onUpdate(doc, values);
                });
            } else {
                let doc = new model();

                for (let path in values) {
                    doc.set(path, values[path]);
                }

                return this.onCreate(doc, values).then(() => {
                    return this.setConnectedId(doc._id);
                });
            }
        }).then(() => {
            return;
        }, (mongooseValidationErrors) => {
            let errs = Tools.formatMongooseError(mongooseValidationErrors);
            this.setErrorByPath(errs);
            this.valid = false;
            return;
        }).catch((err) => {
            let errs = Tools.formatMongooseError(err);
            this.setErrorByPath(errs);
            this.valid = false;
            return;
        });
    }

    onSave(doc, values) {
        return doc.save();
    }

    onUpdate(doc, values) {
        return this.onSave(doc, values);
    }

    onCreate(doc, values) {
        return this.onSave(doc, values);
    }

    setErrorByPath(path, error) {
        if (arguments.length === 1 && path instanceof Object) {
            for (let pathkey in path) {
                let err = path[pathkey];
                this.setErrorByPath(pathkey, err);
            }
            return;
        }

        let field = this.getFieldByPath(path);
        if (!field) {
            return;
        }

        return field.setErrorByPath(path, error);
    }

    /**
     *
     * @param data
     */
    loadData(data) {
        return Promise.map(Object.keys(data), (fieldId) => {
            let fieldValue = data[fieldId];
            let field = this.getFieldById(fieldId);

            if (!field) {
                return;
            }

            return field.setValue(fieldValue, false);
        });
    }

    /**
     *
     * @param string id
     */
    getFieldById(id) {
        return this.fields[id];
    }

    /**
     *
     * @param string path
     */
    getFieldByPath(path) {
        for (var fieldKey in this.fields) {
            let field = this.fields[fieldKey];

            let fieldPath = field.getPath();

            if (fieldPath instanceof Object) {
                for (let pathKey in fieldPath) {
                    let realPath = fieldPath[pathKey];
                    if (realPath === path) {
                        return field;
                    }
                }
            } else if (fieldPath === path) {
                return field;
            }
        }
    }

    isUpdate() {
        return !!this.connectedId;
    }

    isNew() {
        return !!this.connectedId;
    }

    validate(data) {
        let loadPromise;

        if (data) {
            loadPromise = this.loadData(data);
        } else {
            loadPromise = Promise.resolve();
        }

        return loadPromise.then(() => {
            return Promise.map(this.groups, (group) => {
                return group.validate();
            }).then((values) => {
                return values.indexOf(false) === -1;
            });
        });
    }

    getDocumentValues() {
        let documentValues = {};
        return Promise.map(Object.keys(this.fields), (fieldKey) => {
            return Promise.resolve().then(() => {
                return this.fields[fieldKey].getDocumentValue();
            }).then((value) => {
                let path = this.fields[fieldKey].getPath();

                if (value instanceof Object && path instanceof Object && !(value instanceof Array)) {
                    for (let pathKey in path) {
                        documentValues[path[pathKey]] = value[pathKey];
                    }
                } else {
                    documentValues[path] = value;
                }
            });
        }).then(() => {
            return documentValues;
        }, () => {
            return documentValues;
        });
    }

    and() {
        let conditions = {};
        for (let i = 0; i < arguments.length; i++) {
            let condition = arguments[i];
            for (let key in condition) {
                conditions[key] = condition[key];
            }
        }
        return conditions;
    }


}