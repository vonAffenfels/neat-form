"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatFormField", [
        "$compile",
        function ($compile) {
            return {
                restrict: "E",
                scope: {
                    config: "=",
                    options: "=",
                    labels: "="
                },
                link: function ($scope, element) {

                    $scope.checkCondition = function (fields, conditions) {
                        let show = true;

                        for (let id in conditions) {
                            let val = conditions[id];
                            let isNotCondition = false;

                            if (id.indexOf("!") === 0) {
                                isNotCondition = true;
                                id = id.substr(1);
                            }

                            for (let fieldId in fields) {
                                let field = fields[fieldId].config;

                                if (id == fieldId) {
                                    if (val && typeof val === "object") {
                                        for (let fieldKey in val) {
                                            let fieldVal = val[fieldKey];
                                            if (fieldVal instanceof Array) {
                                                // not condition
                                                if (isNotCondition) {
                                                    if (fieldVal.indexOf(field.value[fieldKey]) !== -1) {
                                                        show = false;
                                                    }
                                                } else {
                                                    // if condition
                                                    if (fieldVal.indexOf(field.value[fieldKey]) === -1) {
                                                        show = false;
                                                    }
                                                }
                                            } else {
                                                // not condition
                                                if (isNotCondition) {
                                                    if (field.value[fieldKey] == fieldVal) {
                                                        show = false;
                                                    }
                                                } else {
                                                    // if condition
                                                    if (field.value[fieldKey] != fieldVal) {
                                                        show = false;
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (val && val instanceof Array) {
                                            // not condition
                                            if (isNotCondition) {
                                                if (val.indexOf(field.value) !== -1) {
                                                    show = false;
                                                }
                                            } else {
                                                // if condition
                                                if (val.indexOf(field.value) === -1) {
                                                    show = false;
                                                }
                                            }
                                        } else {
                                            // not condition
                                            if (isNotCondition) {
                                                if (field.value == val) {
                                                    show = false;
                                                }
                                            } else {
                                                // if condition
                                                if (field.value != val) {
                                                    show = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        return show;
                    }

                    $scope.isDisabled = function () {
                        let show = true;

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.disabled) {
                            try {
                                let formScope = $scope.neatFormScope;
                                let conditions = $scope.config.renderOptions.disabled;
                                show = $scope.checkCondition(formScope.fields, conditions);
                            } catch (e) {
                                console.error(e);
                            }

                            $scope.config.disabled = !show;
                        }

                    };

                    $scope.isVisible = function () {
                        let show = true;

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.if) {
                            try {
                                let formScope = $scope.neatFormScope;
                                let conditions = $scope.config.renderOptions.if;
                                show = $scope.checkCondition(formScope.fields, conditions);
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.unless) {
                            try {
                                let formScope = $scope.neatFormScope;
                                let conditions = $scope.config.renderOptions.unless;

                                for (let id in conditions) {
                                    let val = conditions[id];
                                    let field = formScope.getFieldById(id);

                                    if (field && field.config && field.config.value != val) {
                                        show = false;
                                    }

                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        if (!show) {
                            $scope.resetValue();// if invisible reset all values!
                        }

                        $scope.$emit("field_visibility_changed", show, $scope.config.id);

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
                        $scope.isDisabled();
                    };

                    $scope.$watch("config.value", (newValue, oldValue)=> {
                       $scope.$emit("neat-form-field-valuechange-" + $scope.config.id, newValue, oldValue);
                    });


                    try {
                        $compile('<neat-form-field-' + $scope.config.type + ' config="config" options="options" labels="labels" form="neatFormScope" ng-if="isVisible()"></neat-form-field-' + $scope.config.type + '>')($scope, function (el, elScope) {
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