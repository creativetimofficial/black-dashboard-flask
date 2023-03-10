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
exports.DialogConnectionFactory = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../common.speech/Exports");
var Exports_3 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_4 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var QueryParameterNames_1 = require("./QueryParameterNames");
var DialogConnectionFactory = /** @class */ (function (_super) {
    __extends(DialogConnectionFactory, _super);
    function DialogConnectionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var applicationId = config.parameters.getProperty(Exports_3.PropertyId.Conversation_ApplicationId, "");
        var dialogType = config.parameters.getProperty(Exports_3.PropertyId.Conversation_DialogType);
        var region = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Region);
        var language = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");
        var requestTurnStatus = config.parameters.getProperty(Exports_3.PropertyId.Conversation_Request_Bot_Status_Messages, "true");
        var queryParams = {};
        queryParams[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        queryParams[QueryParameterNames_1.QueryParameterNames.Format] = config.parameters.getProperty(Exports_2.OutputFormatPropertyName, Exports_3.OutputFormat[Exports_3.OutputFormat.Simple]).toLowerCase();
        queryParams[QueryParameterNames_1.QueryParameterNames.Language] = language;
        queryParams[QueryParameterNames_1.QueryParameterNames.RequestBotStatusMessages] = requestTurnStatus;
        if (applicationId) {
            queryParams[QueryParameterNames_1.QueryParameterNames.BotId] = applicationId;
            if (dialogType === Exports_3.DialogServiceConfig.DialogTypes.CustomCommands) {
                queryParams[HeaderNames_1.HeaderNames.CustomCommandsAppId] = applicationId;
            }
        }
        var resourceInfix = dialogType === Exports_3.DialogServiceConfig.DialogTypes.CustomCommands ? "commands/"
            : "";
        var version = dialogType === Exports_3.DialogServiceConfig.DialogTypes.CustomCommands ? "v1"
            : dialogType === Exports_3.DialogServiceConfig.DialogTypes.BotFramework ? "v3"
                : "v0";
        var headers = {};
        if (authInfo.token != null && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        // The URL used for connection is chosen in a priority order of specification:
        //  1. If a custom endpoint is provided, that URL is used verbatim.
        //  2. If a custom host is provided (e.g. "wss://my.custom.endpoint.com:1123"), a URL is constructed from it.
        //  3. If no custom connection details are provided, a URL is constructed from default values.
        var endpoint = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Endpoint, "");
        if (!endpoint) {
            var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
            var host = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Host, "wss://" + region + "." + DialogConnectionFactory.BaseUrl + hostSuffix);
            var standardizedHost = host.endsWith("/") ? host : host + "/";
            endpoint = "" + standardizedHost + resourceInfix + DialogConnectionFactory.ApiKey + "/" + version;
        }
        this.setCommonUrlParams(config, queryParams, endpoint);
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_4.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    DialogConnectionFactory.ApiKey = "api";
    DialogConnectionFactory.BaseUrl = "convai.speech";
    return DialogConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.DialogConnectionFactory = DialogConnectionFactory;

//# sourceMappingURL=DialogConnectorFactory.js.map
