// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
import { SessionEventArgs } from "../Exports";
export class ConversationParticipantsChangedEventArgs extends SessionEventArgs {
    constructor(reason, participants, sessionId) {
        super(sessionId);
        this.privReason = reason;
        this.privParticipant = participants;
    }
    get reason() {
        return this.privReason;
    }
    get participants() {
        return this.privParticipant;
    }
}

//# sourceMappingURL=ConversationParticipantsChangedEventArgs.js.map
