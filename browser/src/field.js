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
                    try {
                        $compile('<neat-form-field-' + $scope.config.type + ' config="config"></neat-form-field-' + $scope.config.type + '>')($scope, function (el, elScope) {
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