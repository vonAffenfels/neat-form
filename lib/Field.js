"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const crypto = require("crypto");
const Form = require("./Form.js");
const Group = require("./Group.js");

module.exports = class Field {

    /**
     *
     */
    constructor(config) {
        config = config || {};

        this.path = config.path || null;
        this.label = config.label || null;
        this.group = config.group || null;
        this.type = config.type || null;

        delete config.path;
        delete config.label;
        delete config.group;
        delete config.type;

        this.valueSet = false;
        this.value = null;
        this.displayValue = null;

        this.config = config;

        this.init();
        if (this.group) {
            this.group.addField(this);
        }
    }

    /**
     *
     */
    init() {

    }

    /**
     *
     * @returns {*}
     */
    getLabel() {
        return this.label;
    }

    /**
     *
     * @returns {*}
     */
    getPath() {
        return this.path;
    }

    /**
     *
     * @returns {null|*}
     */
    getValue() {
        if (!this.valueSet && this.config.default) {
            this.setValue(this.config.default);
        }
        return this.value;
    }

    /**
     *
     * @returns {string}
     */
    getType() {
        return this.type;
    }

    /**
     *
     * @returns {string}
     */
    getId() {
        let path = this.path;

        if (typeof path === "object") {
            try {
                path = JSON.stringify(path);
            } catch (e) {
                throw new Error("Error while generating Field id, this means path is of type object but not JSON.stringify'able");
            }
        }

        return crypto.createHash('md5').update(path).digest("hex");
    }

    /**
     *
     * @param val
     */
    setValue(val) {
        this.value = val;
        this.valueSet = true;
    }

    /**
     *
     * @returns {null}
     */
    getDisplayValue() {
        return this.displayValue;
    }

    loadSchema(defaultSchema) {
        return new Promise((resolve, reject) => {
            return resolve(defaultSchema);
        });
    }

    /**
     *
     */
    getSchema() {
        let defaultSchema = {
            value: this.getValue(),
            displayValue: this.getDisplayValue(),
            label: this.getLabel(),
            id: this.getId(),
            type: this.getType()
        };

        let schema = this.loadSchema(defaultSchema);

        if (!(schema instanceof Promise)) {
            return Promise.resolve(schema);
        }

        return schema;
    }

}