"use strict";

import ngMap from 'ngmap'
import ngDatePicker from 'angular-date-picker'
import angularFileUpload from 'angular-file-upload'
import googlePlaces from 'angular-google-places-autocomplete'
import angularLoad from 'angular-load'

(function (window, ng) {

    let neatApi = require("neat-api");
    const neatFormModule = ng.module("neat-form", [
        "ngMap",
        "mp.datePicker",
        "google.places",
        "angularFileUpload",
        "angularLoad",
        "neat-api"
    ]);

    neatFormModule.templateRoot = "./templates/";

    require("./form.js")(neatFormModule);
    require("./section.js")(neatFormModule);
    require("./field.js")(neatFormModule);

    neatFormModule.filter("optionSort", function () {
        return function (obj) {
            let result = [];
            ng.forEach(obj, function (label, value) {
                result.push({
                    value,
                    label
                });
            });
            return result;
        };
    });

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
