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
exports.SpeechConnectionFactory = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../common.speech/Exports");
var Exports_3 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_4 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var QueryParameterNames_1 = require("./QueryParameterNames");
var SpeechConnectionFactory = /** @class */ (function (_super) {
    __extends(SpeechConnectionFactory, _super);
    function SpeechConnectionFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.interactiveRelativeUri = "/speech/recognition/interactive/cognitiveservices/v1";
        _this.conversationRelativeUri = "/speech/recognition/conversation/cognitiveservices/v1";
        _this.dictationRelativeUri = "/speech/recognition/dictation/cognitiveservices/v1";
        _this.universalUri = "/speech/universal/v";
        return _this;
    }
    SpeechConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var endpoint = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        var region = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Region, undefined);
        var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
        var host = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".stt.speech" + hostSuffix);
        var queryParams = {};
        var endpointId = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        var language = config.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId) {
            if (!endpoint || endpoint.search(QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId) === -1) {
                queryParams[QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
            }
        }
        else if (language) {
            if (!endpoint || endpoint.search(QueryParameterNames_1.QueryParameterNames.Language) === -1) {
                queryParams[QueryParameterNames_1.QueryParameterNames.Language] = language;
            }
        }
        if (!endpoint || endpoint.search(QueryParameterNames_1.QueryParameterNames.Format) === -1) {
            queryParams[QueryParameterNames_1.QueryParameterNames.Format] = config.parameters.getProperty(Exports_2.OutputFormatPropertyName, Exports_3.OutputFormat[Exports_3.OutputFormat.Simple]).toLowerCase();
        }
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames_1.QueryParameterNames.EnableLanguageId] = "true";
        }
        this.setCommonUrlParams(config, queryParams, endpoint);
        if (!endpoint) {
            switch (config.recognitionMode) {
                case Exports_4.RecognitionMode.Conversation:
                    if (config.parameters.getProperty(Exports_2.ForceDictationPropertyName, "false") === "true") {
                        endpoint = host + this.dictationRelativeUri;
                    }
                    else {
                        if (config.recognitionEndpointVersion !== undefined && parseInt(config.recognitionEndpointVersion, 10) > 1) {
                            endpoint = "" + host + this.universalUri + config.recognitionEndpointVersion;
                        }
                        else {
                            endpoint = host + this.conversationRelativeUri;
                        }
                    }
                    break;
                case Exports_4.RecognitionMode.Dictation:
                    endpoint = host + this.dictationRelativeUri;
                    break;
                default:
                    if (config.recognitionEndpointVersion !== undefined && parseInt(config.recognitionEndpointVersion, 10) > 1) {
                        endpoint = "" + host + this.universalUri + config.recognitionEndpointVersion;
                    }
                    else {
                        endpoint = host + this.interactiveRelativeUri; // default is interactive
                    }
                    break;
            }
        }
        var headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        var webSocketConnection = new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_4.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        // Set the value of SpeechServiceConnection_Url to webSocketConnection.uri (and not to `endpoint`), since this value is the final
        // URI that was used to make the connection (including query parameters).
        var uri = webSocketConnection.uri;
        config.parameters.setProperty(Exports_3.PropertyId.SpeechServiceConnection_Url, uri);
        return webSocketConnection;
    };
    return SpeechConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.SpeechConnectionFactory = SpeechConnectionFactory;

//# sourceMappingURL=SpeechConnectionFactory.js.map
