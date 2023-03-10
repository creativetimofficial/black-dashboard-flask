// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ArgumentNullError } from "./Error";
import { EventSource } from "./EventSource";
export class Events {
    static setEventSource(eventSource) {
        if (!eventSource) {
            throw new ArgumentNullError("eventSource");
        }
        Events.privInstance = eventSource;
    }
    static get instance() {
        return Events.privInstance;
    }
}
Events.privInstance = new EventSource();

//# sourceMappingURL=Events.js.map
