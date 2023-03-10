// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ObjectDisposedError } from "./Error";
import { createNoDashGuid } from "./Guid";
export class EventSource {
    constructor(metadata) {
        this.privEventListeners = {};
        this.privIsDisposed = false;
        this.privConsoleListener = undefined;
        this.privMetadata = metadata;
    }
    onEvent(event) {
        if (this.isDisposed()) {
            throw (new ObjectDisposedError("EventSource"));
        }
        if (this.metadata) {
            for (const paramName in this.metadata) {
                if (paramName) {
                    if (event.metadata) {
                        if (!event.metadata[paramName]) {
                            event.metadata[paramName] = this.metadata[paramName];
                        }
                    }
                }
            }
        }
        for (const eventId in this.privEventListeners) {
            if (eventId && this.privEventListeners[eventId]) {
                this.privEventListeners[eventId](event);
            }
        }
    }
    attach(onEventCallback) {
        const id = createNoDashGuid();
        this.privEventListeners[id] = onEventCallback;
        return {
            detach: () => {
                delete this.privEventListeners[id];
                return Promise.resolve();
            },
        };
    }
    attachListener(listener) {
        return this.attach((e) => listener.onEvent(e));
    }
    attachConsoleListener(listener) {
        if (!!this.privConsoleListener) {
            void this.privConsoleListener.detach(); // Detach implementation for eventListeners is synchronous
        }
        this.privConsoleListener = this.attach((e) => listener.onEvent(e));
        return this.privConsoleListener;
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    dispose() {
        this.privEventListeners = null;
        this.privIsDisposed = true;
    }
    get metadata() {
        return this.privMetadata;
    }
}

//# sourceMappingURL=EventSource.js.map
