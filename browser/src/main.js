"use strict";

import ng from "angular";

const neatFormModule = ng.module("neat-form", []);

neatFormModule.directive("neatForm", [
    function () {
        return {
            restrict: "E",
            template: ` 
                {{test}}
            `,
            scope: {
                form: "="
            },
            controller: "neatFormCtrl"
        };
    }
]);

neatFormModule.controller("neatFormCtrl", [
    "$scope",
    function ($scope) {
        $scope.test = "a";
    }
]);
