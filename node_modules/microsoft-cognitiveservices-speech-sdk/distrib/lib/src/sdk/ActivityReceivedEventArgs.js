"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityReceivedEventArgs = void 0;
/**
 * Defines contents of received message/events.
 * @class ActivityReceivedEventArgs
 */
var ActivityReceivedEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {any} activity - The activity..
     */
    function ActivityReceivedEventArgs(activity, audioStream) {
        this.privActivity = activity;
        this.privAudioStream = audioStream;
    }
    Object.defineProperty(ActivityReceivedEventArgs.prototype, "activity", {
        /**
         * Gets the received activity
         * @member ActivityReceivedEventArgs.prototype.activity
         * @function
         * @public
         * @returns {any} the received activity.
         */
        get: function () {
            return this.privActivity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActivityReceivedEventArgs.prototype, "audioStream", {
        get: function () {
            return this.privAudioStream;
        },
        enumerable: false,
        configurable: true
    });
    return ActivityReceivedEventArgs;
}());
exports.ActivityReceivedEventArgs = ActivityReceivedEventArgs;

//# sourceMappingURL=ActivityReceivedEventArgs.js.map
