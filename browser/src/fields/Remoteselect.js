"use strict";

module.exports = function (neatFormModule) {
    return [
        "$timeout",
        "$http",
        function ($timeout, $http) {
            return {
                restrict: "E",
                template: require("./Remoteselect.html"),
                scope: {
                    config: "=",
                    form: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {
                        $scope.loading = false;

                        // make this a string because of object options we cant have numbers as keys (values)
                        $scope.config.value = typeof $scope.config.value === "number" ? String($scope.config.value) : $scope.config.value;

                        if ($scope.config.renderOptions && $scope.config.renderOptions.remoteFieldId) {
                            $scope.form.$on("neat-form-field-valuechange-" + $scope.config.renderOptions.remoteFieldId, (event, newValue, oldValue) => {
                                alert("HERE");

                                if (!$scope.options || newValue != oldValue) {
                                    $scope.loading = true;
                                    $http.get($scope.config.renderOptions.remoteUrl + newValue).then((result) => {
                                        $scope.loading = false;
                                        $scope.setOptions(result.data);
                                    });
                                }
                            });
                        }

                        $scope.$watch("value", () => {
                            if ($scope.config && $scope.value) {
                                $scope.config.value = $scope.value.value;
                            }
                        });

                        $scope.setOptions = function (options) {
                            let arr = [];

                            // convert object to array for sorting reasons
                            if (options instanceof Array) {
                                for (let i = 0; i < options.length; i++) {
                                    let obj = options[i];
                                    let value = String(obj[$scope.config.renderOptions.remoteValuePath]);
                                    let label = obj[$scope.config.renderOptions.remoteLabelPath];

                                    arr.push({
                                        value,
                                        label
                                    });
                                }
                            }
                            else {
                                for (let value in options) {
                                    let label = options[value];
                                    arr.push({
                                        value,
                                        label
                                    });
                                }
                            }

                            // Sort default option to the top
                            arr = arr.sort((a, b) => {
                                if (a.value === null || a.value === "null") {
                                    return -1;
                                }
                                else if (b.value === null || b.value === "null") {
                                    return 1;
                                }
                                else if (a.label < b.label) {
                                    return -1;
                                }
                                else if (b.label < a.label) {
                                    return 1;
                                }

                                return 0;
                            });

                            $scope.options = arr;

                            $scope.value = arr.find((item) => {
                                return item.value === $scope.config.value;
                            });
                        };
                    }
                ]
            };
        }
    ];
}