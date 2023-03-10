"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantPayloadResponse = exports.ParticipantsListPayloadResponse = void 0;
var parseListResponse = function (json) { return JSON.parse(json); };
var parseParticipantResponse = function (json) { return JSON.parse(json); };
var ParticipantsListPayloadResponse = /** @class */ (function () {
    function ParticipantsListPayloadResponse(json) {
        this.privParticipantsPayloadResponse = parseListResponse(json);
    }
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "roomid", {
        get: function () {
            return this.privParticipantsPayloadResponse.roomid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "id", {
        get: function () {
            return this.privParticipantsPayloadResponse.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "command", {
        get: function () {
            return this.privParticipantsPayloadResponse.command;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "participants", {
        get: function () {
            return this.privParticipantsPayloadResponse.participants;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "token", {
        get: function () {
            return this.privParticipantsPayloadResponse.token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "translateTo", {
        get: function () {
            return this.privParticipantsPayloadResponse.translateTo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "profanityFilter", {
        get: function () {
            return this.privParticipantsPayloadResponse.profanityFilter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "roomProfanityFilter", {
        get: function () {
            return this.privParticipantsPayloadResponse.roomProfanityFilter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "roomLocked", {
        get: function () {
            return this.privParticipantsPayloadResponse.roomLocked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "muteAll", {
        get: function () {
            return this.privParticipantsPayloadResponse.muteAll;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListPayloadResponse.prototype, "type", {
        get: function () {
            return this.privParticipantsPayloadResponse.type;
        },
        enumerable: false,
        configurable: true
    });
    ParticipantsListPayloadResponse.fromJSON = function (json) {
        return new ParticipantsListPayloadResponse(json);
    };
    return ParticipantsListPayloadResponse;
}());
exports.ParticipantsListPayloadResponse = ParticipantsListPayloadResponse;
var ParticipantPayloadResponse = /** @class */ (function () {
    function ParticipantPayloadResponse(json) {
        this.privParticipantPayloadResponse = parseParticipantResponse(json);
    }
    Object.defineProperty(ParticipantPayloadResponse.prototype, "nickname", {
        get: function () {
            return this.privParticipantPayloadResponse.nickname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "locale", {
        get: function () {
            return this.privParticipantPayloadResponse.locale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "usetts", {
        get: function () {
            return this.privParticipantPayloadResponse.usetts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "ismuted", {
        get: function () {
            return this.privParticipantPayloadResponse.ismuted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "ishost", {
        get: function () {
            return this.privParticipantPayloadResponse.ishost;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "participantId", {
        get: function () {
            return this.privParticipantPayloadResponse.participantId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantPayloadResponse.prototype, "avatar", {
        get: function () {
            return this.privParticipantPayloadResponse.avatar;
        },
        enumerable: false,
        configurable: true
    });
    ParticipantPayloadResponse.fromJSON = function (json) {
        return new ParticipantPayloadResponse(json);
    };
    return ParticipantPayloadResponse;
}());
exports.ParticipantPayloadResponse = ParticipantPayloadResponse;

//# sourceMappingURL=ParticipantResponsePayload.js.map
