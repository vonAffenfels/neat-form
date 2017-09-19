"use strict";

// @IMPORTS
const Application = require("neat-base").Application;
const Tools = require("neat-base").Tools;
const Promise = require("bluebird");
const crypto = require("crypto");
const Form = require("./Form.js");
const Group = require("./Group.js");

module.exports = class Field {

    /**
     *
     */
    constructor(config) {
        config = config || {};

        this.path = config.path || null;
        this.label = config.label || null;
        this.group = config.group || null;
        this.type = config.type || null;
        this.validatorsConfig = config.validators || null;
        this.validators = [];

        if (typeof this.path === "object") {
            if (!config.default) {
                config.default = {}
            }

            for (let fieldKey in this.path) {
                if (!config.default[fieldKey]) {
                    config.default[fieldKey] = null;
                }
            }
        }

        delete config.path;
        delete config.label;
        delete config.group;
        delete config.type;

        this.valueSet = false;
        this.value = null;
        this.displayValue = null;

        this.config = config;
        this.renderOptions = config.renderOptions || {};

        this.init();
        this.initValidators();

        if (this.group) {
            this.group.addField(this);
        }
    }

    /**
     *
     */
    init() {

    }

    getForm() {
        if (this.group) {
            return this.group.form;
        }

        return;
    }

    initValidators() {
        this.valid = true;
        this.validated = false;

        if (!this.validatorsConfig) {
            return;
        }

        if (this.validatorsConfig instanceof Object && !(this.validatorsConfig instanceof Array)) {
            for (let path in this.validatorsConfig) {
                let pathValidator = this.validatorsConfig[path];
                this.validators = this.validators.concat(this.getValidatorsFromConfig(pathValidator, path));
            }
        } else {
            this.validators = this.getValidatorsFromConfig(this.validatorsConfig);
        }
    }

    getValidatorsFromConfig(config, path) {
        let validators = [];

        for (let i = 0; i < config.length; i++) {
            let validator = config[i];
            let validatorFunc;

            if (typeof validator === "string" || validator instanceof Object) {
                validatorFunc = this.loadValidator(validator, path);
            }

            let validatorName = "validator_" + i;
            if (typeof validator === "string") {
                validatorName = validator;
            }

            if (validatorFunc) {
                validators.push({
                    name: validatorName,
                    message: validatorFunc.message || "validator " + validatorName + " failed",
                    func: validatorFunc,
                    path: path
                });
            }
        }

        return validators;
    }

    /**
     *
     * @returns {*}
     */
    getLabel() {
        return this.label;
    }

    /**
     *
     * @returns {*}
     */
    getPath() {
        return this.path;
    }

    /**
     *
     * @returns {null|*}
     */
    getValue() {
        if (!this.valueSet && this.config.default) {
            this.setValue(this.config.default, true);
        }
        return this.value;
    }

    getDocumentValue() {
        return this.value;
    }

    getRenderOptions() {
        return this.renderOptions;
    }

    /**
     *
     * @returns {string}
     */
    getType() {
        return this.type;
    }

    /**
     *
     * @returns {string}
     */
    getId() {
        let path = this.path;

        if (typeof path === "object") {
            try {
                path = JSON.stringify(path);
            } catch (e) {
                throw new Error("Error while generating Field id, this means path is of type object but not JSON.stringify'able");
            }
        }

        return crypto.createHash('md5').update(path).digest("hex");
    }

    loadValidator(config, path) {
        return Application.modules.form.getValidator(config, this, path);
    }

    /**
     *
     * @param val
     * @param Boolean fromDocument
     */
    setValue(val, fromDocument) {
        this.value = val;
        this.valueSet = true;
        this.validated = false;
    }

    /**
     *
     * @returns {null}
     */
    getDisplayValue() {
        return this.displayValue;
    }

    loadSchema(defaultSchema) {
        return new Promise((resolve, reject) => {
            return resolve(defaultSchema);
        });
    }

    /**
     *
     */
    getSchema() {
        return Promise.resolve().then(() => {
            return this.getValue();
        }).then((value) => {
            let defaultSchema = {
                value: value,
                validated: this.validated,
                valid: this.valid,
                errors: this.errors || null,
                default: this.config.default || null,
                displayValue: this.getDisplayValue(),
                label: this.getLabel(),
                id: this.getId(),
                renderOptions: this.getRenderOptions(),
                type: this.getType()
            };

            let schema = this.loadSchema(defaultSchema);

            return schema;
        });
    }

    setErrorByPath(path, error) {
        let fieldPaths = this.getPath();

        if (fieldPaths instanceof Object) {
            this.errors = {};
            for (let pathKey in fieldPaths) {
                if (fieldPaths[pathKey] === path) {
                    this.errors[pathKey] = error;
                }
            }
        } else {
            this.errors = error;
        }
    }

    validate() {
        if (!this.validators || !this.validators.length) {
            return Promise.resolve(true);
        }

        this.errors = {};
        return Promise.map(this.validators, (validatorConfig) => {
            if (this.value instanceof Object) {
                return Promise.map(Object.keys(this.value), (fieldKey) => {
                    // this is a validator for one specific path, ignore it for all others
                    if (validatorConfig.path && validatorConfig.path !== fieldKey) {
                        return true;
                    }

                    return Promise.resolve(validatorConfig.func(this.value[fieldKey])).then((val) => {
                        if (!val) {
                            this.errors[fieldKey] = validatorConfig.message;
                        }

                        return val;
                    });
                }).then((values) => {
                    this.validated = true;
                    this.valid = values.indexOf(false) === -1;

                    return this.valid;
                });
            } else if (this.value instanceof Array) {
                this.errors = [];
                return Promise.map(this.value, (value) => {
                    return Promise.resolve(validatorConfig.func(value)).then((val) => {
                        if (!val) {
                            this.errors.push(validatorConfig.message);
                        } else {
                            this.errors.push(null);
                        }

                        return val;
                    });
                }).then((values) => {
                    this.validated = true;
                    this.valid = values.indexOf(false) === -1;

                    return this.valid;
                });
            } else {
                return Promise.resolve(validatorConfig.func(this.value)).then((value) => {
                    if (!value) {
                        this.errors = validatorConfig.message;
                    }

                    this.validated = true;
                    this.valid = value;

                    return this.valid;
                });
            }
        }).then((valid) => {
            if (Object.keys(this.errors).length === 0) {
                this.errors = null;
            }

            return valid.indexOf(false) === -1;
        });
    }

    /**
     * Conditions
     */

    is(value) {
        let condition = {};
        condition[this.getId()] = value;
        return condition;
    }

    not(value) {
        let condition = {};
        condition["!" + this.getId()] = value;
        return condition;
    }

}