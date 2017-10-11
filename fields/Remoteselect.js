"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const Select = require("neat-form/fields/Select");

module.exports = class Remoteselect extends Select {

    //
    // init(){
    //     this.isSubform = true;
    // }

    loadSchema(defaultSchema) {

        return new Promise((resolve, reject) => {

            if(this.renderOptions.remotePath){
                let remoteField = this.getForm().getFieldByPath(this.renderOptions.remotePath);
                defaultSchema.renderOptions.remoteFieldId = remoteField.getId();
            }

            return resolve(defaultSchema);
        });
    }
}