// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { createNoDashGuid } from "./Guid";
export var EventType;
(function (EventType) {
    EventType[EventType["Debug"] = 0] = "Debug";
    EventType[EventType["Info"] = 1] = "Info";
    EventType[EventType["Warning"] = 2] = "Warning";
    EventType[EventType["Error"] = 3] = "Error";
    EventType[EventType["None"] = 4] = "None";
})(EventType || (EventType = {}));
export class PlatformEvent {
    constructor(eventName, eventType) {
        this.privName = eventName;
        this.privEventId = createNoDashGuid();
        this.privEventTime = new Date().toISOString();
        this.privEventType = eventType;
        this.privMetadata = {};
    }
    get name() {
        return this.privName;
    }
    get eventId() {
        return this.privEventId;
    }
    get eventTime() {
        return this.privEventTime;
    }
    get eventType() {
        return this.privEventType;
    }
    get metadata() {
        return this.privMetadata;
    }
}

//# sourceMappingURL=PlatformEvent.js.map
