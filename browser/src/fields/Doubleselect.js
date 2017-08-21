"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Doubleselect.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {

                    }
                ]
            };
        }
    ];
}