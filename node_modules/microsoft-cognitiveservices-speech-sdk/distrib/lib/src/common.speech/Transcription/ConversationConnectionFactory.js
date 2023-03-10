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
exports.ConversationConnectionFactory = void 0;
var Exports_1 = require("../../common.browser/Exports");
var Exports_2 = require("../../common/Exports");
var Contracts_1 = require("../../sdk/Contracts");
var Exports_3 = require("../../sdk/Exports");
var ConnectionFactoryBase_1 = require("../ConnectionFactoryBase");
var ConversationConnectionConfig_1 = require("./ConversationConnectionConfig");
var ConversationWebsocketMessageFormatter_1 = require("./ConversationWebsocketMessageFormatter");
/**
 * Create a connection to the Conversation Translator websocket for sending instant messages and commands, and for receiving translated messages.
 * The conversation must already have been started or joined.
 */
var ConversationConnectionFactory = /** @class */ (function (_super) {
    __extends(ConversationConnectionFactory, _super);
    function ConversationConnectionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConversationConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var endpointHost = config.parameters.getProperty(Exports_3.PropertyId.ConversationTranslator_Host, ConversationConnectionConfig_1.ConversationConnectionConfig.host);
        var correlationId = config.parameters.getProperty(Exports_3.PropertyId.ConversationTranslator_CorrelationId, Exports_2.createGuid());
        var endpoint = "wss://" + endpointHost + ConversationConnectionConfig_1.ConversationConnectionConfig.webSocketPath;
        var token = config.parameters.getProperty(Exports_3.PropertyId.ConversationTranslator_Token, undefined);
        Contracts_1.Contracts.throwIfNullOrUndefined(token, "token");
        var queryParams = {};
        queryParams[ConversationConnectionConfig_1.ConversationConnectionConfig.configParams.apiVersion] = ConversationConnectionConfig_1.ConversationConnectionConfig.apiVersion;
        queryParams[ConversationConnectionConfig_1.ConversationConnectionConfig.configParams.token] = token;
        queryParams[ConversationConnectionConfig_1.ConversationConnectionConfig.configParams.correlationId] = correlationId;
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_1.WebsocketConnection(endpoint, queryParams, {}, new ConversationWebsocketMessageFormatter_1.ConversationWebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    return ConversationConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.ConversationConnectionFactory = ConversationConnectionFactory;

//# sourceMappingURL=ConversationConnectionFactory.js.map
