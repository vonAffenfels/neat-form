"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Subformarray.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    function ($scope) {
                        if (!$scope.config.value) {
                            $scope.config.value = [];
                        } else {
                            $scope.forms = JSON.parse(JSON.stringify($scope.config.value));
                        }

                        $scope.addItem = function ($event) {
                            $event.stopPropagation();

                            if (!$scope.forms) {
                                $scope.forms = [];
                            }

                            let newItem = JSON.parse(JSON.stringify($scope.config.subform));
                            newItem.__collapsed = false;
                            $scope.forms.push(newItem);
                        }

                        $scope.move = function ($event, index, targetIndex) {
                            $event.stopPropagation();
                            $scope.config.value.splice(targetIndex, 0, $scope.config.value.splice(index, 1)[0]);
                            $scope.forms.splice(targetIndex, 0, $scope.forms.splice(index, 1)[0]);
                        }

                        $scope.removeItem = function ($event, index) {
                            $event.stopPropagation();

                            $scope.forms.splice(index, 1);
                            $scope.config.value.splice(index, 1);
                        }
                    }
                ]
            };
        }
    ];
}