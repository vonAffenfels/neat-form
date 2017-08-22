"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("../lib/Field.js");

module.exports = class Subformarray extends Field {

    validate() {
        return Promise.map(this.value || [], (val) => {
            let subform = Application.modules.form.getForm(this.config.subform);
            return subform.loadDataFromDocument(val, true).then(() => {
                return subform.validate();
            });
        }).then((values) => {
            this.validated = true;
            this.valid = values.indexOf(false) === -1;
            return this.valid;
        });
    }

    setValue(value, fromDocument) {
        if (!fromDocument) {
            return Promise.map(value || [], (val) => {
                let subform = Application.modules.form.getForm(this.config.subform);
                return subform.loadData(val).then(() => {
                    return subform.getDocumentValues();
                });
            }).then((values) => {
                this.value = values;
            });
        }

        this.value = value;
        return Promise.resolve();
    }

    getDocumentValue() {
        return Promise.map(this.value || [], (val) => {
            let subform = Application.modules.form.getForm(this.config.subform);
            return subform.loadData(val).then(() => {
                return subform.getDocumentValues();
            }).then((value) => {
                return value;
            });
        });
    }

    loadSchema(defaultSchema) {
        return new Promise((resolve, reject) => {
            if (!this.config.subform) {
                return resolve(defaultSchema);
            }

            return Promise.map(this.value || [], (val) => {
                let subform = Application.modules.form.getForm(this.config.subform);
                return subform.loadDataFromDocument(val).then(() => {
                    if (defaultSchema.validated) {
                        return subform.validate().then(() => {
                            return subform.getSchema();
                        });
                    } else {
                        return subform.getSchema();
                    }
                });
            }).then((subformValues) => {
                defaultSchema.value = subformValues;
                let subform = Application.modules.form.getForm(this.config.subform);
                return subform.getSchema();
            }).then((subformschema) => {
                defaultSchema.subform = subformschema;
                return resolve(defaultSchema);
            }, reject);
        });
    }

}