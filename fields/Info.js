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
        return crypto.createHash('md5').update("info-" + this.label).digest("hex");
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