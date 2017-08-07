"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");

module.exports = function (config, field, form) {
    return function (val) {
        if (typeof val === "string") {
            val = val.trim();
        }

        return !!val;
    }
};