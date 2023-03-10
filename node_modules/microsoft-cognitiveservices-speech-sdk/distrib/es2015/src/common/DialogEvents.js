// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { EventType, PlatformEvent } from "./PlatformEvent";
export class DialogEvent extends PlatformEvent {
    constructor(eventName, eventType = EventType.Info) {
        super(eventName, eventType);
    }
}
export class SendingAgentContextMessageEvent extends DialogEvent {
    constructor(agentConfig) {
        super("SendingAgentContextMessageEvent");
        this.privAgentConfig = agentConfig;
    }
    get agentConfig() {
        return this.privAgentConfig;
    }
}

//# sourceMappingURL=DialogEvents.js.map
