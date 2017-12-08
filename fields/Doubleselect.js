"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Radio = require("./Radio.js");

module.exports = class DoubleSelect extends Radio {

    /**
     *
     */
    init() {
        this.options = {};

        if (this.config.options) {
            for (let fieldKey in this.config.options) {
                let options = this.config.options[fieldKey] || [];

                if (options instanceof Object) {
                    let opts = [];
                    for (let key in options) {
                        opts.push({
                            label: options[key],
                            value: key
                        });
                    }
                    this.options[fieldKey] = opts;
                } else {
                    this.options[fieldKey] = options;
                }
            }
        }
    }

}