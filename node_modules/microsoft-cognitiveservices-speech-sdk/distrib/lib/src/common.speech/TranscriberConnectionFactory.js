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
exports.TranscriberConnectionFactory = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_3 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var QueryParameterNames_1 = require("./QueryParameterNames");
var TranscriberConnectionFactory = /** @class */ (function (_super) {
    __extends(TranscriberConnectionFactory, _super);
    function TranscriberConnectionFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiaudioRelativeUri = "/speech/recognition/multiaudio";
        return _this;
    }
    TranscriberConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var endpoint = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        var region = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region, "centralus");
        var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
        var hostDefault = "wss://transcribe." + region + ".cts.speech" + hostSuffix + this.multiaudioRelativeUri;
        var host = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, hostDefault);
        var queryParams = {};
        this.setQueryParams(queryParams, config, endpoint);
        if (!endpoint) {
            endpoint = host;
        }
        var headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        config.parameters.setProperty(Exports_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_3.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    TranscriberConnectionFactory.prototype.setQueryParams = function (queryParams, config, endpointUrl) {
        var endpointId = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        var language = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId && !(QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId in queryParams)) {
            queryParams[QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
        }
        if (language && !(QueryParameterNames_1.QueryParameterNames.Language in queryParams)) {
            queryParams[QueryParameterNames_1.QueryParameterNames.Language] = language;
        }
        var wordLevelTimings = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps, "false").toLowerCase() === "true";
        var detailed = config.parameters.getProperty(Exports_3.OutputFormatPropertyName, Exports_2.OutputFormat[Exports_2.OutputFormat.Simple]) !== Exports_2.OutputFormat[Exports_2.OutputFormat.Simple];
        if (wordLevelTimings || detailed) {
            queryParams[QueryParameterNames_1.QueryParameterNames.Format] = Exports_2.OutputFormat[Exports_2.OutputFormat.Detailed].toLowerCase();
        }
        this.setCommonUrlParams(config, queryParams, endpointUrl);
    };
    return TranscriberConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.TranscriberConnectionFactory = TranscriberConnectionFactory;

//# sourceMappingURL=TranscriberConnectionFactory.js.map
