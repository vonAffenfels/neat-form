"use strict";

module.exports = function (neatFormModule) {
    return [
        function () {
            return {
                restrict: "E",
                template: require("./Headline.html"),
                scope: {
                    config: "="
                },
                controller: [
                    "$scope",
                    "$sce",
                    "$element",
                    function ($scope, $sce, $element) {
                        if (typeof $scope.config.label === "string") {
                            $scope.config.label = $sce.trustAsHtml($scope.config.label);
                        }

                        // remove any col classes
                        let container = $element.parent().parent();
                        container.addClass("neat-1-col-form");
                        container.removeClass("neat-2-col-form");
                        container.removeClass("neat-3-col-form");
                        container.removeClass("neat-4-col-form");
                        container.removeClass("neat-5-col-form");
                        container.removeClass("neat-6-col-form");
                        container.removeClass("neat-7-col-form");
                    }
                ]
            };
        }
    ];
}