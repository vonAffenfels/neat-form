"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Field = require("./Field.js");
const Group = require("./Group.js");
const path = require("path");

let fieldTypes = {};

module.exports = class Form {

    /**
     *
     */
    constructor() {
        this.groups = [];
        this.fields = {};

        this.defaultGroup = this.addGroup({
            label: "DEFAULT"
        });

        this.init();
    }

    /**
     *
     */
    init() {

    }

    /**
     *
     * @param group
     */
    addGroup(group) {
        if (!(group instanceof Group)) {
            group = new Group(group);
        }

        this.groups.push(group);
        return group;
    }

    /**
     *
     * @param field
     */
    addField(field) {

        if (!(field instanceof Field)) {
            if (!field.group) {
                field.group = this.defaultGroup;
            }

            let type = field.type;

            if (!type) {
                field = new Field(field);
            } else {
                let FieldTypeClass = this.loadField(type);
                field = new FieldTypeClass(field);
            }
        }

        let path = field.getPath();

        if (this.fields[path]) {
            throw new Error("Duplicated path " + path + "!");
        }

        return field;
    }

    /**
     *
     * @param field
     */
    loadField(type) {
        if (fieldTypes[type]) {
            return fieldTypes[type];
        }

        Application.modules.form.log.debug("Loading Field " + type);
        try {
            fieldTypes[type] = require(path.join(
                "../fields",
                type + ".js"
            ));
        } catch (e) {
            Application.modules.form.log.debug("Couldn't find Field " + type + " in built in fields, trying external");
            fieldTypes[type] = require(path.join(
                Application.config.root_path,
                Application.modules.form.config.fieldsRootPath,
                type + ".js"
            ));
        }

        return fieldTypes[type];
    }

    /**
     *
     */
    getSchema() {
        return Promise.map(this.groups, (group) => {
            return group.getSchema();
        }).then((groups) => {
            if (groups.length === 1) {
                return groups.fields;
            } else {
                // check if first (default) group is empty
                if (groups[0].fields.length === 0) {
                    // ok ... drop it
                    groups.shift();
                }
            }

            return groups;
        });
    }


}