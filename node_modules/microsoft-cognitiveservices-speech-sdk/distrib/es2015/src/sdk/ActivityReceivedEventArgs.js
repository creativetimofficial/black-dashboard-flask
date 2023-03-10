// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines contents of received message/events.
 * @class ActivityReceivedEventArgs
 */
export class ActivityReceivedEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {any} activity - The activity..
     */
    constructor(activity, audioStream) {
        this.privActivity = activity;
        this.privAudioStream = audioStream;
    }
    /**
     * Gets the received activity
     * @member ActivityReceivedEventArgs.prototype.activity
     * @function
     * @public
     * @returns {any} the received activity.
     */
    get activity() {
        return this.privActivity;
    }
    get audioStream() {
        return this.privAudioStream;
    }
}

//# sourceMappingURL=ActivityReceivedEventArgs.js.map
