"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoDetectSourceLanguageConfig = void 0;
var Exports_1 = require("../common.speech/Exports");
var Contracts_1 = require("./Contracts");
var Exports_2 = require("./Exports");
var LanguageIdMode_1 = require("./LanguageIdMode");
/**
 * Language auto detect configuration.
 * @class AutoDetectSourceLanguageConfig
 * Added in version 1.13.0.
 */
var AutoDetectSourceLanguageConfig = /** @class */ (function () {
    function AutoDetectSourceLanguageConfig() {
        this.privProperties = new Exports_2.PropertyCollection();
        this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "AtStart");
        this.privLanguageIdMode = LanguageIdMode_1.LanguageIdMode.AtStart;
    }
    /**
     * @member AutoDetectSourceLanguageConfig.fromOpenRange
     * @function
     * @public
     * Only [[SpeechSynthesizer]] supports source language auto detection from open range,
     * for [[Recognizer]], please use AutoDetectSourceLanguageConfig with specific source languages.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with open range.
     */
    AutoDetectSourceLanguageConfig.fromOpenRange = function () {
        var config = new AutoDetectSourceLanguageConfig();
        config.properties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, Exports_1.AutoDetectSourceLanguagesOpenRangeOptionName);
        return config;
    };
    /**
     * @member AutoDetectSourceLanguageConfig.fromLanguages
     * @function
     * @public
     * @param {string[]} languages Comma-separated string of languages (eg. "en-US,fr-FR") to populate properties of config.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given languages.
     */
    AutoDetectSourceLanguageConfig.fromLanguages = function (languages) {
        Contracts_1.Contracts.throwIfArrayEmptyOrWhitespace(languages, "languages");
        var config = new AutoDetectSourceLanguageConfig();
        config.properties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, languages.join());
        return config;
    };
    /**
     * @member AutoDetectSourceLanguageConfig.fromSourceLanguageConfigs
     * @function
     * @public
     * @param {SourceLanguageConfig[]} configs SourceLanguageConfigs to populate properties of config.
     * @return {AutoDetectSourceLanguageConfig} Instance of AutoDetectSourceLanguageConfig
     * @summary Creates an instance of the AutoDetectSourceLanguageConfig with given SourceLanguageConfigs.
     */
    AutoDetectSourceLanguageConfig.fromSourceLanguageConfigs = function (configs) {
        if (configs.length < 1) {
            throw new Error("Expected non-empty SourceLanguageConfig array.");
        }
        var autoConfig = new AutoDetectSourceLanguageConfig();
        var langs = [];
        configs.forEach(function (config) {
            langs.push(config.language);
            if (config.endpointId !== undefined && config.endpointId !== "") {
                var customProperty = config.language + Exports_2.PropertyId.SpeechServiceConnection_EndpointId.toString();
                autoConfig.properties.setProperty(customProperty, config.endpointId);
            }
        });
        autoConfig.properties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages, langs.join());
        return autoConfig;
    };
    Object.defineProperty(AutoDetectSourceLanguageConfig.prototype, "properties", {
        /**
         * @member AutoDetectSourceLanguageConfig.prototype.properties
         * @function
         * @public
         * @return {PropertyCollection} Properties of the config.
         * @summary Gets an auto detected language config properties
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AutoDetectSourceLanguageConfig.prototype, "mode", {
        /**
         * @member AutoDetectSourceLanguageConfig.prototype.mode
         * @function
         * @public
         * @param {LanguageIdMode} mode LID mode desired.
         * @summary Sets LID operation to desired mode
         */
        set: function (mode) {
            if (mode === LanguageIdMode_1.LanguageIdMode.Continuous) {
                this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "2");
                this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "Continuous");
            }
            else { // LanguageIdMode.AtStart
                this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_RecognitionEndpointVersion, "1");
                this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceConnection_LanguageIdMode, "AtStart");
            }
            this.privLanguageIdMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    return AutoDetectSourceLanguageConfig;
}());
exports.AutoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig;

//# sourceMappingURL=AutoDetectSourceLanguageConfig.js.map
