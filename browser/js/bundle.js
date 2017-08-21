/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/neat-form/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	(function (window, ng) {

	    var neatApi = __webpack_require__(1);
	    var neatFormModule = ng.module("neat-form", ["neat-api"]);

	    neatFormModule.templateRoot = "./templates/";

	    __webpack_require__(2)(neatFormModule);
	    __webpack_require__(5)(neatFormModule);
	    __webpack_require__(8)(neatFormModule);

	    var fieldContext = __webpack_require__(9);
	    fieldContext.keys().forEach(function (directivePath) {
	        var parts = directivePath.split("/");
	        parts.shift();
	        var firstPart = parts.shift();
	        var directiveName = "neatFormField" + firstPart;
	        directiveName = directiveName.replace(/\.js$/i, "");
	        directivePath = directivePath.replace(/^\.\//i, "");
	        neatFormModule.directive(directiveName, __webpack_require__(44)("./" + directivePath)(neatFormModule));
	    });
	})(window, window.angular);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "/neat-form/js/";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports) {

		"use strict";

		(function (window, ng) {

			var neatFormModule = ng.module("neat-api", []);

			neatFormModule.service("neatApi", ["$resource", "$location", function ($resource, $location) {
				var rootUrl = "//" + $location.host() + ":" + $location.port();

				return $resource(rootUrl, {}, {
					// AUTH
					login: {
						url: rootUrl + "/auth/login",
						method: "POST",
						isArray: false,
						params: {}
					},
					logout: {
						url: rootUrl + "/auth/logout",
						method: "POST",
						isArray: false,
						params: {}
					},
					resendActivation: {
						url: rootUrl + "/auth/resend-activation",
						method: "POST",
						isArray: false,
						params: {}
					},
					activate: {
						url: rootUrl + "/auth/activate-account",
						method: "POST",
						isArray: false,
						params: {}
					},
					resetPassword: {
						url: rootUrl + "/auth/do-reset-password",
						method: "POST",
						isArray: false,
						params: {}
					},
					requestResetPassword: {
						url: rootUrl + "/auth/reset-password",
						method: "POST",
						isArray: false,
						params: {}
					},

					// API
					find: {
						url: rootUrl + "/api/:model/find",
						method: "POST",
						isArray: true,
						params: {
							model: '@model'
						}
					},
					findOne: {
						url: rootUrl + "/api/:model/findOne",
						method: "POST",
						params: {
							model: '@model'
						}
					},
					versions: {
						url: rootUrl + "/api/:model/versions",
						method: "POST",
						isArray: true,
						params: {
							model: '@model'
						}
					},
					save: {
						url: rootUrl + "/api/:model/save",
						method: "POST",
						params: {
							model: '@model'
						}
					},
					update: {
						url: rootUrl + "/api/:model/update",
						method: "POST",
						params: {
							model: '@model'
						}
					},
					remove: {
						url: rootUrl + "/api/:model/remove",
						method: "POST",
						params: {
							model: '@model'
						}
					},
					count: {
						url: rootUrl + "/api/:model/count",
						method: "POST",
						params: {
							model: "@model"
						}
					},
					pagination: {
						url: rootUrl + "/api/:model/pagination",
						method: "POST",
						params: {
							model: "@model"
						}
					},
					schema: {
						url: rootUrl + "/api/:model/schema",
						method: "POST",
						params: {
							model: "@model"
						}
					},
					dropdownoptions: {
						url: rootUrl + "/api/:model/dropdownoptions",
						method: "POST",
						isArray: true,
						params: {
							model: "@model"
						}
					},

					// FORM
					form: {
						url: rootUrl + "/form-api/:form/:_id",
						method: "GET",
						params: {
							form: "@form",
							_id: "@_id"
						}
					},
					formSubmit: {
						url: rootUrl + "/form-api/:form",
						method: "POST",
						params: {
							form: "@form"
						}
					}
				});
			}]);
		})(window, window.angular);

		/***/
	}]
	/******/);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {

	    neatFormModule.directive("neatForm", [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(3)(neatFormModule.templateRoot + "neatForm.html"),
	            scope: {
	                id: "=",
	                form: "=",
	                isSubForm: "="
	            },
	            controller: "neatFormCtrl"
	        };
	    }]);

	    neatFormModule.controller("neatFormCtrl", ["$scope", "$q", "neatApi", function ($scope, $q, neatApi) {
	        $scope.reset = function () {
	            if ($scope.loading) {
	                return;
	            }

	            $scope.loading = true;
	            neatApi.form({
	                form: $scope.form,
	                _id: $scope.id
	            }, function (config) {
	                $scope.loading = false;
	                $scope.config = config;
	                $scope.error = null;
	            });
	        };

	        $scope.subforms = [];
	        $scope.$emit("neat-form-register", $scope);
	        $scope.$on("neat-form-register", function (event, subformscope) {
	            $scope.subforms.push(subformscope);
	        });

	        $scope.reset();

	        $scope.getValues = function (sectionsOrFields, values) {
	            values = values || {};

	            if (sectionsOrFields instanceof Array) {
	                for (var i = 0; i < sectionsOrFields.length; i++) {
	                    var field = sectionsOrFields[i];
	                    $scope.getValues(field, values);
	                }
	            } else if (sectionsOrFields.fields) {
	                for (var _i = 0; _i < sectionsOrFields.fields.length; _i++) {
	                    var _field = sectionsOrFields.fields[_i];
	                    $scope.getValues(_field, values);
	                }
	            } else if (sectionsOrFields.groups) {
	                for (var _i2 = 0; _i2 < sectionsOrFields.groups.length; _i2++) {
	                    var _field2 = sectionsOrFields.groups[_i2];
	                    $scope.getValues(_field2, values);
	                }
	            } else {
	                values[sectionsOrFields.id] = sectionsOrFields.value;
	            }

	            return values;
	        };

	        $scope.submit = function () {
	            if ($scope.loading) {
	                return $scope.submitProm;
	            }

	            $scope.submitProm = $q(function (resolve, reject) {
	                var toSave = [];
	                if ($scope.subforms && $scope.subforms.length) {
	                    for (var i = 0; i < $scope.subforms.length; i++) {
	                        toSave.push($scope.subforms[i]);
	                    }
	                }

	                $scope.saveAllSubforms(toSave).then(function () {
	                    neatApi.formSubmit({
	                        _id: $scope.id,
	                        data: $scope.getValues($scope.config),
	                        form: $scope.form
	                    }, function (config) {
	                        $scope.loading = false;
	                        $scope.config = config;
	                        resolve();
	                    }, function (err) {
	                        $scope.config = err.data;
	                        $scope.loading = false;
	                        reject(err);
	                    });
	                }, function (err) {
	                    $scope.loading = false;
	                    reject(err);
	                });
	            });

	            $scope.loading = true;
	            return $scope.submitProm;
	        };

	        $scope.saveAllSubforms = function (subforms) {
	            return $q(function (resolve, reject) {
	                if (!subforms || !subforms.length) {
	                    return resolve();
	                }

	                return subforms.shift().submit().then(function () {
	                    return $scope.saveAllSubforms(subforms).then(resolve, reject);
	                }, reject);
	            });
	        };
	    }]);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./templates/neatForm.html": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .neat-form-section-body {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n    }\r\n\r\n    .neat-7-col-form {\r\n        width: 14.28571428571429%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-6-col-form {\r\n        width: 16.66666667%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-5-col-form {\r\n        width: 20%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-4-col-form {\r\n        width: 25%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-3-col-form {\r\n        width: 33%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-2-col-form {\r\n        width: 50%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n\r\n    .neat-1-col-form {\r\n        width: 100%;\r\n        padding: 0 0 0 15px;\r\n        flex-flow: column;\r\n    }\r\n</style>\r\n<form ng-submit=\"submit()\" class=\"form form-horizontal panel neat-form\" ng-class=\"{'panel-loading': loading}\">\r\n    <div class=\"panel-body\">\r\n        <div class=\"panel-loader\" ng-if=\"loading\">\r\n            <div class=\"spinner-small\"></div>\r\n        </div>\r\n        <div class=\"row\" ng-repeat=\"conf in config.groups\" ng-if=\"config.groups\">\r\n            <neat-form-section config=\"conf\" ng-if=\"conf.fields\">\r\n            </neat-form-section>\r\n        </div>\r\n        <div class=\"row\" ng-if=\"config.fields\">\r\n            <neat-form-section config=\"config\">\r\n            </neat-form-section>\r\n        </div>\r\n        <div class=\"row\" ng-if=\"!isSubForm\">\r\n            <div class=\"panel panel-inverse\">\r\n                <div class=\"panel-body\">\r\n                    <div class=\"col-md-10\" style=\"padding-left: 0\">\r\n                        <button type=\"submit\" class=\"btn btn-primary btn-block col-md-10\">{{config.renderOptions.saveButtonLabel || \"Save\"}}</button>\r\n                    </div>\r\n                    <div class=\"col-md-2\" style=\"padding-right: 0\">\r\n                        <button type=\"button\" ng-click=\"reset()\" class=\"btn btn-white btn-block col-md-2\">{{config.renderOptions.resetButtonLabel || \"Reset\"}}</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {

	    neatFormModule.directive("neatFormSection", [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(6)(neatFormModule.templateRoot + "neatFormSection.html"),
	            scope: {
	                config: "="
	            },
	            controller: "neatFormSectionCtrl"
	        };
	    }]);

	    neatFormModule.controller("neatFormSectionCtrl", ["$scope", function ($scope) {}]);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./templates/neatFormSection.html": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-inverse\">\r\n    <div class=\"panel-heading\" ng-if=\"config.label\">\r\n        <h4 class=\"panel-title\">{{config.label}}</h4>\r\n    </div>\r\n    <div class=\"panel-body neat-form-section-body\">\r\n        <div ng-repeat=\"conf in config.fields\" ng-class=\"{\r\n            'neat-7-col-form': config.columns === 7,\r\n            'neat-6-col-form': config.columns === 6,\r\n            'neat-5-col-form': config.columns === 5,\r\n            'neat-4-col-form': config.columns === 4,\r\n            'neat-3-col-form': config.columns === 3,\r\n            'neat-2-col-form': config.columns === 2,\r\n            'neat-1-col-form': config.columns === 1 || !config.columns\r\n        }\">\r\n            <neat-form-section config=\"conf\" ng-if=\"conf.fields\">\r\n            </neat-form-section>\r\n            <neat-form-field config=\"conf\" ng-if=\"!conf.fields\">\r\n            </neat-form-field>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (neatFormModule) {

	    neatFormModule.directive("neatFormField", ["$compile", function ($compile) {
	        return {
	            restrict: "E",
	            scope: {
	                config: "="
	            },
	            link: function link($scope, element) {

	                $scope.isVisible = function () {
	                    var show = true;

	                    if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.if) {
	                        try {
	                            var groupScope = $scope.$parent.$parent.$parent;
	                            var conditions = $scope.config.renderOptions.if;

	                            for (var id in conditions) {
	                                var val = conditions[id];

	                                for (var i = 0; i < groupScope.config.fields.length; i++) {
	                                    var field = groupScope.config.fields[i];

	                                    if (id == field.id) {
	                                        if (field.value == val) {
	                                            show = true;
	                                        } else {
	                                            show = false;
	                                        }
	                                    }
	                                }
	                            }
	                        } catch (e) {
	                            console.error(e);
	                        }
	                    }

	                    if ($scope.config && $scope.config.renderOptions && $scope.config.renderOptions.unless) {
	                        try {
	                            var _groupScope = $scope.$parent.$parent.$parent;
	                            var _conditions = $scope.config.renderOptions.unless;

	                            for (var _id in _conditions) {
	                                var _val = _conditions[_id];

	                                for (var _i = 0; _i < _groupScope.config.fields.length; _i++) {
	                                    var _field = _groupScope.config.fields[_i];

	                                    if (_id == _field.id) {
	                                        if (_field.value == _val) {
	                                            show = false;
	                                        } else {
	                                            show = true;
	                                        }
	                                    }
	                                }
	                            }
	                        } catch (e) {
	                            console.error(e);
	                        }
	                    }

	                    if (!show) {
	                        $scope.resetValue(); // if invisible reset all values!
	                    }

	                    return show;
	                };

	                $scope.resetValue = function () {
	                    if (_typeof($scope.config.default) === "object") {
	                        $scope.config.value = JSON.parse(JSON.stringify($scope.config.default));
	                    } else {
	                        $scope.config.value = $scope.config.default;
	                    }
	                };

	                try {
	                    $compile('<neat-form-field-' + $scope.config.type + ' config="config" ng-if="isVisible()"></neat-form-field-' + $scope.config.type + '>')($scope, function (el, elScope) {
	                        element.append(el);
	                    });
	                } catch (e) {
	                    console.error("Error compiling field " + $scope.config.type, $scope.config);
	                    console.error(e);
	                }
	            }
	        };
	    }]);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Address.js": 10,
		"./Booleanplus.js": 12,
		"./Checkbox.js": 14,
		"./Doubleselect.js": 16,
		"./Email.js": 18,
		"./Gps.js": 20,
		"./Headline.js": 22,
		"./Input.js": 24,
		"./Multifieldselect.js": 26,
		"./Multiimageupload.js": 28,
		"./Multiselect.js": 30,
		"./Password.js": 32,
		"./Price.js": 34,
		"./Priceperunit.js": 36,
		"./Radio.js": 38,
		"./Select.js": 40,
		"./Textarea.js": 42
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(11),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {

	                var errors = $scope.config.errors || {};

	                $scope.countryConfig = {
	                    type: "Select",
	                    id: $scope.config + ".country",
	                    value: $scope.config.value ? $scope.config.value.country : null,
	                    label: $scope.config.label.country,
	                    errors: errors.country,
	                    renderOptions: $scope.config.renderOptions,
	                    options: $scope.config.renderOptions.countries
	                };

	                $scope.$watch("countryConfig.value", function (val) {
	                    if (!$scope.config.value) {
	                        $scope.config.value = {};
	                    }

	                    $scope.config.value.country = val;
	                });
	            }]
	        };
	    }];
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<neat-form-field config=\"countryConfig\">\r\n</neat-form-field>\r\n<div class=\"form-group\" ng-class=\"{\r\n    'has-error': config.errors.zip || config.errors.city\r\n}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label.zip}} / {{config.label.city}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"col-md-4\" style=\"padding-left: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.zip\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col-md-8\" style=\"padding-right: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.city\" class=\"form-control\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\" ng-class=\"{\r\n    'has-error': config.errors.street || config.errors.streetnumber\r\n}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label.street}} / {{config.label.streetnumber}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"col-md-10\" style=\"padding-left: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.street\" class=\"form-control \">\r\n        </div>\r\n        <div class=\"col-md-2\" style=\"padding-right: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.streetnumber\" class=\"form-control\">\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(13),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"{{config._id}}\" ng-value=\"null\" ng-model=\"config.value\">\r\n            {{config.renderOptions.labels.null || config.renderOptions.emptySelectLabel || \"Unknown\"}}\r\n        </label>\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"{{config._id}}\" ng-value=\"true\" ng-model=\"config.value\">\r\n            {{config.renderOptions.labels.true || \"Yes\"}}\r\n        </label>\r\n        <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"{{config._id}}\" ng-value=\"false\" ng-model=\"config.value\">\r\n            {{config.renderOptions.labels.false || \"No\"}}\r\n        </label>\r\n    </div>\r\n</div>";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(15),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\" ng-if=\"!config.renderOptions.inline\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"checkbox\">\r\n            <label>\r\n                <input type=\"checkbox\" ng-model=\"config.value\">\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<label class=\"checkbox-inline\" ng-if=\"config.renderOptions.inline\">\r\n    <input type=\"checkbox\" ng-model=\"config.value\">\r\n    {{config.label}}\r\n</label>";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(17),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div ng-class=\"'col-md-' + (config.renderOptions.value1Width || (config.renderOptions.seperatorLabel ? 4 : 5))\">\r\n        <select class=\"form-control\" ng-model=\"config.value.value1\" ng-options=\"key as label for (key, label) in config.options.value1\">\r\n            <option value=\"\">{{config.renderOptions.emptySelectLabel || \"Choose...\"}}</option>\r\n        </select>\r\n    </div>\r\n    <label class=\"col-md-2 control-label\" ng-class=\"'col-md-' + (config.renderOptions.seperatorLabelWidth || 2)\" ng-if=\"config.renderOptions.seperatorLabel\">{{config.renderOptions.seperatorLabel}}\r\n    </label>\r\n    <div ng-class=\"'col-md-' + (config.renderOptions.value2Width || (config.renderOptions.seperatorLabel ? 4 : 5))\">\r\n        <select class=\"form-control\" ng-model=\"config.value.value2\" ng-options=\"key as label for (key, label) in config.options.value2\">\r\n            <option value=\"\">{{config.renderOptions.emptySelectLabel || \"Choose...\"}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(19),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <input type=\"email\" ng-readonly=\"config.readonly\" ng-model=\"config.value\" class=\"form-control\">\r\n    </div>\r\n</div>";

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(21),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors.lat || config.errors.lon}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label.lat}} / {{config.label.lon}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"col-md-6\" style=\"padding-left: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.lat\" class=\"form-control \">\r\n        </div>\r\n        <div class=\"col-md-6\" style=\"padding-right: 0;\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value.lon\" class=\"form-control\">\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(23),
	            scope: {
	                config: "="
	            }
	        };
	    }];
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\">\r\n    <label class=\"col-md-2 control-label align-left\">\r\n        <b>{{config.label}}</b>\r\n    </label>\r\n</div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(25),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <input type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value\" class=\"form-control\">\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(27),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"checkbox\" ng-repeat=\"(key, label) in config.options\" ng-if=\"!config.renderOptions.inline\">\r\n            <label>\r\n                <input type=\"checkbox\" ng-model=\"config.value[key]\">\r\n                {{label}}\r\n            </label>\r\n        </div>\r\n        <label class=\"checkbox-inline\" ng-repeat=\"(key, label) in config.options\" ng-if=\"config.renderOptions.inline\">\r\n            <input type=\"checkbox\" ng-model=\"config.value[key]\">\r\n            {{label}}\r\n        </label>\r\n    </div>\r\n</div>";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(29),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", "FileUploader", function ($scope, FileUploader) {
	                var uploader = new FileUploader({
	                    url: '/upload'
	                });

	                $scope.uploader = uploader;

	                uploader.filters.push({
	                    name: 'imageFilter',
	                    fn: function fn(item /*{File|FileLikeObject}*/, options) {
	                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	                    }
	                });

	                uploader.onAfterAddingFile = function (fileItem) {
	                    var formData = [];

	                    function flatten(obj, stack) {
	                        for (var property in obj) {
	                            if (obj.hasOwnProperty(property)) {
	                                var key = stack + "." + property;
	                                if (!stack) {
	                                    key = property;
	                                }

	                                if (_typeof(obj[property]) == "object") {
	                                    flatten(obj[property], key);
	                                } else {
	                                    var data = {};
	                                    data[key] = obj[property];
	                                    formData.push(data);
	                                }
	                            }
	                        }
	                    }

	                    flatten($scope.uploadItem);

	                    fileItem.formData = formData;
	                    fileItem.uploading = true;

	                    $scope.uploadItem = {};

	                    if (!$scope.config.value) {
	                        $scope.config.value = [];
	                    }

	                    fileItem.index = $scope.config.value.push(fileItem) - 1;
	                    fileItem.upload();
	                };

	                uploader.onProgressItem = function (fileItem, progress) {
	                    var reader = new FileReader();
	                    reader.readAsDataURL(fileItem._file);
	                    fileItem.progress = progress;
	                };

	                uploader.onCompleteItem = function (fileItem, data, status) {
	                    for (var i = 0; i < $scope.config.value.length; i++) {
	                        if ($scope.config.value[i].progress === 100) {
	                            if (status === 200) {
	                                $scope.config.value.splice(i, 1, data);
	                            } else {
	                                $scope.config.value.splice(i, 1);
	                            }
	                        }
	                    }
	                    $scope.config.value = JSON.parse(JSON.stringify($scope.config.value));
	                };

	                $scope.imageMoveLeft = function (index) {
	                    if (index < 1 || index > $scope.config.value.length) {
	                        return;
	                    }

	                    var leftImage = $scope.config.value[index - 1];
	                    $scope.config.value[index - 1] = $scope.config.value[index];
	                    $scope.config.value[index] = leftImage;
	                };

	                $scope.imageMoveRight = function (index) {
	                    if (index < 0 || index > $scope.config.value.length - 1) {
	                        return;
	                    }

	                    var rightImage = $scope.config.value[index + 1];
	                    $scope.config.value[index + 1] = $scope.config.value[index];
	                    $scope.config.value[index] = rightImage;
	                };

	                $scope.imageRemove = function (index) {
	                    if (index < 0 || index > $scope.config.value.length) {
	                        return;
	                    }

	                    $scope.config.value.splice(index, 1);
	                };
	            }]
	        };
	    }];
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<div class=\"images\">\r\n    <div class=\"images-container row clearfix\">\r\n        <div class=\"image col-md-6\" ng-repeat=\"item in config.value\">\r\n            <div class=\"image-container\">\r\n                <button ng-if=\"item._id\" class=\"remove btn btn-sm btn-danger\" type=\"button\" ng-click=\"imageRemove($index)\">\r\n                    <i class=\"fa fa-trash\"></i>\r\n                </button>\r\n\r\n                <button ng-if=\"item._id && $index > 0\" class=\"move-left btn btn-sm btn-primary\" type=\"button\" ng-click=\"imageMoveLeft($index)\">\r\n                    <i class=\"fa fa-arrow-left\"></i>\r\n                </button>\r\n\r\n                <button ng-if=\"item._id && $index < config.value.length - 1\" class=\"move-right btn btn-sm btn-primary\" type=\"button\" ng-click=\"imageMoveRight($index)\">\r\n                    <i class=\"fa fa-arrow-right\"></i>\r\n                </button>\r\n\r\n                <a ng-attr-href=\"{{item.fileurl.orig}}\" data-lightbox=\"config.value\" ng-attr-data-title=\"{{item[lang].caption}}\">\r\n                    <img ng-attr-src=\"{{item.fileurl.thumbBackend}}\" ng-if=\"item.fileurl.thumbBackend\">\r\n                </a>\r\n\r\n                <canvas ng-show=\"item.uploading\" ng-if=\"!item._id\"></canvas>\r\n                <div ng-show=\"item.progress\" ng-if=\"!item._id\" class=\"progress\" ng-style=\"{height: item.progress + '%'}\"></div>\r\n            </div>\r\n            <div class=\"data-container\">\r\n                <neat-form form=\"config.renderOptions.subform\" id=\"item._id\" is-sub-form=\"true\"></neat-form>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"image upload col-md-6\">\r\n            <div class=\"image-container\">\r\n                <div class=\"fileselect-button\">\r\n                    <input class=\"fileselect\" type=\"file\" nv-file-select=\"\" uploader=\"uploader\"/>\r\n                    <i class=\"fa fa-plus-circle fa-4x\"></i>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(31),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <select class=\"form-control\" multiple ng-model=\"config.value\" ng-options=\"key as label for (key, label) in config.options\">\r\n            <option value=\"\" ng-if=\"config.renderOptions.emptySelectLabel !== false\">{{config.renderOptions.emptySelectLabel || \"Choose...\"}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(33),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <input type=\"password\" ng-readonly=\"config.readonly\" ng-model=\"config.value\" class=\"form-control\">\r\n    </div>\r\n</div>";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(35),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"input-group\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" number-formatter ng-model=\"config.value.price\" class=\"form-control\">\r\n            <span class=\"input-group-btn\">\r\n                <select class=\"form-control currency-select\" ng-readonly=\"config.readonly\" ng-model=\"config.value.currency\" ng-options=\"option as option for option in config.renderOptions.currencies\">\r\n                </select>\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(37),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"input-group\">\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" number-formatter ng-model=\"config.value.price\" class=\"form-control\">\r\n            <span class=\"input-group-btn\">\r\n                <select class=\"form-control currency-select\" ng-readonly=\"config.readonly\" ng-model=\"config.value.currency\" ng-options=\"option as option for option in config.renderOptions.currencies\">\r\n                </select>\r\n            </span>\r\n            <span class=\"input-group-addon\">{{config.renderOptions.perLabel || 'per'}}</span>\r\n            <input type=\"text\" ng-readonly=\"config.readonly\" number-formatter ng-model=\"config.value.amount\" class=\"form-control\">\r\n            <span class=\"input-group-btn\">\r\n                <select class=\"form-control unit-select\" ng-readonly=\"config.readonly\" ng-model=\"config.value.unit\" ng-options=\"option as option for option in config.renderOptions.units\">\r\n                </select>\r\n            </span>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(39),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {
	                // make this a string because of object options we cant have numbers as keys (values)
	                $scope.config.value = typeof $scope.config.value === "number" ? String($scope.config.value) : $scope.config.value;
	            }]
	        };
	    }];
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <div class=\"radio\" ng-repeat=\"(value, label) in config.options\">\r\n            <label>\r\n                <input type=\"radio\" name=\"{{config._id}}\" ng-value=\"value\" ng-model=\"config.value\">\r\n                {{label}}\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(41),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <select class=\"form-control\" ng-model=\"config.value\" ng-options=\"key as label for (key, label) in config.options\">\r\n            <option value=\"\" ng-if=\"config.renderOptions.emptySelectLabel !== false\">{{config.renderOptions.emptySelectLabel || \"Choose...\"}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (neatFormModule) {
	    return [function () {
	        return {
	            restrict: "E",
	            template: __webpack_require__(43),
	            scope: {
	                config: "="
	            },
	            controller: ["$scope", function ($scope) {}]
	        };
	    }];
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': config.errors}\">\r\n    <label class=\"col-md-2 control-label\">{{config.label}}</label>\r\n    <div class=\"col-md-10\">\r\n        <textarea type=\"text\" ng-readonly=\"config.readonly\" ng-model=\"config.value\" class=\"form-control\"></textarea>\r\n    </div>\r\n</div>\r\n\r\n";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Address": 10,
		"./Address.html": 11,
		"./Address.js": 10,
		"./Booleanplus": 12,
		"./Booleanplus.html": 13,
		"./Booleanplus.js": 12,
		"./Checkbox": 14,
		"./Checkbox.html": 15,
		"./Checkbox.js": 14,
		"./Doubleselect": 16,
		"./Doubleselect.html": 17,
		"./Doubleselect.js": 16,
		"./Email": 18,
		"./Email.html": 19,
		"./Email.js": 18,
		"./Gps": 20,
		"./Gps.html": 21,
		"./Gps.js": 20,
		"./Headline": 22,
		"./Headline.html": 23,
		"./Headline.js": 22,
		"./Input": 24,
		"./Input.html": 25,
		"./Input.js": 24,
		"./Multifieldselect": 26,
		"./Multifieldselect.html": 27,
		"./Multifieldselect.js": 26,
		"./Multiimageupload": 28,
		"./Multiimageupload.html": 29,
		"./Multiimageupload.js": 28,
		"./Multiselect": 30,
		"./Multiselect.html": 31,
		"./Multiselect.js": 30,
		"./Password": 32,
		"./Password.html": 33,
		"./Password.js": 32,
		"./Price": 34,
		"./Price.html": 35,
		"./Price.js": 34,
		"./Priceperunit": 36,
		"./Priceperunit.html": 37,
		"./Priceperunit.js": 36,
		"./Radio": 38,
		"./Radio.html": 39,
		"./Radio.js": 38,
		"./Select": 40,
		"./Select.html": 41,
		"./Select.js": 40,
		"./Textarea": 42,
		"./Textarea.html": 43,
		"./Textarea.js": 42
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 44;


/***/ }
/******/ ]);