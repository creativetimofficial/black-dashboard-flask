// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { ProxyInfo, WebsocketConnection, } from "../common.browser/Exports";
import { OutputFormatPropertyName } from "../common.speech/Exports";
import { DialogServiceConfig, OutputFormat, PropertyId } from "../sdk/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { WebsocketMessageFormatter } from "./Exports";
import { HeaderNames } from "./HeaderNames";
import { QueryParameterNames } from "./QueryParameterNames";
export class DialogConnectionFactory extends ConnectionFactoryBase {
    create(config, authInfo, connectionId) {
        const applicationId = config.parameters.getProperty(PropertyId.Conversation_ApplicationId, "");
        const dialogType = config.parameters.getProperty(PropertyId.Conversation_DialogType);
        const region = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region);
        const language = config.parameters.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage, "en-US");
        const requestTurnStatus = config.parameters.getProperty(PropertyId.Conversation_Request_Bot_Status_Messages, "true");
        const queryParams = {};
        queryParams[HeaderNames.ConnectionId] = connectionId;
        queryParams[QueryParameterNames.Format] = config.parameters.getProperty(OutputFormatPropertyName, OutputFormat[OutputFormat.Simple]).toLowerCase();
        queryParams[QueryParameterNames.Language] = language;
        queryParams[QueryParameterNames.RequestBotStatusMessages] = requestTurnStatus;
        if (applicationId) {
            queryParams[QueryParameterNames.BotId] = applicationId;
            if (dialogType === DialogServiceConfig.DialogTypes.CustomCommands) {
                queryParams[HeaderNames.CustomCommandsAppId] = applicationId;
            }
        }
        const resourceInfix = dialogType === DialogServiceConfig.DialogTypes.CustomCommands ? "commands/"
            : "";
        const version = dialogType === DialogServiceConfig.DialogTypes.CustomCommands ? "v1"
            : dialogType === DialogServiceConfig.DialogTypes.BotFramework ? "v3"
                : "v0";
        const headers = {};
        if (authInfo.token != null && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        // The URL used for connection is chosen in a priority order of specification:
        //  1. If a custom endpoint is provided, that URL is used verbatim.
        //  2. If a custom host is provided (e.g. "wss://my.custom.endpoint.com:1123"), a URL is constructed from it.
        //  3. If no custom connection details are provided, a URL is constructed from default values.
        let endpoint = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint, "");
        if (!endpoint) {
            const hostSuffix = ConnectionFactoryBase.getHostSuffix(region);
            const host = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Host, `wss://${region}.${DialogConnectionFactory.BaseUrl}${hostSuffix}`);
            const standardizedHost = host.endsWith("/") ? host : host + "/";
            endpoint = `${standardizedHost}${resourceInfix}${DialogConnectionFactory.ApiKey}/${version}`;
        }
        this.setCommonUrlParams(config, queryParams, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new WebsocketConnection(endpoint, queryParams, headers, new WebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    }
}
DialogConnectionFactory.ApiKey = "api";
DialogConnectionFactory.BaseUrl = "convai.speech";

//# sourceMappingURL=DialogConnectorFactory.js.map
