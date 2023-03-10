// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ProxyInfo, WebsocketConnection } from "../../common.browser/Exports";
import { createGuid } from "../../common/Exports";
import { Contracts } from "../../sdk/Contracts";
import { PropertyId } from "../../sdk/Exports";
import { ConnectionFactoryBase } from "../ConnectionFactoryBase";
import { ConversationConnectionConfig } from "./ConversationConnectionConfig";
import { ConversationWebsocketMessageFormatter } from "./ConversationWebsocketMessageFormatter";
/**
 * Create a connection to the Conversation Translator websocket for sending instant messages and commands, and for receiving translated messages.
 * The conversation must already have been started or joined.
 */
export class ConversationConnectionFactory extends ConnectionFactoryBase {
    create(config, authInfo, connectionId) {
        const endpointHost = config.parameters.getProperty(PropertyId.ConversationTranslator_Host, ConversationConnectionConfig.host);
        const correlationId = config.parameters.getProperty(PropertyId.ConversationTranslator_CorrelationId, createGuid());
        const endpoint = `wss://${endpointHost}${ConversationConnectionConfig.webSocketPath}`;
        const token = config.parameters.getProperty(PropertyId.ConversationTranslator_Token, undefined);
        Contracts.throwIfNullOrUndefined(token, "token");
        const queryParams = {};
        queryParams[ConversationConnectionConfig.configParams.apiVersion] = ConversationConnectionConfig.apiVersion;
        queryParams[ConversationConnectionConfig.configParams.token] = token;
        queryParams[ConversationConnectionConfig.configParams.correlationId] = correlationId;
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new WebsocketConnection(endpoint, queryParams, {}, new ConversationWebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    }
}

//# sourceMappingURL=ConversationConnectionFactory.js.map
