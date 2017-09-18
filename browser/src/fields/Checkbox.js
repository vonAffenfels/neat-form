"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Checkbox.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    "$sce",
                    function ($scope, $sce) {
                        if (typeof $scope.config.label === "string") {
                            $scope.config.label = $sce.trustAsHtml($scope.config.label);
                        }
                    }
                ]
            };
        }
    ];
}