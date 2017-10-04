"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("../lib/Field.js");

module.exports = class Subform extends Field {

    validate() {
        let subform = Application.modules.form.getForm(this.config.subform);
        return subform.loadDataFromDocument(this.value, true).then((val) => {
            return subform.validate();
        }).then((valid) => {
            this.validated = true;
            this.valid = valid || false;
            return this.valid;
        });
    }

    setValue(value, fromDocument) {
        if (!fromDocument) {
            let subform = Application.modules.form.getForm(this.config.subform);
            return subform.loadData(value).then(() => {
                return subform.getDocumentValues();
            }).then((values) => {
                this.value = values;
                this.valueSet = true;
                this.validated = false;
            });
        }

        this.value = value || {};
        this.valueSet = true;
        this.validated = false;
        return Promise.resolve();
    }

    getDocumentValue() {
        let subform = Application.modules.form.getForm(this.config.subform);
        return subform.loadDataFromDocument(this.value).then(() => {
            return subform.getDocumentValues();
        }).then((value) => {
            return value;
        });
    }

    loadSchema(defaultSchema) {
        return new Promise((resolve, reject) => {

            if (!this.config.subform) {
                return resolve(defaultSchema);
            }

            let subform = Application.modules.form.getForm(this.config.subform);

            return subform.loadDataFromDocument(this.value).then((val) => {
                if (defaultSchema.validated) {
                    return subform.validate().then(() => {
                        return subform.getSchema();
                    });
                } else {
                    return subform.getSchema();
                }
            }).then((subformschema) => {
                defaultSchema.value = subformschema;
                return resolve(defaultSchema);
            }, reject);
        });
    }

}