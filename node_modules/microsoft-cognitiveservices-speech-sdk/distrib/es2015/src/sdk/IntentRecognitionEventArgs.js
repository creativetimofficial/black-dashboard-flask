// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { RecognitionEventArgs } from "./Exports";
/**
 * Intent recognition result event arguments.
 * @class
 */
export class IntentRecognitionEventArgs extends RecognitionEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param result - The result of the intent recognition.
     * @param offset - The offset.
     * @param sessionId - The session id.
     */
    constructor(result, offset, sessionId) {
        super(offset, sessionId);
        this.privResult = result;
    }
    /**
     * Represents the intent recognition result.
     * @member IntentRecognitionEventArgs.prototype.result
     * @function
     * @public
     * @returns {IntentRecognitionResult} Represents the intent recognition result.
     */
    get result() {
        return this.privResult;
    }
}

//# sourceMappingURL=IntentRecognitionEventArgs.js.map
