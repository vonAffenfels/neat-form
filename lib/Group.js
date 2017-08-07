"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Form = require("./Form.js");

module.exports = class Group {

    /**
     *
     */
    constructor(data) {
        data = data || {};

        if (!data.label) {
            throw new Error("Every neat-form/lib/Group needs a label");
        }

        this.label = data.label;
        this.columns = data.columns || 1;
        this.fields = [];
        this.form = null;
        this.init();
    }

    /**
     *
     */
    init() {

    }

    setForm(form) {
        this.form = form;
    }

    getLabel() {
        return this.label;
    }

    addField(field) {
        const Field = require("./Field.js");

        if (!(field instanceof Field)) {
            throw new Error("field needs to be an instance of neat-form/lib/Field.js");
        }

        this.fields.push(field);
    }

    /**
     *
     */
    getSchema() {
        return Promise.map(this.fields, (field) => {
            return field.getSchema();
        }).then((fields) => {
            return {
                label: this.getLabel(),
                columns: this.columns,
                fields: fields
            };
        });
    }

    /**
     *
     */
    validate() {
        return Promise.map(this.fields, (field) => {
            return field.validate();
        }).then((values) => {
            return values.indexOf(false) === -1;
        });
    }

}