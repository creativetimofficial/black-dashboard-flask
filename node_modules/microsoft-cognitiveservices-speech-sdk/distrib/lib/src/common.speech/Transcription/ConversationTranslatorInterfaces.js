"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationTranslatorCommandTypes = exports.ConversationTranslatorMessageTypes = exports.InternalParticipants = void 0;
/** Users participating in the conversation */
var InternalParticipants = /** @class */ (function () {
    function InternalParticipants(participants, meId) {
        if (participants === void 0) { participants = []; }
        this.participants = participants;
        this.meId = meId;
    }
    /**
     * Add or update a participant
     * @param value
     */
    InternalParticipants.prototype.addOrUpdateParticipant = function (value) {
        if (value === undefined) {
            return;
        }
        var exists = this.getParticipantIndex(value.id);
        if (exists > -1) {
            this.participants.splice(exists, 1, value);
        }
        else {
            this.participants.push(value);
        }
        // ensure it was added ok
        return this.getParticipant(value.id);
    };
    /**
     * Find the participant's position in the participants list.
     * @param id
     */
    InternalParticipants.prototype.getParticipantIndex = function (id) {
        return this.participants.findIndex(function (p) { return p.id === id; });
    };
    /**
     * Find the participant by id.
     * @param id
     */
    InternalParticipants.prototype.getParticipant = function (id) {
        return this.participants.find(function (p) { return p.id === id; });
    };
    /**
     * Remove a participant from the participants list.
     */
    InternalParticipants.prototype.deleteParticipant = function (id) {
        this.participants = this.participants.filter(function (p) { return p.id !== id; });
    };
    Object.defineProperty(InternalParticipants.prototype, "host", {
        /**
         * Helper to return the conversation host.
         */
        get: function () {
            return this.participants.find(function (p) { return p.isHost === true; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InternalParticipants.prototype, "me", {
        /**
         * Helper to return the current user.
         */
        get: function () {
            return this.getParticipant(this.meId);
        },
        enumerable: false,
        configurable: true
    });
    return InternalParticipants;
}());
exports.InternalParticipants = InternalParticipants;
/**
 * List of command message types
 */
exports.ConversationTranslatorMessageTypes = {
    command: "command",
    final: "final",
    info: "info",
    instantMessage: "instant_message",
    keepAlive: "keep_alive",
    partial: "partial",
    participantCommand: "participant_command",
    translatedMessage: "translated_message"
};
/**
 * List of command types
 */
exports.ConversationTranslatorCommandTypes = {
    changeNickname: "ChangeNickname",
    disconnectSession: "DisconnectSession",
    ejectParticipant: "EjectParticipant",
    instant_message: "instant_message",
    joinSession: "JoinSession",
    leaveSession: "LeaveSession",
    participantList: "ParticipantList",
    roomExpirationWarning: "RoomExpirationWarning",
    setLockState: "SetLockState",
    setMute: "SetMute",
    setMuteAll: "SetMuteAll",
    setProfanityFiltering: "SetProfanityFiltering",
    setTranslateToLanguages: "SetTranslateToLanguages",
    setUseTTS: "SetUseTTS"
};

//# sourceMappingURL=ConversationTranslatorInterfaces.js.map
