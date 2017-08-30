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

                        $scope.$watch("config.options", () => {
                            let arr = [];

                            if ($scope.config.options instanceof Object) {
                                for (let value in $scope.config.options) {
                                    let label = $scope.config.options[value];
                                    arr.push({
                                        value,
                                        label
                                    });
                                }
                            }

                            arr = arr.sort((a, b) => {
                                if (a.value === null || a.value === "null") {
                                    return -1;
                                } else if (b.value === null || b.value === "null") {
                                    return 1;
                                }

                                return 0;
                            });

                            $scope.options = arr;
                        });
                    }
                ]
            };
        }
    ];
}