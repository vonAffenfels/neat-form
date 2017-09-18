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
            for (let key in this.config.options) {
                let options = this.config.options[key] || [];

                if (options instanceof Array) {
                    for (let i = 0; i < options.length; i++) {
                        let val = options[i];
                        if (!this.options[key]) {
                            this.options[key] = {};
                        }
                        this.options[key][val] = val;
                    }
                } else {
                    this.options[key] = options;
                }
            }
        }
    }

}