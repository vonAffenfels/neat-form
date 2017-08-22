"use strict";

// @IMPORTS
const fs = require("fs");
const Application = require("neat-base").Application;
const Module = require("neat-base").Module;
const Tools = require("neat-base").Tools;
const mongoose = Application.modules.database.mongoose;

let schema = new mongoose.Schema({}, {
    strict: false,
    permissions: {
        find: true,
        findOne: true,
        count: true,
        schema: true,
        save: "own",
        remove: "own"
    },
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

module.exports = schema;