"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationManager = void 0;
var Exports_1 = require("../../common.browser/Exports");
var Contracts_1 = require("../../sdk/Contracts");
var Exports_2 = require("../../sdk/Exports");
var ConversationConnectionConfig_1 = require("./ConversationConnectionConfig");
var ConversationManager = /** @class */ (function () {
    function ConversationManager() {
        //
        this.privRequestParams = ConversationConnectionConfig_1.ConversationConnectionConfig.configParams;
        this.privErrors = ConversationConnectionConfig_1.ConversationConnectionConfig.restErrors;
        this.privHost = ConversationConnectionConfig_1.ConversationConnectionConfig.host;
        this.privApiVersion = ConversationConnectionConfig_1.ConversationConnectionConfig.apiVersion;
        this.privRestPath = ConversationConnectionConfig_1.ConversationConnectionConfig.restPath;
        this.privRestAdapter = new Exports_1.RestMessageAdapter({});
    }
    /**
     * Make a POST request to the Conversation Manager service endpoint to create or join a conversation.
     * @param args
     * @param conversationCode
     * @param callback
     * @param errorCallback
     */
    ConversationManager.prototype.createOrJoin = function (args, conversationCode, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfNullOrUndefined(args, "args");
            var languageCode = args.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage, ConversationConnectionConfig_1.ConversationConnectionConfig.defaultLanguageCode);
            var nickname = args.getProperty(Exports_2.PropertyId.ConversationTranslator_Name, "conversation_host");
            var endpointHost = args.getProperty(Exports_2.PropertyId.ConversationTranslator_Host, this.privHost);
            var correlationId = args.getProperty(Exports_2.PropertyId.ConversationTranslator_CorrelationId);
            var subscriptionKey = args.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Key);
            var subscriptionRegion = args.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region);
            var authToken = args.getProperty(Exports_2.PropertyId.SpeechServiceAuthorization_Token);
            Contracts_1.Contracts.throwIfNullOrWhitespace(languageCode, "languageCode");
            Contracts_1.Contracts.throwIfNullOrWhitespace(nickname, "nickname");
            Contracts_1.Contracts.throwIfNullOrWhitespace(endpointHost, "endpointHost");
            var queryParams = {};
            queryParams[this.privRequestParams.apiVersion] = this.privApiVersion;
            queryParams[this.privRequestParams.languageCode] = languageCode;
            queryParams[this.privRequestParams.nickname] = nickname;
            var headers = {};
            if (correlationId) {
                headers[this.privRequestParams.correlationId] = correlationId;
            }
            headers[this.privRequestParams.clientAppId] = ConversationConnectionConfig_1.ConversationConnectionConfig.clientAppId;
            if (conversationCode !== undefined) {
                queryParams[this.privRequestParams.roomId] = conversationCode;
            }
            else {
                Contracts_1.Contracts.throwIfNullOrUndefined(subscriptionRegion, this.privErrors.authInvalidSubscriptionRegion);
                headers[this.privRequestParams.subscriptionRegion] = subscriptionRegion;
                if (subscriptionKey) {
                    headers[this.privRequestParams.subscriptionKey] = subscriptionKey;
                }
                else if (authToken) {
                    headers[this.privRequestParams.authorization] = "Bearer " + authToken;
                }
                else {
                    Contracts_1.Contracts.throwIfNullOrUndefined(subscriptionKey, this.privErrors.authInvalidSubscriptionKey);
                }
            }
            var config = {};
            config.headers = headers;
            this.privRestAdapter.options = config;
            var endpoint = "https://" + endpointHost + this.privRestPath;
            // TODO: support a proxy and certificate validation
            this.privRestAdapter.request(Exports_1.RestRequestType.Post, endpoint, queryParams, null).then(function (response) {
                var requestId = Exports_1.RestMessageAdapter.extractHeaderValue(_this.privRequestParams.requestId, response.headers);
                if (!response.ok) {
                    if (!!err) {
                        // get the error
                        var errorMessage = _this.privErrors.invalidCreateJoinConversationResponse.replace("{status}", response.status.toString());
                        var errMessageRaw = void 0;
                        try {
                            errMessageRaw = JSON.parse(response.data);
                            errorMessage += " [" + errMessageRaw.error.code + ": " + errMessageRaw.error.message + "]";
                        }
                        catch (e) {
                            errorMessage += " [" + response.data + "]";
                        }
                        if (requestId) {
                            errorMessage += " " + requestId;
                        }
                        err(errorMessage);
                    }
                    return;
                }
                var conversation = JSON.parse(response.data);
                if (conversation) {
                    conversation.requestId = requestId;
                }
                if (!!cb) {
                    try {
                        cb(conversation);
                    }
                    catch (e) {
                        if (!!err) {
                            err(e);
                        }
                    }
                    cb = undefined;
                }
                // eslint-disable-next-line @typescript-eslint/no-empty-function
            }).catch(function () { });
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    var typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
        }
    };
    /**
     * Make a DELETE request to the Conversation Manager service endpoint to leave the conversation.
     * @param args
     * @param sessionToken
     * @param callback
     */
    ConversationManager.prototype.leave = function (args, sessionToken) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                Contracts_1.Contracts.throwIfNullOrUndefined(args, _this.privErrors.invalidArgs.replace("{arg}", "config"));
                Contracts_1.Contracts.throwIfNullOrWhitespace(sessionToken, _this.privErrors.invalidArgs.replace("{arg}", "token"));
                var endpointHost = args.getProperty(Exports_2.PropertyId.ConversationTranslator_Host, _this.privHost);
                var correlationId = args.getProperty(Exports_2.PropertyId.ConversationTranslator_CorrelationId);
                var queryParams = {};
                queryParams[_this.privRequestParams.apiVersion] = _this.privApiVersion;
                queryParams[_this.privRequestParams.sessionToken] = sessionToken;
                var headers = {};
                if (correlationId) {
                    headers[_this.privRequestParams.correlationId] = correlationId;
                }
                var config = {};
                config.headers = headers;
                _this.privRestAdapter.options = config;
                var endpoint = "https://" + endpointHost + _this.privRestPath;
                // TODO: support a proxy and certificate validation
                _this.privRestAdapter.request(Exports_1.RestRequestType.Delete, endpoint, queryParams, null).then(function (response) {
                    if (!response.ok) {
                        // ignore errors on delete
                    }
                    resolve();
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                }).catch(function () { });
            }
            catch (error) {
                if (error instanceof Error) {
                    var typedError = error;
                    reject(typedError.name + ": " + typedError.message);
                }
                else {
                    reject(error);
                }
            }
        });
    };
    return ConversationManager;
}());
exports.ConversationManager = ConversationManager;

//# sourceMappingURL=ConversationManager.js.map
