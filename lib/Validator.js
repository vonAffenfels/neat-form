"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Form = require("./Form.js");
const Field = require("./Field.js");
const Group = require("./Group.js");

module.exports = class Validator {

    /**
     *
     */
    constructor(data) {
        data = data || {};

        this.init();
    }

    /**
     *
     */
    init() {

    }

}