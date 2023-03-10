"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestConfigBase = void 0;
var RestConfigBase = /** @class */ (function () {
    function RestConfigBase() {
    }
    Object.defineProperty(RestConfigBase, "requestOptions", {
        get: function () {
            return RestConfigBase.privDefaultRequestOptions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RestConfigBase, "configParams", {
        get: function () {
            return RestConfigBase.privDefaultParams;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RestConfigBase, "restErrors", {
        get: function () {
            return RestConfigBase.privRestErrors;
        },
        enumerable: false,
        configurable: true
    });
    RestConfigBase.privDefaultRequestOptions = {
        headers: {
            Accept: "application/json",
        },
        ignoreCache: false,
        timeout: 10000,
    };
    RestConfigBase.privRestErrors = {
        authInvalidSubscriptionKey: "You must specify either an authentication token to use, or a Cognitive Speech subscription key.",
        authInvalidSubscriptionRegion: "You must specify the Cognitive Speech region to use.",
        invalidArgs: "Required input not found: {arg}.",
        invalidCreateJoinConversationResponse: "Creating/Joining conversation failed with HTTP {status}.",
        invalidParticipantRequest: "The requested participant was not found.",
        permissionDeniedConnect: "Required credentials not found.",
        permissionDeniedConversation: "Invalid operation: only the host can {command} the conversation.",
        permissionDeniedParticipant: "Invalid operation: only the host can {command} a participant.",
        permissionDeniedSend: "Invalid operation: the conversation is not in a connected state.",
        permissionDeniedStart: "Invalid operation: there is already an active conversation.",
    };
    RestConfigBase.privDefaultParams = {
        apiVersion: "api-version",
        authorization: "Authorization",
        clientAppId: "X-ClientAppId",
        contentTypeKey: "Content-Type",
        correlationId: "X-CorrelationId",
        languageCode: "language",
        nickname: "nickname",
        profanity: "profanity",
        requestId: "X-RequestId",
        roomId: "roomid",
        sessionToken: "token",
        subscriptionKey: "Ocp-Apim-Subscription-Key",
        subscriptionRegion: "Ocp-Apim-Subscription-Region",
        token: "X-CapitoToken",
    };
    return RestConfigBase;
}());
exports.RestConfigBase = RestConfigBase;

//# sourceMappingURL=RestConfigBase.js.map
