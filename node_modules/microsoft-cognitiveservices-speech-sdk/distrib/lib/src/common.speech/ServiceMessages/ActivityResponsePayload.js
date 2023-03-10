"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// response
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDataStreamType = exports.ActivityPayloadResponse = void 0;
var ActivityPayloadResponse = /** @class */ (function () {
    function ActivityPayloadResponse(json) {
        this.privActivityResponse = JSON.parse(json);
    }
    ActivityPayloadResponse.fromJSON = function (json) {
        return new ActivityPayloadResponse(json);
    };
    Object.defineProperty(ActivityPayloadResponse.prototype, "conversationId", {
        get: function () {
            return this.privActivityResponse.conversationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActivityPayloadResponse.prototype, "messageDataStreamType", {
        get: function () {
            return this.privActivityResponse.messageDataStreamType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActivityPayloadResponse.prototype, "messagePayload", {
        get: function () {
            return this.privActivityResponse.messagePayload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActivityPayloadResponse.prototype, "version", {
        get: function () {
            return this.privActivityResponse.version;
        },
        enumerable: false,
        configurable: true
    });
    return ActivityPayloadResponse;
}());
exports.ActivityPayloadResponse = ActivityPayloadResponse;
var MessageDataStreamType;
(function (MessageDataStreamType) {
    MessageDataStreamType[MessageDataStreamType["None"] = 0] = "None";
    MessageDataStreamType[MessageDataStreamType["TextToSpeechAudio"] = 1] = "TextToSpeechAudio";
})(MessageDataStreamType = exports.MessageDataStreamType || (exports.MessageDataStreamType = {}));

//# sourceMappingURL=ActivityResponsePayload.js.map
