// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SessionEventArgs } from "./Exports";
/**
 * Defines payload for session events like Speech Start/End Detected
 * @class
 */
export class RecognitionEventArgs extends SessionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {number} offset - The offset.
     * @param {string} sessionId - The session id.
     */
    constructor(offset, sessionId) {
        super(sessionId);
        this.privOffset = offset;
    }
    /**
     * Represents the message offset
     * @member RecognitionEventArgs.prototype.offset
     * @function
     * @public
     */
    get offset() {
        return this.privOffset;
    }
}

//# sourceMappingURL=RecognitionEventArgs.js.map
