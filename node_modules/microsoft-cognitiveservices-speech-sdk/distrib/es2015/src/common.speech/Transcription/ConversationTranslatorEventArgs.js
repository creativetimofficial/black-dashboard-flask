// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { SessionEventArgs } from "../../sdk/Exports";
export class MuteAllEventArgs extends SessionEventArgs {
    constructor(isMuted, sessionId) {
        super(sessionId);
        this.privIsMuted = isMuted;
    }
    get isMuted() {
        return this.privIsMuted;
    }
}
export class LockRoomEventArgs extends SessionEventArgs {
    constructor(isLocked, sessionId) {
        super(sessionId);
        this.privIsLocked = isLocked;
    }
    get isMuted() {
        return this.privIsLocked;
    }
}
export class ParticipantEventArgs extends SessionEventArgs {
    constructor(participant, sessionId) {
        super(sessionId);
        this.privParticipant = participant;
    }
    get participant() {
        return this.privParticipant;
    }
}
export class ParticipantAttributeEventArgs extends SessionEventArgs {
    constructor(participantId, key, value, sessionId) {
        super(sessionId);
        this.privKey = key;
        this.privValue = value;
        this.privParticipantId = participantId;
    }
    get value() {
        return this.privValue;
    }
    get key() {
        return this.privKey;
    }
    get id() {
        return this.privParticipantId;
    }
}
export class ParticipantsListEventArgs extends SessionEventArgs {
    constructor(conversationId, token, translateTo, profanityFilter, roomProfanityFilter, isRoomLocked, isMuteAll, participants, sessionId) {
        super(sessionId);
        this.privRoomId = conversationId;
        this.privSessionToken = token;
        this.privTranslateTo = translateTo;
        this.privProfanityFilter = profanityFilter;
        this.privRoomProfanityFilter = roomProfanityFilter;
        this.privIsRoomLocked = isRoomLocked;
        this.privIsRoomLocked = isMuteAll;
        this.privParticipants = participants;
    }
    get sessionToken() {
        return this.privSessionToken;
    }
    get conversationId() {
        return this.privRoomId;
    }
    get translateTo() {
        return this.privTranslateTo;
    }
    get profanityFilter() {
        return this.privProfanityFilter;
    }
    get roomProfanityFilter() {
        return this.privRoomProfanityFilter;
    }
    get isRoomLocked() {
        return this.privIsRoomLocked;
    }
    get isMuteAll() {
        return this.privIsMuteAll;
    }
    get participants() {
        return this.privParticipants;
    }
}
export class ConversationReceivedTranslationEventArgs {
    constructor(command, payload, sessionId) {
        this.privPayload = payload;
        this.privCommand = command;
        this.privSessionId = sessionId;
    }
    get payload() {
        return this.privPayload;
    }
    get command() {
        return this.privCommand;
    }
    get sessionId() {
        return this.privSessionId;
    }
}

//# sourceMappingURL=ConversationTranslatorEventArgs.js.map
