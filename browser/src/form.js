"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatForm", [
        function () {
            return {
                restrict: "E",
                template: require(neatFormModule.templateRoot + "neatForm.html"),
                scope: {
                    id: "=",
                    form: "=",
                    isSubForm: "="
                },
                controller: "neatFormCtrl"
            };
        }
    ]);

    neatFormModule.controller("neatFormCtrl", [
        "$scope",
        "$q",
        "neatApi",
        function ($scope, $q, neatApi) {
            $scope.reset = function () {
                if ($scope.loading) {
                    return;
                }

                $scope.loading = true;
                neatApi.form({
                    form: $scope.form,
                    _id: $scope.id
                }, (config) => {
                    $scope.loading = false;
                    $scope.config = config;
                    $scope.error = null;
                });
            }

            $scope.subforms = [];
            $scope.$emit("neat-form-register", $scope);
            $scope.$on("neat-form-register", function (event, subformscope) {
                $scope.subforms.push(subformscope);
            });

            $scope.reset();

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

            $scope.submit = function () {
                if ($scope.loading) {
                    return $scope.submitProm;
                }

                $scope.submitProm = $q((resolve, reject) => {
                    let toSave = [];
                    if ($scope.subforms && $scope.subforms.length) {
                        for (let i = 0; i < $scope.subforms.length; i++) {
                            toSave.push($scope.subforms[i]);
                        }
                    }

                    $scope.saveAllSubforms(toSave).then(() => {
                        neatApi.formSubmit({
                            _id: $scope.id,
                            data: $scope.getValues($scope.config),
                            form: $scope.form
                        }, (config) => {
                            $scope.loading = false;
                            $scope.config = config;
                            resolve();
                        }, (err) => {
                            $scope.config = err.data;
                            $scope.loading = false;
                            reject(err);
                        });
                    }, (err) => {
                        $scope.loading = false;
                        reject(err);
                    });
                });

                $scope.loading = true;
                return $scope.submitProm;
            }

            $scope.saveAllSubforms = function (subforms) {
                return $q((resolve, reject) => {
                    if (!subforms || !subforms.length) {
                        return resolve();
                    }

                    return subforms.shift().submit().then(() => {
                        return $scope.saveAllSubforms(subforms).then(resolve, reject);
                    }, reject);
                });
            }
        }
    ]);
}