"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Subform.html"),
                scope: {
                    config: "=",
                    value: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {
                        $scope.getValues = function (sectionsOrFields, values) {
                            values = values || {};

                            if (sectionsOrFields instanceof Array) {
                                for (let i = 0; i < sectionsOrFields.length; i++) {
                                    let field = sectionsOrFields[i];
                                    $scope.getValues(field, values);
                                }
                            } else if (sectionsOrFields.fields) {
                                for (let i = 0; i < sectionsOrFields.fields.length; i++) {
                                    let field = sectionsOrFields.fields[i];
                                    $scope.getValues(field, values);
                                }
                            } else if (sectionsOrFields.groups) {
                                for (let i = 0; i < sectionsOrFields.groups.length; i++) {
                                    let field = sectionsOrFields.groups[i];
                                    $scope.getValues(field, values);
                                }
                            } else {
                                values[sectionsOrFields.id] = sectionsOrFields.value;
                            }

                            return values;
                        }

                        $scope.$watch(function () {
                            return JSON.stringify($scope.config);
                        }, function () {
                            $scope.value = $scope.getValues($scope.config);
                        });
                    }
                ]
            };
        }
    ];
}