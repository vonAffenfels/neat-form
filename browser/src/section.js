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
            $scope.fields = {};
            $scope.fieldsStatus = {};
            $scope.visible = true;
            $scope.collapsed = $scope.options ? $scope.options.initiallyCollapsed || false : false;

            $scope.$on("field_visibility_changed", function (e, visibility, id) {
                $scope.fieldsStatus[id] = visibility;
                $scope.checkVisibility();
            });

            $scope.checkVisibility = function () {
                let visible = false;

                for (let id in $scope.fieldsStatus) {
                    if ($scope.fieldsStatus[id] && !($scope.fields[id].config.renderOptions && $scope.fields[id].config.renderOptions.ignoreVisibility)) {
                        visible = true;
                    }
                }

                $scope.visible = visible;
            }

            $scope.$on("neat-form-field-register", function (event, id, fieldscope) {
                $scope.fields[id] = fieldscope;
                $scope.fieldsStatus[id] = true;
            });

            $scope.toggleCollapse = () => {
                $scope.collapsed = !$scope.collapsed;
            }
        }
    ]);

}