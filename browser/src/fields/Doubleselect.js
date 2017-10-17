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

                        if (!$scope.config.renderOptions) {
                            $scope.config.renderOptions = {};
                        }

                        if (!$scope.config.renderOptions.seperatorLabelWidth) {
                            $scope.config.renderOptions.seperatorLabelWidth = 2;
                        }

                        if (!$scope.config.renderOptions.value1Width) {
                            $scope.config.renderOptions.value1Width = 5;
                        }

                        if (!$scope.config.renderOptions.value2Width) {
                            $scope.config.renderOptions.value2Width = 5;
                        }

                    }
                ]
            };
        }
    ];
}