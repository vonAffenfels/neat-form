"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("../lib/Field.js");
const crypto = require("crypto");

module.exports = class Headline extends Field {

    /**
     *
     * @returns {string}
     */
    getId() {
        let number = 0;
        let form = this.getForm();

        if (form) {
            if (form.headlineCounter === undefined) {
                form.headlineCounter = 0;
            } else {
                form.headlineCounter++;
            }

            number = form.headlineCounter;
        }

        return crypto.createHash('md5').update("headline-" + this.label + "-" + number).digest("hex");
    }

    loadSchema(defaultSchema) {
        if (!defaultSchema.renderOptions) {
            defaultSchema.renderOptions = {};
        }

        // set this so groups hide when only headlines are left!
        defaultSchema.renderOptions.ignoreVisibility = true;

        return defaultSchema;
    }
}