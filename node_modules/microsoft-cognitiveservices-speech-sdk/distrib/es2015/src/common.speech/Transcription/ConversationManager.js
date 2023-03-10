// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { RestMessageAdapter, RestRequestType } from "../../common.browser/Exports";
import { Contracts } from "../../sdk/Contracts";
import { PropertyId } from "../../sdk/Exports";
import { ConversationConnectionConfig } from "./ConversationConnectionConfig";
export class ConversationManager {
    constructor() {
        //
        this.privRequestParams = ConversationConnectionConfig.configParams;
        this.privErrors = ConversationConnectionConfig.restErrors;
        this.privHost = ConversationConnectionConfig.host;
        this.privApiVersion = ConversationConnectionConfig.apiVersion;
        this.privRestPath = ConversationConnectionConfig.restPath;
        this.privRestAdapter = new RestMessageAdapter({});
    }
    /**
     * Make a POST request to the Conversation Manager service endpoint to create or join a conversation.
     * @param args
     * @param conversationCode
     * @param callback
     * @param errorCallback
     */
    createOrJoin(args, conversationCode, cb, err) {
        try {
            Contracts.throwIfNullOrUndefined(args, "args");
            const languageCode = args.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage, ConversationConnectionConfig.defaultLanguageCode);
            const nickname = args.getProperty(PropertyId.ConversationTranslator_Name, "conversation_host");
            const endpointHost = args.getProperty(PropertyId.ConversationTranslator_Host, this.privHost);
            const correlationId = args.getProperty(PropertyId.ConversationTranslator_CorrelationId);
            const subscriptionKey = args.getProperty(PropertyId.SpeechServiceConnection_Key);
            const subscriptionRegion = args.getProperty(PropertyId.SpeechServiceConnection_Region);
            const authToken = args.getProperty(PropertyId.SpeechServiceAuthorization_Token);
            Contracts.throwIfNullOrWhitespace(languageCode, "languageCode");
            Contracts.throwIfNullOrWhitespace(nickname, "nickname");
            Contracts.throwIfNullOrWhitespace(endpointHost, "endpointHost");
            const queryParams = {};
            queryParams[this.privRequestParams.apiVersion] = this.privApiVersion;
            queryParams[this.privRequestParams.languageCode] = languageCode;
            queryParams[this.privRequestParams.nickname] = nickname;
            const headers = {};
            if (correlationId) {
                headers[this.privRequestParams.correlationId] = correlationId;
            }
            headers[this.privRequestParams.clientAppId] = ConversationConnectionConfig.clientAppId;
            if (conversationCode !== undefined) {
                queryParams[this.privRequestParams.roomId] = conversationCode;
            }
            else {
                Contracts.throwIfNullOrUndefined(subscriptionRegion, this.privErrors.authInvalidSubscriptionRegion);
                headers[this.privRequestParams.subscriptionRegion] = subscriptionRegion;
                if (subscriptionKey) {
                    headers[this.privRequestParams.subscriptionKey] = subscriptionKey;
                }
                else if (authToken) {
                    headers[this.privRequestParams.authorization] = `Bearer ${authToken}`;
                }
                else {
                    Contracts.throwIfNullOrUndefined(subscriptionKey, this.privErrors.authInvalidSubscriptionKey);
                }
            }
            const config = {};
            config.headers = headers;
            this.privRestAdapter.options = config;
            const endpoint = `https://${endpointHost}${this.privRestPath}`;
            // TODO: support a proxy and certificate validation
            this.privRestAdapter.request(RestRequestType.Post, endpoint, queryParams, null).then((response) => {
                const requestId = RestMessageAdapter.extractHeaderValue(this.privRequestParams.requestId, response.headers);
                if (!response.ok) {
                    if (!!err) {
                        // get the error
                        let errorMessage = this.privErrors.invalidCreateJoinConversationResponse.replace("{status}", response.status.toString());
                        let errMessageRaw;
                        try {
                            errMessageRaw = JSON.parse(response.data);
                            errorMessage += ` [${errMessageRaw.error.code}: ${errMessageRaw.error.message}]`;
                        }
                        catch (e) {
                            errorMessage += ` [${response.data}]`;
                        }
                        if (requestId) {
                            errorMessage += ` ${requestId}`;
                        }
                        err(errorMessage);
                    }
                    return;
                }
                const conversation = JSON.parse(response.data);
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
            }).catch(() => { });
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    const typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
        }
    }
    /**
     * Make a DELETE request to the Conversation Manager service endpoint to leave the conversation.
     * @param args
     * @param sessionToken
     * @param callback
     */
    leave(args, sessionToken) {
        return new Promise((resolve, reject) => {
            try {
                Contracts.throwIfNullOrUndefined(args, this.privErrors.invalidArgs.replace("{arg}", "config"));
                Contracts.throwIfNullOrWhitespace(sessionToken, this.privErrors.invalidArgs.replace("{arg}", "token"));
                const endpointHost = args.getProperty(PropertyId.ConversationTranslator_Host, this.privHost);
                const correlationId = args.getProperty(PropertyId.ConversationTranslator_CorrelationId);
                const queryParams = {};
                queryParams[this.privRequestParams.apiVersion] = this.privApiVersion;
                queryParams[this.privRequestParams.sessionToken] = sessionToken;
                const headers = {};
                if (correlationId) {
                    headers[this.privRequestParams.correlationId] = correlationId;
                }
                const config = {};
                config.headers = headers;
                this.privRestAdapter.options = config;
                const endpoint = `https://${endpointHost}${this.privRestPath}`;
                // TODO: support a proxy and certificate validation
                this.privRestAdapter.request(RestRequestType.Delete, endpoint, queryParams, null).then((response) => {
                    if (!response.ok) {
                        // ignore errors on delete
                    }
                    resolve();
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                }).catch(() => { });
            }
            catch (error) {
                if (error instanceof Error) {
                    const typedError = error;
                    reject(typedError.name + ": " + typedError.message);
                }
                else {
                    reject(error);
                }
            }
        });
    }
}

//# sourceMappingURL=ConversationManager.js.map
