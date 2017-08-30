"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Gps.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    "$timeout",
                    "NgMap",
                    function ($scope, $timeout, NgMap) {
                        $scope.defaultPos = [
                            50.9953258,
                            11.4175722
                        ];

                        if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.defaultPosition) {
                            $scope.defaultPos = $scope.config.renderOptions.defaultPosition;
                        }

                        $scope.markerConfig = {
                            pos: $scope.config.value ? [
                                $scope.config.value.lat || $scope.defaultPos[0],
                                $scope.config.value.lon || $scope.defaultPos[1]
                            ] : $scope.defaultPos
                        }

                        $scope.mapConfig = {
                            center: $scope.config.value ? [
                                $scope.config.value.lat || $scope.defaultPos[0],
                                $scope.config.value.lon || $scope.defaultPos[1]
                            ] : $scope.defaultPos,
                            zoom: 6
                        }

                        NgMap.getMap().then(function (evtMap) { 
                            $scope.map = evtMap;
                        });

                        $scope.markerDragged = function (e) {
                            $scope.syncMapCoords({
                                lat: e.latLng.lat(),
                                lon: e.latLng.lng()
                            });
                        };

                        $scope.syncMapCoords = function (value) {
                            $scope.config.value = value;
                        }

                        $scope.$watchGroup([
                            "config.value.lat",
                            "config.value.lon"
                        ], function () {
                            $scope.markerConfig.pos = $scope.config.value ? [
                                $scope.config.value.lat || $scope.defaultPos[0],
                                $scope.config.value.lon || $scope.defaultPos[1]
                            ] : $scope.defaultPos;
                            $scope.mapConfig.center = $scope.config.value ? [
                                $scope.config.value.lat || $scope.defaultPos[0],
                                $scope.config.value.lon || $scope.defaultPos[1]
                            ] : $scope.defaultPos;

                            if ($scope.map) {
                                $scope.map.setCenter($scope.mapConfig.center);
                            }
                        });
                    }
                ]
            };
        }
    ];
}