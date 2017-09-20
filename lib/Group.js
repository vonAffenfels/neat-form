"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Form = require("./Form.js");
const crypto = require("crypto");

module.exports = class Group {

    /**
     *
     */
    constructor(data) {
        data = data || {};

        this.label = data.label || "";
        this.legend = data.legend || "";
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

    /**
     *
     * @returns {string}
     */
    getId() {
        let label = this.label;

        if (typeof label === "object") {
            try {
                label = JSON.stringify(label);
            } catch (e) {
                throw new Error("Error while generating Group id, this means path is of type object but not JSON.stringify'able");
            }
        }

        return crypto.createHash('md5').update(label).digest("hex");
    }

    setForm(form) {
        this.form = form;
    }

    getLabel() {
        return this.label;
    }
    getLegend() {
        return this.legend;
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
            let hasError = false;

            for (let i = 0; i < fields.length; i++) {
                let field = fields[i];

                if (field.errors) {
                    hasError = true;
                }
            }

            return {
                label: this.getLabel(),
                id: this.getId(),
                legend: this.getLegend(),
                columns: this.columns,
                hasError: hasError,
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