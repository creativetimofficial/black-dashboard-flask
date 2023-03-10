// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ProxyInfo, RestConfigBase, WebsocketConnection, } from "../../common.browser/Exports";
import { StringUtils } from "../../common/StringUtils";
import { Contracts } from "../../sdk/Contracts";
import { PropertyId } from "../../sdk/Exports";
import { HeaderNames } from "../HeaderNames";
import { QueryParameterNames } from "../QueryParameterNames";
import { ConnectionFactoryBase } from "./../ConnectionFactoryBase";
import { TranscriberConnectionFactory, TranslationConnectionFactory, WebsocketMessageFormatter, } from "./../Exports";
/**
 * Connection factory for the conversation translator. Handles connecting to the regular translator endpoint,
 * as well as the virtual microphone array transcription endpoint
 */
export class ConversationTranslatorConnectionFactory extends ConnectionFactoryBase {
    constructor(convGetter) {
        super();
        Contracts.throwIfNullOrUndefined(convGetter, "convGetter");
        this.privConvGetter = convGetter;
    }
    create(config, authInfo, connectionId) {
        const isVirtMicArrayEndpoint = config.parameters.getProperty("ConversationTranslator_MultiChannelAudio", "").toUpperCase() === "TRUE";
        const convInfo = this.privConvGetter().room;
        const region = convInfo.cognitiveSpeechRegion || config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region, "");
        const replacementValues = {
            hostSuffix: ConnectionFactoryBase.getHostSuffix(region),
            path: ConversationTranslatorConnectionFactory.CTS_VIRT_MIC_PATH,
            region: encodeURIComponent(region)
        };
        replacementValues[QueryParameterNames.Language] = encodeURIComponent(config.parameters.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage, ""));
        replacementValues[QueryParameterNames.CtsMeetingId] = encodeURIComponent(convInfo.roomId);
        replacementValues[QueryParameterNames.CtsDeviceId] = encodeURIComponent(convInfo.participantId);
        replacementValues[QueryParameterNames.CtsIsParticipant] = convInfo.isHost ? "" : ("&" + QueryParameterNames.CtsIsParticipant);
        let endpointUrl = "";
        const queryParams = {};
        const headers = {};
        if (isVirtMicArrayEndpoint) {
            // connecting to the conversation transcription virtual microphone array endpoint
            endpointUrl = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint);
            if (!endpointUrl) {
                const hostName = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Host, "transcribe.{region}.cts.speech{hostSuffix}");
                endpointUrl = "wss://" + hostName + "{path}";
            }
            // because the region can change during a session, we support being passed a format string which we can then
            // replace with the correct information.
            endpointUrl = StringUtils.formatString(endpointUrl, replacementValues);
            const parsedUrl = new URL(endpointUrl);
            parsedUrl.searchParams.forEach((val, key) => {
                queryParams[key] = val;
            });
            const connFactory = new TranscriberConnectionFactory();
            connFactory.setQueryParams(queryParams, config, endpointUrl);
            // Some query parameters are required for the CTS endpoint, let's explicity set them here
            queryParams[QueryParameterNames.CtsMeetingId] = replacementValues[QueryParameterNames.CtsMeetingId];
            queryParams[QueryParameterNames.CtsDeviceId] = replacementValues[QueryParameterNames.CtsDeviceId];
            if (!convInfo.isHost) {
                queryParams[QueryParameterNames.CtsIsParticipant] = ""; // this doesn't have a value so set to an empty string
            }
            if (!(QueryParameterNames.Format in queryParams)) {
                queryParams[QueryParameterNames.Format] = "simple";
            }
            parsedUrl.searchParams.forEach((val, key) => {
                parsedUrl.searchParams.set(key, queryParams[key]);
                delete queryParams[key];
            });
            endpointUrl = parsedUrl.toString();
        }
        else {
            // connecting to regular translation endpoint
            const connFactory = new TranslationConnectionFactory();
            endpointUrl = connFactory.getEndpointUrl(config, true);
            endpointUrl = StringUtils.formatString(endpointUrl, replacementValues);
            connFactory.setQueryParams(queryParams, config, endpointUrl);
        }
        headers[HeaderNames.ConnectionId] = connectionId;
        headers[RestConfigBase.configParams.token] = convInfo.token;
        if (authInfo.token) {
            headers[authInfo.headerName] = authInfo.token;
        }
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "").toUpperCase() === "TRUE";
        return new WebsocketConnection(endpointUrl, queryParams, headers, new WebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    }
}
ConversationTranslatorConnectionFactory.CTS_VIRT_MIC_PATH = "/speech/recognition/dynamicaudio";

//# sourceMappingURL=ConversationTranslatorConnectionFactory.js.map
