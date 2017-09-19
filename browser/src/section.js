"use strict";

module.exports = function (neatFormModule) {

    neatFormModule.directive("neatFormSection", [
        function () {
            return {
                restrict: "E",
                template: require(neatFormModule.templateRoot + "neatFormSection.html"),
                scope: {
                    config: "=",
                    options: "="
                },
                controller: "neatFormSectionCtrl"
            };
        }
    ]);

    neatFormModule.controller("neatFormSectionCtrl", [
        "$scope",
        function ($scope) {
            $scope.collapsed = $scope.options ? $scope.options.initiallyCollapsed || false : false;

            $scope.toggleCollapse = () => {
                $scope.collapsed = !$scope.collapsed;
            }
        }
    ]);

}