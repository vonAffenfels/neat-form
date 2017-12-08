"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");

module.exports = function (config, field, form, path) {
    return function (val) {
        if (field.options && field.options instanceof Array) {
            for (let i = 0; i < field.options.length; i++) {
                let obj = field.options[i];
                if (obj.value === val) {
                    return true;
                }
            }
        }

        return false;
    }
}