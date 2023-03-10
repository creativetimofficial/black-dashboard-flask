"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnStatusReceivedEventArgs = void 0;
var TurnStatusPayload_1 = require("../common.speech/ServiceMessages/TurnStatusPayload");
/**
 * Defines contents of received message/events.
 * @class TurnStatusReceivedEventArgs
 */
var TurnStatusReceivedEventArgs = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} turnStatus - The JSON-encoded turn status message.
     */
    function TurnStatusReceivedEventArgs(turnStatus) {
        this.privTurnStatus = TurnStatusPayload_1.TurnStatusResponsePayload.fromJSON(turnStatus);
    }
    Object.defineProperty(TurnStatusReceivedEventArgs.prototype, "interactionId", {
        /**
         * Gets the interaction identifier associated with this turn status event.
         * @member TurnStatusReceivedEventArgs.prototype.interactionId
         * @function
         * @public
         * @returns {any} the received interaction id.
         */
        get: function () {
            return this.privTurnStatus.interactionId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TurnStatusReceivedEventArgs.prototype, "conversationId", {
        /**
         * Gets the conversation identifier associated with this turn status event.
         * @member TurnStatusReceivedEventArgs.prototype.conversationId
         * @function
         * @public
         * @returns {any} the received conversation id.
         */
        get: function () {
            return this.privTurnStatus.conversationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TurnStatusReceivedEventArgs.prototype, "statusCode", {
        /**
         * Gets the received turn status code.
         * @member TurnStatusReceivedEventArgs.prototype.statusCode
         * @function
         * @public
         * @returns {number} the received turn status.
         */
        get: function () {
            return this.privTurnStatus.statusCode; // eslint-disable-line @typescript-eslint/no-unsafe-return
        },
        enumerable: false,
        configurable: true
    });
    return TurnStatusReceivedEventArgs;
}());
exports.TurnStatusReceivedEventArgs = TurnStatusReceivedEventArgs;

//# sourceMappingURL=TurnStatusReceivedEventArgs.js.map
