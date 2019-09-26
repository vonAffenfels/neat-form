"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");

module.exports = function (config, field, form, path) {
    return function (val) {

        if (typeof val !== "boolean") {
            return false;
        }

        return !!val;
    }
};