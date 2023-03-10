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
exports.ConversationTranslatorConnectionFactory = void 0;
var Exports_1 = require("../../common.browser/Exports");
var StringUtils_1 = require("../../common/StringUtils");
var Contracts_1 = require("../../sdk/Contracts");
var Exports_2 = require("../../sdk/Exports");
var HeaderNames_1 = require("../HeaderNames");
var QueryParameterNames_1 = require("../QueryParameterNames");
var ConnectionFactoryBase_1 = require("./../ConnectionFactoryBase");
var Exports_3 = require("./../Exports");
/**
 * Connection factory for the conversation translator. Handles connecting to the regular translator endpoint,
 * as well as the virtual microphone array transcription endpoint
 */
var ConversationTranslatorConnectionFactory = /** @class */ (function (_super) {
    __extends(ConversationTranslatorConnectionFactory, _super);
    function ConversationTranslatorConnectionFactory(convGetter) {
        var _this = _super.call(this) || this;
        Contracts_1.Contracts.throwIfNullOrUndefined(convGetter, "convGetter");
        _this.privConvGetter = convGetter;
        return _this;
    }
    ConversationTranslatorConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var isVirtMicArrayEndpoint = config.parameters.getProperty("ConversationTranslator_MultiChannelAudio", "").toUpperCase() === "TRUE";
        var convInfo = this.privConvGetter().room;
        var region = convInfo.cognitiveSpeechRegion || config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region, "");
        var replacementValues = {
            hostSuffix: ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region),
            path: ConversationTranslatorConnectionFactory.CTS_VIRT_MIC_PATH,
            region: encodeURIComponent(region)
        };
        replacementValues[QueryParameterNames_1.QueryParameterNames.Language] = encodeURIComponent(config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage, ""));
        replacementValues[QueryParameterNames_1.QueryParameterNames.CtsMeetingId] = encodeURIComponent(convInfo.roomId);
        replacementValues[QueryParameterNames_1.QueryParameterNames.CtsDeviceId] = encodeURIComponent(convInfo.participantId);
        replacementValues[QueryParameterNames_1.QueryParameterNames.CtsIsParticipant] = convInfo.isHost ? "" : ("&" + QueryParameterNames_1.QueryParameterNames.CtsIsParticipant);
        var endpointUrl = "";
        var queryParams = {};
        var headers = {};
        if (isVirtMicArrayEndpoint) {
            // connecting to the conversation transcription virtual microphone array endpoint
            endpointUrl = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint);
            if (!endpointUrl) {
                var hostName = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "transcribe.{region}.cts.speech{hostSuffix}");
                endpointUrl = "wss://" + hostName + "{path}";
            }
            // because the region can change during a session, we support being passed a format string which we can then
            // replace with the correct information.
            endpointUrl = StringUtils_1.StringUtils.formatString(endpointUrl, replacementValues);
            var parsedUrl_1 = new URL(endpointUrl);
            parsedUrl_1.searchParams.forEach(function (val, key) {
                queryParams[key] = val;
            });
            var connFactory = new Exports_3.TranscriberConnectionFactory();
            connFactory.setQueryParams(queryParams, config, endpointUrl);
            // Some query parameters are required for the CTS endpoint, let's explicity set them here
            queryParams[QueryParameterNames_1.QueryParameterNames.CtsMeetingId] = replacementValues[QueryParameterNames_1.QueryParameterNames.CtsMeetingId];
            queryParams[QueryParameterNames_1.QueryParameterNames.CtsDeviceId] = replacementValues[QueryParameterNames_1.QueryParameterNames.CtsDeviceId];
            if (!convInfo.isHost) {
                queryParams[QueryParameterNames_1.QueryParameterNames.CtsIsParticipant] = ""; // this doesn't have a value so set to an empty string
            }
            if (!(QueryParameterNames_1.QueryParameterNames.Format in queryParams)) {
                queryParams[QueryParameterNames_1.QueryParameterNames.Format] = "simple";
            }
            parsedUrl_1.searchParams.forEach(function (val, key) {
                parsedUrl_1.searchParams.set(key, queryParams[key]);
                delete queryParams[key];
            });
            endpointUrl = parsedUrl_1.toString();
        }
        else {
            // connecting to regular translation endpoint
            var connFactory = new Exports_3.TranslationConnectionFactory();
            endpointUrl = connFactory.getEndpointUrl(config, true);
            endpointUrl = StringUtils_1.StringUtils.formatString(endpointUrl, replacementValues);
            connFactory.setQueryParams(queryParams, config, endpointUrl);
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        headers[Exports_1.RestConfigBase.configParams.token] = convInfo.token;
        if (authInfo.token) {
            headers[authInfo.headerName] = authInfo.token;
        }
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "").toUpperCase() === "TRUE";
        return new Exports_1.WebsocketConnection(endpointUrl, queryParams, headers, new Exports_3.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    ConversationTranslatorConnectionFactory.CTS_VIRT_MIC_PATH = "/speech/recognition/dynamicaudio";
    return ConversationTranslatorConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.ConversationTranslatorConnectionFactory = ConversationTranslatorConnectionFactory;

//# sourceMappingURL=ConversationTranslatorConnectionFactory.js.map
