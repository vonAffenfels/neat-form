"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");

module.exports = function (config, field, form, path) {
    return function (val) {
        if (field.options && field.options instanceof Object) {
            if (field.options[val]) {
                return true;
            }
        }

        return false;
    }
}