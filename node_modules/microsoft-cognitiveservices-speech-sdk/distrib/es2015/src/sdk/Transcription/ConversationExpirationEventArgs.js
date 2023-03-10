// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
import { SessionEventArgs } from "../Exports";
export class ConversationExpirationEventArgs extends SessionEventArgs {
    constructor(expirationTime, sessionId) {
        super(sessionId);
        this.privExpirationTime = expirationTime;
    }
    /** How much longer until the conversation expires (in minutes). */
    get expirationTime() {
        return this.privExpirationTime;
    }
}

//# sourceMappingURL=ConversationExpirationEventArgs.js.map
