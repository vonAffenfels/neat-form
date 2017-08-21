"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("../lib/Field.js");

module.exports = class MultiImageUpload extends Field {


    getDocumentValue() {
        if (this.value instanceof Array) {
            return this.value.map((val) => {
                if (val) {
                    return val._id || val;
                }

                return val;
            }).filter((v => !!v))
        }

        return this.value;
    }

}