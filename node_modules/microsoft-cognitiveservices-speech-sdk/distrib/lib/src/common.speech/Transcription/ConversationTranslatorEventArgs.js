"use strict";
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
exports.ConversationReceivedTranslationEventArgs = exports.ParticipantsListEventArgs = exports.ParticipantAttributeEventArgs = exports.ParticipantEventArgs = exports.LockRoomEventArgs = exports.MuteAllEventArgs = void 0;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../../sdk/Exports");
var MuteAllEventArgs = /** @class */ (function (_super) {
    __extends(MuteAllEventArgs, _super);
    function MuteAllEventArgs(isMuted, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privIsMuted = isMuted;
        return _this;
    }
    Object.defineProperty(MuteAllEventArgs.prototype, "isMuted", {
        get: function () {
            return this.privIsMuted;
        },
        enumerable: false,
        configurable: true
    });
    return MuteAllEventArgs;
}(Exports_1.SessionEventArgs));
exports.MuteAllEventArgs = MuteAllEventArgs;
var LockRoomEventArgs = /** @class */ (function (_super) {
    __extends(LockRoomEventArgs, _super);
    function LockRoomEventArgs(isLocked, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privIsLocked = isLocked;
        return _this;
    }
    Object.defineProperty(LockRoomEventArgs.prototype, "isMuted", {
        get: function () {
            return this.privIsLocked;
        },
        enumerable: false,
        configurable: true
    });
    return LockRoomEventArgs;
}(Exports_1.SessionEventArgs));
exports.LockRoomEventArgs = LockRoomEventArgs;
var ParticipantEventArgs = /** @class */ (function (_super) {
    __extends(ParticipantEventArgs, _super);
    function ParticipantEventArgs(participant, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privParticipant = participant;
        return _this;
    }
    Object.defineProperty(ParticipantEventArgs.prototype, "participant", {
        get: function () {
            return this.privParticipant;
        },
        enumerable: false,
        configurable: true
    });
    return ParticipantEventArgs;
}(Exports_1.SessionEventArgs));
exports.ParticipantEventArgs = ParticipantEventArgs;
var ParticipantAttributeEventArgs = /** @class */ (function (_super) {
    __extends(ParticipantAttributeEventArgs, _super);
    function ParticipantAttributeEventArgs(participantId, key, value, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privKey = key;
        _this.privValue = value;
        _this.privParticipantId = participantId;
        return _this;
    }
    Object.defineProperty(ParticipantAttributeEventArgs.prototype, "value", {
        get: function () {
            return this.privValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantAttributeEventArgs.prototype, "key", {
        get: function () {
            return this.privKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantAttributeEventArgs.prototype, "id", {
        get: function () {
            return this.privParticipantId;
        },
        enumerable: false,
        configurable: true
    });
    return ParticipantAttributeEventArgs;
}(Exports_1.SessionEventArgs));
exports.ParticipantAttributeEventArgs = ParticipantAttributeEventArgs;
var ParticipantsListEventArgs = /** @class */ (function (_super) {
    __extends(ParticipantsListEventArgs, _super);
    function ParticipantsListEventArgs(conversationId, token, translateTo, profanityFilter, roomProfanityFilter, isRoomLocked, isMuteAll, participants, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privRoomId = conversationId;
        _this.privSessionToken = token;
        _this.privTranslateTo = translateTo;
        _this.privProfanityFilter = profanityFilter;
        _this.privRoomProfanityFilter = roomProfanityFilter;
        _this.privIsRoomLocked = isRoomLocked;
        _this.privIsRoomLocked = isMuteAll;
        _this.privParticipants = participants;
        return _this;
    }
    Object.defineProperty(ParticipantsListEventArgs.prototype, "sessionToken", {
        get: function () {
            return this.privSessionToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "conversationId", {
        get: function () {
            return this.privRoomId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "translateTo", {
        get: function () {
            return this.privTranslateTo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "profanityFilter", {
        get: function () {
            return this.privProfanityFilter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "roomProfanityFilter", {
        get: function () {
            return this.privRoomProfanityFilter;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "isRoomLocked", {
        get: function () {
            return this.privIsRoomLocked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "isMuteAll", {
        get: function () {
            return this.privIsMuteAll;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ParticipantsListEventArgs.prototype, "participants", {
        get: function () {
            return this.privParticipants;
        },
        enumerable: false,
        configurable: true
    });
    return ParticipantsListEventArgs;
}(Exports_1.SessionEventArgs));
exports.ParticipantsListEventArgs = ParticipantsListEventArgs;
var ConversationReceivedTranslationEventArgs = /** @class */ (function () {
    function ConversationReceivedTranslationEventArgs(command, payload, sessionId) {
        this.privPayload = payload;
        this.privCommand = command;
        this.privSessionId = sessionId;
    }
    Object.defineProperty(ConversationReceivedTranslationEventArgs.prototype, "payload", {
        get: function () {
            return this.privPayload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationReceivedTranslationEventArgs.prototype, "command", {
        get: function () {
            return this.privCommand;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationReceivedTranslationEventArgs.prototype, "sessionId", {
        get: function () {
            return this.privSessionId;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationReceivedTranslationEventArgs;
}());
exports.ConversationReceivedTranslationEventArgs = ConversationReceivedTranslationEventArgs;

//# sourceMappingURL=ConversationTranslatorEventArgs.js.map
