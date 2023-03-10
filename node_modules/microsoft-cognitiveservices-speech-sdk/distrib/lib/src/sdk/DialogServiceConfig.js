"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogServiceConfigImpl = exports.DialogServiceConfig = void 0;
/* eslint-disable max-classes-per-file */
var Contracts_1 = require("./Contracts");
var Exports_1 = require("./Exports");
/**
 * Class that defines base configurations for dialog service connector
 * @class DialogServiceConfig
 */
var DialogServiceConfig = /** @class */ (function () {
    /**
     * Creates an instance of DialogService config.
     * @constructor
     */
    function DialogServiceConfig() {
        return;
    }
    Object.defineProperty(DialogServiceConfig.prototype, "applicationId", {
        /**
         * Sets the corresponding backend application identifier.
         * @member DialogServiceConfig.prototype.Conversation_ApplicationId
         * @function
         * @public
         * @param {string} value - The application identifier to set.
         */
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DialogServiceConfig, "DialogTypes", {
        get: function () {
            return {
                BotFramework: "bot_framework",
                CustomCommands: "custom_commands"
            };
        },
        enumerable: false,
        configurable: true
    });
    return DialogServiceConfig;
}());
exports.DialogServiceConfig = DialogServiceConfig;
/**
 * Dialog Service configuration.
 * @class DialogServiceConfigImpl
 */
var DialogServiceConfigImpl = /** @class */ (function (_super) {
    __extends(DialogServiceConfigImpl, _super);
    /**
     * Creates an instance of dialogService config.
     */
    function DialogServiceConfigImpl() {
        var _this = _super.call(this) || this;
        _this.privSpeechConfig = new Exports_1.SpeechConfigImpl();
        return _this;
    }
    Object.defineProperty(DialogServiceConfigImpl.prototype, "properties", {
        /**
         * Provides access to custom properties.
         * @member DialogServiceConfigImpl.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The properties.
         */
        get: function () {
            return this.privSpeechConfig.properties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DialogServiceConfigImpl.prototype, "speechRecognitionLanguage", {
        /**
         * Gets the speech recognition language.
         * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
         * @function
         * @public
         */
        get: function () {
            return this.privSpeechConfig.speechRecognitionLanguage;
        },
        /**
         * Sets the speech recognition language.
         * @member DialogServiceConfigImpl.prototype.speechRecognitionLanguage
         * @function
         * @public
         * @param {string} value - The language to set.
         */
        set: function (value) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(value, "value");
            this.privSpeechConfig.speechRecognitionLanguage = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DialogServiceConfigImpl.prototype, "outputFormat", {
        get: function () {
            return this.privSpeechConfig.outputFormat;
        },
        set: function (value) {
            this.privSpeechConfig.outputFormat = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.setProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to set.
     * @param {string} value - The value.
     */
    DialogServiceConfigImpl.prototype.setProperty = function (name, value) {
        this.privSpeechConfig.setProperty(name, value);
    };
    /**
     * Sets a named property as value
     * @member DialogServiceConfigImpl.prototype.getProperty
     * @function
     * @public
     * @param {PropertyId | string} name - The property to get.
     * @param {string} def - The default value to return in case the property is not known.
     * @returns {string} The current value, or provided default, of the given property.
     */
    DialogServiceConfigImpl.prototype.getProperty = function (name, def) {
        void def;
        return this.privSpeechConfig.getProperty(name);
    };
    /**
     * Sets the proxy configuration.
     * Only relevant in Node.js environments.
     * Added in version 1.4.0.
     * @param proxyHostName The host name of the proxy server, without the protocol scheme (http://)
     * @param proxyPort The port number of the proxy server.
     * @param proxyUserName The user name of the proxy server.
     * @param proxyPassword The password of the proxy server.
     */
    DialogServiceConfigImpl.prototype.setProxy = function (proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.setProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyHostName, proxyHostName);
        this.setProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyPort, "" + proxyPort);
        if (proxyUserName) {
            this.setProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyUserName, proxyUserName);
        }
        if (proxyPassword) {
            this.setProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyPassword, proxyPassword);
        }
    };
    DialogServiceConfigImpl.prototype.setServiceProperty = function (name, value, channel) {
        void channel;
        this.privSpeechConfig.setServiceProperty(name, value);
    };
    /**
     * Dispose of associated resources.
     * @member DialogServiceConfigImpl.prototype.close
     * @function
     * @public
     */
    DialogServiceConfigImpl.prototype.close = function () {
        return;
    };
    return DialogServiceConfigImpl;
}(DialogServiceConfig));
exports.DialogServiceConfigImpl = DialogServiceConfigImpl;

//# sourceMappingURL=DialogServiceConfig.js.map
