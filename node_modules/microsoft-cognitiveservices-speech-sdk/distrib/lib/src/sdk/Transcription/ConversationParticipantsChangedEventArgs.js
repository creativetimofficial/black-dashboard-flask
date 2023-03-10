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
exports.ConversationParticipantsChangedEventArgs = void 0;
var Exports_1 = require("../Exports");
var ConversationParticipantsChangedEventArgs = /** @class */ (function (_super) {
    __extends(ConversationParticipantsChangedEventArgs, _super);
    function ConversationParticipantsChangedEventArgs(reason, participants, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privReason = reason;
        _this.privParticipant = participants;
        return _this;
    }
    Object.defineProperty(ConversationParticipantsChangedEventArgs.prototype, "reason", {
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationParticipantsChangedEventArgs.prototype, "participants", {
        get: function () {
            return this.privParticipant;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationParticipantsChangedEventArgs;
}(Exports_1.SessionEventArgs));
exports.ConversationParticipantsChangedEventArgs = ConversationParticipantsChangedEventArgs;

//# sourceMappingURL=ConversationParticipantsChangedEventArgs.js.map
