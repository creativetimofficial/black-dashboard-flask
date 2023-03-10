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
exports.ConversationConnectionConfig = void 0;
var RestConfigBase_1 = require("../../common.browser/RestConfigBase");
var ConversationConnectionConfig = /** @class */ (function (_super) {
    __extends(ConversationConnectionConfig, _super);
    function ConversationConnectionConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConversationConnectionConfig, "host", {
        get: function () {
            return ConversationConnectionConfig.privHost;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "apiVersion", {
        get: function () {
            return ConversationConnectionConfig.privApiVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "clientAppId", {
        get: function () {
            return ConversationConnectionConfig.privClientAppId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "defaultLanguageCode", {
        get: function () {
            return ConversationConnectionConfig.privDefaultLanguageCode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "restPath", {
        get: function () {
            return ConversationConnectionConfig.privRestPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "webSocketPath", {
        get: function () {
            return ConversationConnectionConfig.privWebSocketPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationConnectionConfig, "transcriptionEventKeys", {
        get: function () {
            return ConversationConnectionConfig.privTranscriptionEventKeys;
        },
        enumerable: false,
        configurable: true
    });
    ConversationConnectionConfig.privHost = "dev.microsofttranslator.com";
    ConversationConnectionConfig.privRestPath = "/capito/room";
    ConversationConnectionConfig.privApiVersion = "2.0";
    ConversationConnectionConfig.privDefaultLanguageCode = "en-US";
    ConversationConnectionConfig.privClientAppId = "FC539C22-1767-4F1F-84BC-B4D811114F15";
    ConversationConnectionConfig.privWebSocketPath = "/capito/translate";
    ConversationConnectionConfig.privTranscriptionEventKeys = ["iCalUid", "callId", "organizer", "FLAC", "MTUri", "DifferentiateGuestSpeakers", "audiorecording", "Threadid", "OrganizerMri", "OrganizerTenantId", "UserToken"];
    return ConversationConnectionConfig;
}(RestConfigBase_1.RestConfigBase));
exports.ConversationConnectionConfig = ConversationConnectionConfig;

//# sourceMappingURL=ConversationConnectionConfig.js.map
