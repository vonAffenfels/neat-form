"use strict";

import ngMap from 'ngmap'
import ngDatePicker from 'angular-date-picker'
import angularFileUpload from 'angular-file-upload'

(function (window, ng) {

    let neatApi = require("neat-api");
    const neatFormModule = ng.module("neat-form", [
        "ngMap",
        "mp.datePicker",
        "angularFileUpload",
        "neat-api"
    ]);

    neatFormModule.templateRoot = "./templates/";

    require("./form.js")(neatFormModule);
    require("./section.js")(neatFormModule);
    require("./field.js")(neatFormModule);

    let fieldContext = require.context("./fields", true, /^.*\.js$/);
    fieldContext.keys().forEach(function (directivePath) {
        let parts = directivePath.split("/");
        parts.shift();
        let firstPart = parts.shift();
        let directiveName = "neatFormField" + firstPart;
        directiveName = directiveName.replace(/\.js$/i, "");
        directivePath = directivePath.replace(/^\.\//i, "");
        neatFormModule.directive(directiveName, require("./fields/" + directivePath)(neatFormModule));
    });

})(window, window.angular);
