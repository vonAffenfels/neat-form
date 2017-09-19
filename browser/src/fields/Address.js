"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Address.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    "$rootScope",
                    function ($scope, $rootScope) {

                        let errors = $scope.config.errors || {};

                        $scope.countryConfig = {
                            type: "Select",
                            id: $scope.config + ".country",
                            value: $scope.config.value ? $scope.config.value.country : null,
                            label: $scope.config.label.country,
                            errors: errors.country,
                            renderOptions: $scope.config.renderOptions.country,
                            options: $scope.config.renderOptions.countries
                        };

                        $scope.$watch("countryConfig.value", (val) => {
                            if (!$scope.config.value) {
                                $scope.config.value = {};
                            }

                            $scope.config.value.country = val;
                        });

                        $scope.googlePlaces = {
                            ready: false,
                            options: {
                                /*
                              types: $scope.types,
                              componentRestrictions: {
                                  country: $scope.restrict
                              }
                              */
                            },
                            value: ""
                        }

                        $scope.$watch("googlePlaces.value", function () {
                            if (typeof $scope.googlePlaces.value !== "object" || !$scope.googlePlaces.value.address_components) {
                                return;
                            }

                            let googleResult = {};
                            $scope.googlePlaces.value.address_components.map((v) => {
                                for (let i = 0; i < v.types.length; i++) {
                                    let type = v.types[i];
                                    let val = v.long_name;
                                    if (type === "country") {
                                        val = v.short_name;
                                    }
                                    googleResult[type] = val;
                                }
                            });

                            if (googleResult.country) {
                                $scope.countryConfig.value = googleResult.country;
                            }

                            if (googleResult.locality) {
                                $scope.config.value.city = googleResult.locality;
                            }

                            if (googleResult.street_number) {
                                $scope.config.value.streetnumber = googleResult.street_number;
                            }

                            if (googleResult.route) {
                                $scope.config.value.street = googleResult.route;
                            }

                            if (googleResult.postal_code) {
                                $scope.config.value.zip = googleResult.postal_code;
                            }
                        });

                        $rootScope.$on("googleLoaded", function () {
                            $scope.googlePlaces.ready = true;
                        });
                    }
                ]
            };
        }
    ];
}