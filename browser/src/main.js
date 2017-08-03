"use strict";

import ng from "angular";
import neatApi from "neat-api";

const neatFormModule = ng.module("neat-form", [
    "neat-api"
]);

neatFormModule.directive("neatForm", [
    function () {
        return {
            restrict: "E",
            template: ` 
                {{config}}
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
    "neatApi",
    function ($scope, neatApi) {
        $scope.config = neatApi.form({
            form: $scope.form
        });
    }
]);
