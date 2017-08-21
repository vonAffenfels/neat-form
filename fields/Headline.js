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
        return crypto.createHash('md5').update(this.label).digest("hex");
    }
}