"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("../lib/Field.js");

module.exports = class Radio extends Field {

    /**
     *
     */
    init() {
        this.options = {};

        let options = this.config.options || [];

        if (options instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                let val = options[i];
                this.options[val] = val;
            }
        } else {
            this.options = options;
        }
    }

    loadSchema(defaultSchema) {
        defaultSchema.options = this.options;
        return defaultSchema;
    }

    /**
     *
     * @param val
     */
    setValue(val) {
        this.value = val;
        this.displayValue = this.options[val];
        this.valueSet = true;
    }

}