"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Module = require("neat-base").Module;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const path = require("path");
const fs = require("fs");
const _ = require("underscore");
const underscoreDeepExtend = require("underscore-deep-extend");

let validatorTypes = {};

module.exports = class FormModule extends Module {

    static defaultConfig() {
        return {
            formsRootPath: "forms",
            fieldsRootPath: "forms/fields",
            validatorsRootPath: "forms/validators",
            webserverModuleName: "webserver",
            dbModuleName: "database"
        }
    }

    init() {
        _.mixin({deepExtend: underscoreDeepExtend(_)});

        this.log.debug("Initializing...");

        Application.modules[this.config.dbModuleName].registerModel("neat-form-plain", require("./models/neat-form-plain.js"));

        return this.loadForms().then(() => {

            Application.modules[this.config.webserverModuleName].addRoute("get", "/form-api/:form/:_id?", (req, res, next) => {
                let form = this.getForm(req.params.form);

                if (!form) {
                    return res.status(404).end();
                }

                let loadData = Promise.resolve();

                if (req.params._id) {
                    loadData = form.loadDataFromId(req.params._id);
                }

                return loadData.then(() => {
                    return form.getSchema()
                }).then((schema) => {
                    res.json(schema);
                });
            }, 9999);

            Application.modules[this.config.webserverModuleName].addRoute("post", "/form-api/:form", (req, res, next) => {
                let form = this.getForm(req.params.form);

                if (!form) {
                    return res.status(404).end();
                }

                if (req.body._id) {
                    form.setConnectedId(req.body._id);
                }

                return form.submit(req.body.data || {}).then((schema) => {
                    if (schema.hasError) {
                        res.status(400);
                    }
                    res.json(schema);
                });
            }, 9999);

            Application.modules[this.config.webserverModuleName].addRoute("post", "/form-api/:form/validate", (req, res, next) => {
                let form = this.getForm(req.params.form);

                if (!form) {
                    return res.status(404).end();
                }

                if (req.body._id) {
                    form.setConnectedId(req.body._id);
                }

                return form.validate(req.body.data || {}).then((valid) => {
                    return form.getSchema();
                }).then((schema) => {
                    if (schema.hasError) {
                        res.status(400);
                    }
                    res.json(schema);
                });
            }, 9999);

            return this;
        });
    }

    getForm(name) {
        let form = this.forms[name] || null;

        if (!form) {
            return form;
        }

        return new form();
    }

    /**
     *
     * @param config
     */
    getValidator(config, field, fieldPath) {
        let type;
        let form = field.getForm();

        if (typeof config === "string") {
            type = config;
            config = {};
        } else if (config instanceof Object) {
            type = config.name;
        }

        if (validatorTypes[type]) {
            return new validatorTypes[type](config, field, form, fieldPath);
        }


        Application.modules.form.log.debug("Loading Validator " + type);
        try {
            validatorTypes[type] = require(path.join(
                __dirname,
                "validators",
                type + ".js"
            ));
        } catch (e) {
            Application.modules.form.log.debug("Couldn't find Validator " + type + " in built in validators, trying external");
            validatorTypes[type] = require(path.join(
                Application.config.root_path,
                Application.modules.form.config.validatorsRootPath,
                type + ".js"
            ));
        }

        return new validatorTypes[type](config, field, form, fieldPath);
    }

    loadForms() {
        return new Promise((resolve, reject) => {
            this.forms = {};

            Tools.ensureFolderExists(this.config.formsRootPath, Application.config.root_path);
            Tools.ensureFolderExists(this.config.fieldsRootPath, Application.config.root_path);
            Tools.ensureFolderExists(this.config.validatorsRootPath, Application.config.root_path);

            let formPath = path.join(Application.config.root_path, this.config.formsRootPath);
            let files = fs.readdirSync(formPath);

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let parsed = path.parse(file);
                let stat = fs.lstatSync(path.join(formPath, file));

                if (stat.isDirectory()) {
                    continue;
                }

                try {
                    this.forms[parsed.name] = require(path.join(formPath, file));
                } catch (e) {
                    this.log.error("Error while loading form " + file + " from " + path.join(formPath, file));
                    this.log.error(e);
                }
            }

            resolve();
        });
    }

    start() {
        return new Promise((resolve, reject) => {
            this.log.debug("Starting...");
            return resolve(this);
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            this.log.debug("Stopping...");
            return resolve(this);
        });
    }

}