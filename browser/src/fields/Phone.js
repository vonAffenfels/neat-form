"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Phone.html"),
                scope: {
                    config: "=",
                    form: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {

                    },
                ],
            };
        },
    ];
};