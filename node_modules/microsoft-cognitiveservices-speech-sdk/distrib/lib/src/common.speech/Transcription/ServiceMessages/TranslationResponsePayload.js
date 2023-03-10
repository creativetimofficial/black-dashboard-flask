"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextResponsePayload = exports.SpeechResponsePayload = void 0;
var parseSpeechResponse = function (json) { return JSON.parse(json); };
var parseTextResponse = function (json) { return JSON.parse(json); };
var SpeechResponsePayload = /** @class */ (function () {
    function SpeechResponsePayload(json) {
        this.privSpeechResponse = parseSpeechResponse(json);
    }
    Object.defineProperty(SpeechResponsePayload.prototype, "recognition", {
        get: function () {
            return this.privSpeechResponse.recognition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "translations", {
        get: function () {
            return this.privSpeechResponse.translations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "id", {
        get: function () {
            return this.privSpeechResponse.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "language", {
        get: function () {
            return this.privSpeechResponse.language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "nickname", {
        get: function () {
            return this.privSpeechResponse.nickname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "participantId", {
        get: function () {
            return this.privSpeechResponse.participantId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "roomid", {
        get: function () {
            return this.privSpeechResponse.roomid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "timestamp", {
        get: function () {
            return this.privSpeechResponse.timestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "type", {
        get: function () {
            return this.privSpeechResponse.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechResponsePayload.prototype, "isFinal", {
        get: function () {
            return this.privSpeechResponse.type === "final";
        },
        enumerable: false,
        configurable: true
    });
    SpeechResponsePayload.fromJSON = function (json) {
        return new SpeechResponsePayload(json);
    };
    return SpeechResponsePayload;
}());
exports.SpeechResponsePayload = SpeechResponsePayload;
var TextResponsePayload = /** @class */ (function () {
    function TextResponsePayload(json) {
        this.privTextResponse = parseTextResponse(json);
    }
    Object.defineProperty(TextResponsePayload.prototype, "originalText", {
        get: function () {
            return this.privTextResponse.originalText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "translations", {
        get: function () {
            return this.privTextResponse.translations;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "id", {
        get: function () {
            return this.privTextResponse.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "language", {
        get: function () {
            return this.privTextResponse.language;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "nickname", {
        get: function () {
            return this.privTextResponse.nickname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "participantId", {
        get: function () {
            return this.privTextResponse.participantId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "roomid", {
        get: function () {
            return this.privTextResponse.roomid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "timestamp", {
        get: function () {
            return this.privTextResponse.timestamp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextResponsePayload.prototype, "type", {
        get: function () {
            return this.privTextResponse.type;
        },
        enumerable: false,
        configurable: true
    });
    TextResponsePayload.fromJSON = function (json) {
        return new TextResponsePayload(json);
    };
    return TextResponsePayload;
}());
exports.TextResponsePayload = TextResponsePayload;

//# sourceMappingURL=TranslationResponsePayload.js.map
