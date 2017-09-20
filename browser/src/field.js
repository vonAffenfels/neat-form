"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatFormField", [
        "$compile",
        function ($compile) {
            return {
                restrict: "E",
                scope: {
                    config: "="
                },
                link: function ($scope, element) {

                    $scope.isVisible = function () {
                        let show = true;

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.if) {
                            try {
                                let groupScope = $scope.$parent.$parent.$parent;
                                let conditions = $scope.config.renderOptions.if;

                                for (let id in conditions) {
                                    let val = conditions[id];
                                    let isNotCondition = false;

                                    if (id.indexOf("!") === 0) {
                                        isNotCondition = true;
                                        id = id.substr(1);
                                    }

                                    for (let i = 0; i < groupScope.config.fields.length; i++) {
                                        let field = groupScope.config.fields[i];

                                        if (id == field.id) {
                                            if (typeof val === "object") {
                                                for (let fieldKey in val) {
                                                    let fieldVal = val[fieldKey];
                                                    if (fieldVal instanceof Array) {
                                                        // not condition
                                                        if (isNotCondition) {
                                                            if (fieldVal.indexOf(field.value[fieldKey]) === -1) {
                                                                show = true;
                                                            } else {
                                                                show = false;
                                                            }
                                                        } else {
                                                            // if condition
                                                            if (fieldVal.indexOf(field.value[fieldKey]) !== -1) {
                                                                show = true;
                                                            } else {
                                                                show = false;
                                                            }
                                                        }
                                                    } else {
                                                        // not condition
                                                        if (isNotCondition) {
                                                            if (field.value[fieldKey] != fieldVal) {
                                                                show = true;
                                                            } else {
                                                                show = false;
                                                            }
                                                        } else {
                                                            // if condition
                                                            if (field.value[fieldKey] == fieldVal) {
                                                                show = true;
                                                            } else {
                                                                show = false;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (val instanceof Array) {
                                                    // not condition
                                                    if (isNotCondition) {
                                                        if (val.indexOf(field.value) === -1) {
                                                            show = true;
                                                        } else {
                                                            show = false;
                                                        }
                                                    } else {
                                                        // if condition
                                                        if (val.indexOf(field.value) !== -1) {
                                                            show = true;
                                                        } else {
                                                            show = false;
                                                        }
                                                    }
                                                } else {
                                                    // not condition
                                                    if (isNotCondition) {
                                                        if (field.value != val) {
                                                            show = true;
                                                        } else {
                                                            show = false;
                                                        }
                                                    } else {
                                                        // if condition
                                                        if (field.value == val) {
                                                            show = true;
                                                        } else {
                                                            show = false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.unless) {
                            try {
                                let groupScope = $scope.$parent.$parent.$parent;
                                let conditions = $scope.config.renderOptions.unless;

                                for (let id in conditions) {
                                    let val = conditions[id];

                                    for (let i = 0; i < groupScope.config.fields.length; i++) {
                                        let field = groupScope.config.fields[i];

                                        if (id == field.id) {
                                            if (field.value == val) {
                                                show = false;
                                            } else {
                                                show = true;
                                            }
                                        }
                                    }
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        if (!show) {
                            $scope.resetValue();// if invisible reset all values!
                        }

                        return show;
                    }

                    $scope.resetValue = function () {
                        if (typeof $scope.config.default === "object") {
                            $scope.config.value = JSON.parse(JSON.stringify($scope.config.default));
                        } else {
                            $scope.config.value = $scope.config.default;
                        }
                    }

                    $scope.setFormScope = function (formScope) {
                        $scope.neatFormScope = formScope;
                    }

                    try {
                        $compile('<neat-form-field-' + $scope.config.type + ' config="config" form="neatFormScope" ng-if="isVisible()"></neat-form-field-' + $scope.config.type + '>')($scope, function (el, elScope) {
                            $scope.$emit("neat-form-field-register", $scope.config.id, $scope);
                            element.append(el);
                        });
                    } catch (e) {
                        console.error("Error compiling field " + $scope.config.type, $scope.config);
                        console.error(e);
                    }
                }
            };
        }
    ]);
}