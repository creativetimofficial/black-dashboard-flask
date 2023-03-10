// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { RestConfigBase } from "../../common.browser/RestConfigBase";
export class ConversationConnectionConfig extends RestConfigBase {
    static get host() {
        return ConversationConnectionConfig.privHost;
    }
    static get apiVersion() {
        return ConversationConnectionConfig.privApiVersion;
    }
    static get clientAppId() {
        return ConversationConnectionConfig.privClientAppId;
    }
    static get defaultLanguageCode() {
        return ConversationConnectionConfig.privDefaultLanguageCode;
    }
    static get restPath() {
        return ConversationConnectionConfig.privRestPath;
    }
    static get webSocketPath() {
        return ConversationConnectionConfig.privWebSocketPath;
    }
    static get transcriptionEventKeys() {
        return ConversationConnectionConfig.privTranscriptionEventKeys;
    }
}
ConversationConnectionConfig.privHost = "dev.microsofttranslator.com";
ConversationConnectionConfig.privRestPath = "/capito/room";
ConversationConnectionConfig.privApiVersion = "2.0";
ConversationConnectionConfig.privDefaultLanguageCode = "en-US";
ConversationConnectionConfig.privClientAppId = "FC539C22-1767-4F1F-84BC-B4D811114F15";
ConversationConnectionConfig.privWebSocketPath = "/capito/translate";
ConversationConnectionConfig.privTranscriptionEventKeys = ["iCalUid", "callId", "organizer", "FLAC", "MTUri", "DifferentiateGuestSpeakers", "audiorecording", "Threadid", "OrganizerMri", "OrganizerTenantId", "UserToken"];

//# sourceMappingURL=ConversationConnectionConfig.js.map
