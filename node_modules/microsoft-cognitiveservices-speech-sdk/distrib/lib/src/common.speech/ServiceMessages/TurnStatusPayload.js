"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnStatusResponsePayload = void 0;
var TurnStatusResponsePayload = /** @class */ (function () {
    function TurnStatusResponsePayload(json) {
        this.privMessageStatusResponse = JSON.parse(json);
    }
    TurnStatusResponsePayload.fromJSON = function (json) {
        return new TurnStatusResponsePayload(json);
    };
    Object.defineProperty(TurnStatusResponsePayload.prototype, "interactionId", {
        get: function () {
            return this.privMessageStatusResponse.interactionId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TurnStatusResponsePayload.prototype, "conversationId", {
        get: function () {
            return this.privMessageStatusResponse.conversationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TurnStatusResponsePayload.prototype, "statusCode", {
        get: function () {
            // Payloads may contain a limited set of textual representations or a numeric status
            // code. The textual values are here converted into numeric ones.
            switch (this.privMessageStatusResponse.statusCode) {
                case "Success":
                    return 200;
                case "Failed":
                    return 400;
                case "TimedOut":
                    return 429;
                default:
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return this.privMessageStatusResponse.statusCode;
            }
        },
        enumerable: false,
        configurable: true
    });
    return TurnStatusResponsePayload;
}());
exports.TurnStatusResponsePayload = TurnStatusResponsePayload;

//# sourceMappingURL=TurnStatusPayload.js.map
