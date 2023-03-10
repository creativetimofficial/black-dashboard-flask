"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var Error_1 = require("./Error");
var EventSource_1 = require("./EventSource");
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.setEventSource = function (eventSource) {
        if (!eventSource) {
            throw new Error_1.ArgumentNullError("eventSource");
        }
        Events.privInstance = eventSource;
    };
    Object.defineProperty(Events, "instance", {
        get: function () {
            return Events.privInstance;
        },
        enumerable: false,
        configurable: true
    });
    Events.privInstance = new EventSource_1.EventSource();
    return Events;
}());
exports.Events = Events;

//# sourceMappingURL=Events.js.map
