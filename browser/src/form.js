"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatForm", [
        function () {
            return {
                restrict: "E",
                template: require(neatFormModule.templateRoot + "neatForm.html"),
                scope: {
                    id: "=",
                    form: "="
                },
                controller: "neatFormCtrl"
            };
        }
    ]);

    neatFormModule.controller("neatFormCtrl", [
        "$scope",
        "neatApi",
        function ($scope, neatApi) {
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
                } else {
                    values[sectionsOrFields.id] = sectionsOrFields.value;
                }

                return values;
            }

            $scope.submit = function () {
                if ($scope.loading) {
                    return;
                }

                $scope.loading = true;

                neatApi.formSubmit({
                    _id: $scope.id,
                    data: $scope.getValues($scope.config),
                    form: $scope.form
                }, (config) => {
                    $scope.loading = false;
                    $scope.config = config;
                }, (err) => {
                    $scope.loading = false;
                });
            }
        }
    ]);

}