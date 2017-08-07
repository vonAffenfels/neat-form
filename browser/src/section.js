"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatFormSection", [
        function () {
            return {
                restrict: "E",
                template: require(neatFormModule.templateRoot + "neatFormSection.html"),
                scope: {
                    config: "="
                },
                controller: "neatFormSectionCtrl"
            };
        }
    ]);

    neatFormModule.controller("neatFormSectionCtrl", [
        "$scope",
        function ($scope) {
        }
    ]);

}