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
exports.CustomCommandsConfig = void 0;
var Contracts_1 = require("./Contracts");
var DialogServiceConfig_1 = require("./DialogServiceConfig");
var Exports_1 = require("./Exports");
/**
 * Class that defines configurations for the dialog service connector object for using a CustomCommands backend.
 * @class CustomCommandsConfig
 */
var CustomCommandsConfig = /** @class */ (function (_super) {
    __extends(CustomCommandsConfig, _super);
    /**
     * Creates an instance of CustomCommandsConfig.
     */
    function CustomCommandsConfig() {
        return _super.call(this) || this;
    }
    /**
     * Creates an instance of the bot framework config with the specified subscription and region.
     * @member CustomCommandsConfig.fromSubscription
     * @function
     * @public
     * @param applicationId Speech Commands application id.
     * @param subscription Subscription key associated with the bot
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {CustomCommandsConfig} A new bot framework config.
     */
    CustomCommandsConfig.fromSubscription = function (applicationId, subscription, region) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(applicationId, "applicationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(subscription, "subscription");
        Contracts_1.Contracts.throwIfNullOrWhitespace(region, "region");
        var customCommandsConfig = new DialogServiceConfig_1.DialogServiceConfigImpl();
        customCommandsConfig.setProperty(Exports_1.PropertyId.Conversation_DialogType, DialogServiceConfig_1.DialogServiceConfig.DialogTypes.CustomCommands);
        customCommandsConfig.setProperty(Exports_1.PropertyId.Conversation_ApplicationId, applicationId);
        customCommandsConfig.setProperty(Exports_1.PropertyId.SpeechServiceConnection_Key, subscription);
        customCommandsConfig.setProperty(Exports_1.PropertyId.SpeechServiceConnection_Region, region);
        return customCommandsConfig;
    };
    /**
     * Creates an instance of the bot framework config with the specified Speech Commands application id, authorization token and region.
     * Note: The caller needs to ensure that the authorization token is valid. Before the authorization token
     * expires, the caller needs to refresh it by calling this setter with a new valid token.
     * As configuration values are copied when creating a new recognizer, the new token value will not apply to recognizers that have already been created.
     * For recognizers that have been created before, you need to set authorization token of the corresponding recognizer
     * to refresh the token. Otherwise, the recognizers will encounter errors during recognition.
     * @member CustomCommandsConfig.fromAuthorizationToken
     * @function
     * @public
     * @param applicationId Speech Commands application id.
     * @param authorizationToken The authorization token associated with the application.
     * @param region The region name (see the <a href="https://aka.ms/csspeech/region">region page</a>).
     * @returns {CustomCommandsConfig} A new speech commands config.
     */
    CustomCommandsConfig.fromAuthorizationToken = function (applicationId, authorizationToken, region) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(applicationId, "applicationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(authorizationToken, "authorizationToken");
        Contracts_1.Contracts.throwIfNullOrWhitespace(region, "region");
        var customCommandsConfig = new DialogServiceConfig_1.DialogServiceConfigImpl();
        customCommandsConfig.setProperty(Exports_1.PropertyId.Conversation_DialogType, DialogServiceConfig_1.DialogServiceConfig.DialogTypes.CustomCommands);
        customCommandsConfig.setProperty(Exports_1.PropertyId.Conversation_ApplicationId, applicationId);
        customCommandsConfig.setProperty(Exports_1.PropertyId.SpeechServiceAuthorization_Token, authorizationToken);
        customCommandsConfig.setProperty(Exports_1.PropertyId.SpeechServiceConnection_Region, region);
        return customCommandsConfig;
    };
    Object.defineProperty(CustomCommandsConfig.prototype, "applicationId", {
        /**
         * Gets the corresponding backend application identifier.
         * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
         * @function
         * @public
         * @param {string} value - The application identifier to get.
         */
        get: function () {
            return this.getProperty(Exports_1.PropertyId.Conversation_ApplicationId);
        },
        /**
         * Sets the corresponding backend application identifier.
         * @member CustomCommandsConfig.prototype.Conversation_ApplicationId
         * @function
         * @public
         * @param {string} value - The application identifier to set.
         */
        set: function (value) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(value, "value");
            this.setProperty(Exports_1.PropertyId.Conversation_ApplicationId, value);
        },
        enumerable: false,
        configurable: true
    });
    return CustomCommandsConfig;
}(DialogServiceConfig_1.DialogServiceConfigImpl));
exports.CustomCommandsConfig = CustomCommandsConfig;

//# sourceMappingURL=CustomCommandsConfig.js.map
