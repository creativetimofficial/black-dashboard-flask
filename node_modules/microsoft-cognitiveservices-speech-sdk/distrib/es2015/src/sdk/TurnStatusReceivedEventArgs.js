// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { TurnStatusResponsePayload } from "../common.speech/ServiceMessages/TurnStatusPayload";
/**
 * Defines contents of received message/events.
 * @class TurnStatusReceivedEventArgs
 */
export class TurnStatusReceivedEventArgs {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} turnStatus - The JSON-encoded turn status message.
     */
    constructor(turnStatus) {
        this.privTurnStatus = TurnStatusResponsePayload.fromJSON(turnStatus);
    }
    /**
     * Gets the interaction identifier associated with this turn status event.
     * @member TurnStatusReceivedEventArgs.prototype.interactionId
     * @function
     * @public
     * @returns {any} the received interaction id.
     */
    get interactionId() {
        return this.privTurnStatus.interactionId;
    }
    /**
     * Gets the conversation identifier associated with this turn status event.
     * @member TurnStatusReceivedEventArgs.prototype.conversationId
     * @function
     * @public
     * @returns {any} the received conversation id.
     */
    get conversationId() {
        return this.privTurnStatus.conversationId;
    }
    /**
     * Gets the received turn status code.
     * @member TurnStatusReceivedEventArgs.prototype.statusCode
     * @function
     * @public
     * @returns {number} the received turn status.
     */
    get statusCode() {
        return this.privTurnStatus.statusCode; // eslint-disable-line @typescript-eslint/no-unsafe-return
    }
}

//# sourceMappingURL=TurnStatusReceivedEventArgs.js.map
