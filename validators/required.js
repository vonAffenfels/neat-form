"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");

module.exports = function (config, field, form, path) {
    if (!field.renderOptions) {
        field.renderOptions = {};
    }

    if (path) {
        if (!field.renderOptions.required) {
            field.renderOptions.required = {};
        }

        field.renderOptions.required[path] = true;
    } else {
        field.renderOptions.required = true;
    }

    return function (val) {

        if (typeof val === "string") {
            val = val.trim();
        }

        if (typeof val === "boolean") {
            return true; // if this is boolean its a valid value!
        }

        return !!val;
    }
};