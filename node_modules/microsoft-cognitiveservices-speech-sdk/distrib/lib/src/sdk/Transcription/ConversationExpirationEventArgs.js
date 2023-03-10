"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationExpirationEventArgs = void 0;
var Exports_1 = require("../Exports");
var ConversationExpirationEventArgs = /** @class */ (function (_super) {
    __extends(ConversationExpirationEventArgs, _super);
    function ConversationExpirationEventArgs(expirationTime, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privExpirationTime = expirationTime;
        return _this;
    }
    Object.defineProperty(ConversationExpirationEventArgs.prototype, "expirationTime", {
        /** How much longer until the conversation expires (in minutes). */
        get: function () {
            return this.privExpirationTime;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationExpirationEventArgs;
}(Exports_1.SessionEventArgs));
exports.ConversationExpirationEventArgs = ConversationExpirationEventArgs;

//# sourceMappingURL=ConversationExpirationEventArgs.js.map
