"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSource = void 0;
var Error_1 = require("./Error");
var Guid_1 = require("./Guid");
var EventSource = /** @class */ (function () {
    function EventSource(metadata) {
        this.privEventListeners = {};
        this.privIsDisposed = false;
        this.privConsoleListener = undefined;
        this.privMetadata = metadata;
    }
    EventSource.prototype.onEvent = function (event) {
        if (this.isDisposed()) {
            throw (new Error_1.ObjectDisposedError("EventSource"));
        }
        if (this.metadata) {
            for (var paramName in this.metadata) {
                if (paramName) {
                    if (event.metadata) {
                        if (!event.metadata[paramName]) {
                            event.metadata[paramName] = this.metadata[paramName];
                        }
                    }
                }
            }
        }
        for (var eventId in this.privEventListeners) {
            if (eventId && this.privEventListeners[eventId]) {
                this.privEventListeners[eventId](event);
            }
        }
    };
    EventSource.prototype.attach = function (onEventCallback) {
        var _this = this;
        var id = Guid_1.createNoDashGuid();
        this.privEventListeners[id] = onEventCallback;
        return {
            detach: function () {
                delete _this.privEventListeners[id];
                return Promise.resolve();
            },
        };
    };
    EventSource.prototype.attachListener = function (listener) {
        return this.attach(function (e) { return listener.onEvent(e); });
    };
    EventSource.prototype.attachConsoleListener = function (listener) {
        if (!!this.privConsoleListener) {
            void this.privConsoleListener.detach(); // Detach implementation for eventListeners is synchronous
        }
        this.privConsoleListener = this.attach(function (e) { return listener.onEvent(e); });
        return this.privConsoleListener;
    };
    EventSource.prototype.isDisposed = function () {
        return this.privIsDisposed;
    };
    EventSource.prototype.dispose = function () {
        this.privEventListeners = null;
        this.privIsDisposed = true;
    };
    Object.defineProperty(EventSource.prototype, "metadata", {
        get: function () {
            return this.privMetadata;
        },
        enumerable: false,
        configurable: true
    });
    return EventSource;
}());
exports.EventSource = EventSource;

//# sourceMappingURL=EventSource.js.map
