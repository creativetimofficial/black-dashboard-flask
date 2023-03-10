"use strict";
//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMessageEventArgs = void 0;
var ConnectionMessageEventArgs = /** @class */ (function () {
    function ConnectionMessageEventArgs(message) {
        this.privConnectionMessage = message;
    }
    Object.defineProperty(ConnectionMessageEventArgs.prototype, "message", {
        /**
         * Gets the <see cref="ConnectionMessage"/> associated with this <see cref="ConnectionMessageEventArgs"/>.
         */
        get: function () {
            return this.privConnectionMessage;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a string that represents the connection message event.
     */
    ConnectionMessageEventArgs.prototype.toString = function () {
        return "Message: " + this.privConnectionMessage.toString();
    };
    return ConnectionMessageEventArgs;
}());
exports.ConnectionMessageEventArgs = ConnectionMessageEventArgs;

//# sourceMappingURL=ConnectionMessageEventArgs.js.map
