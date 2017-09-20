"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Gps.html"),
                scope: {
                    config: "=",
                    form: "="
                },
                controller: [
                    "$scope",
                    "$rootScope",
                    "$timeout",
                    "NgMap",
                    "GeoCoder",
                    function ($scope, $rootScope, $timeout, NgMap, GeoCoder) {
                        $scope.defaultPos = [
                            50.9953258,
                            11.4175722
                        ];
                        $scope.degValue = {};

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
                            if (!e) {
                                return;
                            }

                            $scope.syncMapCoords({
                                lat: e.latLng.lat(),
                                lon: e.latLng.lng()
                            });
                        };

                        $scope.syncMapCoords = function (value) {
                            $scope.config.value = value;
                            $scope.onValueChanged();
                        }

                        $scope.onValueChanged = function () {
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

                            $scope.degValue = $scope.dezToDeg($scope.config.value.lat, $scope.config.value.lon);
                        };

                        $scope.onDegValueChanged = function () {
                            $scope.config.value = $scope.degToDez($scope.degValue.lat, $scope.degValue.lon);

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
                        }

                        $scope.getCoordinatesFromAddressField = function () {
                            if (!$scope.config.renderOptions.bindToAddress || !$scope.form.fields || !$scope.form.fields[$scope.config.renderOptions.bindToAddress]) {
                                return;
                            }

                            let addressField = $scope.form.fields[$scope.config.renderOptions.bindToAddress];
                            let address = [
                                addressField.config.value.street,
                                addressField.config.value.streetnumber
                            ].filter(v => !!v).join(" ").trim();
                            let components = {};

                            if (addressField.config.value.country) {
                                components.country = addressField.config.value.country;
                            }
                            if (addressField.config.value.zip) {
                                components.postalCode = addressField.config.value.zip;
                            }
                            if (addressField.config.value.city) {
                                components.locality = addressField.config.value.city;
                            }

                            GeoCoder.geocode({
                                address: address,
                                componentRestrictions: components
                            }).then((result) => {
                                if (!result) {
                                    return;
                                }

                                result = result.shift();
                                $scope.config.value.lat = result.geometry.location.lat();
                                $scope.config.value.lon = result.geometry.location.lng();
                                $scope.onValueChanged();
                            }, (status) => {
                            });
                        }

                        /**
                         *
                         * @param lat {deg: int, min: int, sec: int, pos: N|S}
                         * @param lon {deg: int, min: int, sec: int, pos: W|O}
                         * @returns {{lat: number, lon: number}}
                         */
                        $scope.degToDez = function (lat, lon) {
                            if (!lat || !lon) {
                                return {};
                            }

                            let ret = {lat: 0, lon: 0};
                            ret.lat = (parseInt(lat.deg) + (parseInt(lat.min) / 60) + (parseInt(lat.sec) / 3600)) * (lat.pos == "N" ? 1 : -1);
                            ret.lon = (parseInt(lon.deg) + (parseInt(lon.min) / 60) + (parseInt(lon.sec) / 3600)) * (lon.pos == "E" ? 1 : -1);

                            return ret;
                        };

                        /**
                         *
                         * @param lat
                         * @param lon
                         * @returns {{lat: {deg: number, min: number, sec: number, pos: string}, lon: {deg: number, min: number, sec: number, pos: string}}}
                         */
                        $scope.dezToDeg = function (lat, lon) {
                            if (!lat || !lon) {
                                return {};
                            }

                            let ret = {
                                lat: {
                                    deg: 0,
                                    min: 0,
                                    sec: 0,
                                    pos: "N"
                                },
                                lon: {
                                    deg: 0,
                                    min: 0,
                                    sec: 0,
                                    pos: "W"
                                }
                            };

                            if (lat < Math.abs(lat)) {
                                ret.lat.pos = "S"
                            } else {
                                ret.lat.pos = "N"
                            }

                            if (lon < Math.abs(lon)) {
                                ret.lon.pos = "W"
                            } else {
                                ret.lon.pos = "E"
                            }

                            lat = Math.abs(lat);
                            ret.lat.deg = Math.trunc(lat);
                            lat = lat - ret.lat.deg;
                            ret.lat.min = Math.trunc(lat * 60);
                            lat = lat - ret.lat.min / 60;
                            ret.lat.sec = Math.trunc(lat * 3600);

                            lon = Math.abs(lon);
                            ret.lon.deg = Math.trunc(lon);
                            lon = lon - ret.lon.deg;
                            ret.lon.min = Math.trunc(lon * 60);
                            lon = lon - ret.lon.min / 60;
                            ret.lon.sec = Math.trunc(lon * 3600);

                            return ret;
                        }

                        $scope.googleReady = $rootScope.googleReady;
                        $rootScope.$on("googleLoaded", function () {
                            $scope.googleReady = true;
                        });
                    }
                ]
            };
        }
    ];
}

