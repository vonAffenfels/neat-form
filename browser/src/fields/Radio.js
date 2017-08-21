"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Radio.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {
                        // make this a string because of object options we cant have numbers as keys (values)
                        $scope.config.value = typeof $scope.config.value === "number" ? String($scope.config.value) : $scope.config.value;
                    }
                ]
            };
        }
    ];
}