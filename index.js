"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Module = require("neat-base").Module;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const path = require("path");
const fs = require("fs");

module.exports = class FormModule extends Module {

    static defaultConfig() {
        return {
            formsRootPath: "forms",
            fieldsRootPath: "forms/fields",
            webserverModuleName: "webserver"
        }
    }

    init() {
        this.log.debug("Initializing...");
        return this.loadForms().then(() => {

            Application.modules[this.config.webserverModuleName].addRoute("get", "/form-api/:form", (req, res, next) => {
                let form = this.getForm(req.params.form);

                if (!form) {
                    return res.status(404).end();
                }

                return form.getSchema().then((schema) => {
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

    loadForms() {
        return new Promise((resolve, reject) => {
            this.forms = {};

            Tools.ensureFolderExists(this.config.formsRootPath, Application.config.root_path);
            Tools.ensureFolderExists(this.config.fieldsRootPath, Application.config.root_path);

            let formPath = path.join(Application.config.root_path, this.config.formsRootPath);
            let files = fs.readdirSync(formPath);

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let parsed = path.parse(file);
                let stat = fs.lstatSync(path.join(formPath, file));

                if (stat.isDirectory()) {
                    continue;
                }

                this.forms[parsed.name] = require(path.join(formPath, file));
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