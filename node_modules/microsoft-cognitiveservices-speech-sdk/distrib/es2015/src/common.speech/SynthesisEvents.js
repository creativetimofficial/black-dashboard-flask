// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { EventType, PlatformEvent } from "../common/Exports";
export class SpeechSynthesisEvent extends PlatformEvent {
    constructor(eventName, requestId, eventType = EventType.Info) {
        super(eventName, eventType);
        this.privRequestId = requestId;
    }
    get requestId() {
        return this.privRequestId;
    }
}
export class SynthesisTriggeredEvent extends SpeechSynthesisEvent {
    constructor(requestId, sessionAudioDestinationId, turnAudioDestinationId) {
        super("SynthesisTriggeredEvent", requestId);
        this.privSessionAudioDestinationId = sessionAudioDestinationId;
        this.privTurnAudioDestinationId = turnAudioDestinationId;
    }
    get audioSessionDestinationId() {
        return this.privSessionAudioDestinationId;
    }
    get audioTurnDestinationId() {
        return this.privTurnAudioDestinationId;
    }
}
export class ConnectingToSynthesisServiceEvent extends SpeechSynthesisEvent {
    constructor(requestId, authFetchEventId) {
        super("ConnectingToSynthesisServiceEvent", requestId);
        this.privAuthFetchEventId = authFetchEventId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
}
export class SynthesisStartedEvent extends SpeechSynthesisEvent {
    constructor(requestId, authFetchEventId) {
        super("SynthesisStartedEvent", requestId);
        this.privAuthFetchEventId = authFetchEventId;
    }
    get authFetchEventId() {
        return this.privAuthFetchEventId;
    }
}

//# sourceMappingURL=SynthesisEvents.js.map
