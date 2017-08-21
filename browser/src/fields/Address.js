"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Address.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {

                        let errors = $scope.config.errors || {};

                        $scope.countryConfig = {
                            type: "Select",
                            id: $scope.config + ".country",
                            value: $scope.config.value ? $scope.config.value.country : null,
                            label: $scope.config.label.country,
                            errors: errors.country,
                            renderOptions: $scope.config.renderOptions,
                            options: $scope.config.renderOptions.countries
                        };

                        $scope.$watch("countryConfig.value", (val) => {
                            if (!$scope.config.value) {
                                $scope.config.value = {};
                            }

                            $scope.config.value.country = val;
                        })

                    }
                ]
            };
        }
    ];
}