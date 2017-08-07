"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("./Field.js");
const Group = require("./Group.js");
const path = require("path");

let fieldTypes = {};

module.exports = class Form {

    /**
     *
     */
    constructor() {
        this.groups = [];
        this.fields = {};
        this.connectedId = null;

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

        let id = field.getId();

        if (this.fields[id]) {
            throw new Error("Duplicated id " + id + "!", field);
        }

        this.fields[id] = field;
        return field;
    }

    /**
     *
     * @param type
     */
    loadField(type) {
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
                return groups.fields;
            } else {
                // check if first (default) group is empty
                if (groups[0].fields.length === 0) {
                    // ok ... drop it
                    groups.shift();
                }
            }

            return groups;
        });
    }

    /**
     *
     * @param data
     */
    submit(data) {
        return this.loadData(data).then(() => {
            return this.validate();
        }).then((valid) => {
            if (valid) {
                return this.save();
            } else {
                return this.getSchema();
            }
        }, () => {
            return this.getSchema();
        }).then(() => {
            return this.getSchema();
        });
    }

    loadDataFromId(_id) {
        if (!_id) {
            return Promise.resolve();
        }

        let model = this.getModel();
        this.connectedId = _id;

        try {
            return model.findOne({
                _id: _id
            }).then((doc) => {
                return this.loadDataFromDocument(doc);
            })
        } catch (e) {
            return Promise.resolve();
        }
    }

    loadDataFromDocument(doc) {
        return Promise.map(Object.keys(this.fields), (fieldKey) => {
            let path = this.fields[fieldKey].getPath();
            let fieldValue;
            if (path instanceof Object) {
                fieldValue = {};
                for (let pathKey in path) {
                    fieldValue[pathKey] = doc.get(path[pathKey]);
                }
            } else {
                fieldValue = doc.get(path);
            }

            this.fields[fieldKey].setValue(fieldValue);
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

                    return doc.save();
                });
            } else {
                let doc = new model(values);
                return doc.save();
            }
        }).then(() => {
            return;
        }, (mongooseValidationErrors) => {
            let errs = Tools.formatMongooseError(mongooseValidationErrors);
            this.setErrorByPath(errs);
            return;
        });
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

            return field.setValue(fieldValue);
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
            let value = this.fields[fieldKey].getDocumentValue();
            let path = this.fields[fieldKey].getPath();
            if (value instanceof Object) {
                for (let pathKey in path) {
                    documentValues[path[pathKey]] = value[pathKey];
                }
            } else {
                documentValues[path] = value;
            }
        }).then(() => {
            return documentValues;
        }, () => {
            return documentValues;
        });
    }


}