"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Subform.html"),
                scope: {
                    config: "=",
                    value: "=",
                    options: "=",
                    labels: "=",
                    collapsed: "=",
                    array: "="
                },
                controller: [
                    "$scope",
                    "$anchorScroll",
                    function ($scope, $anchorScroll) {

                        if (!$scope.array) {
                            $scope.config = $scope.config.value;
                        }

                        $scope.scrollToGroup = function (group) {
                            $anchorScroll(group.id);
                        };

                        $scope.getValues = function (sectionsOrFields, values) {
                            values = values || {};

                            //subform

                            if($scope.array && sectionsOrFields.type === "Subform"){
                                values[sectionsOrFields.id] = $scope.getValues(sectionsOrFields.value);
                                return values;
                            }

                            if (!sectionsOrFields) {
                                return values;
                            }

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
                        };

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