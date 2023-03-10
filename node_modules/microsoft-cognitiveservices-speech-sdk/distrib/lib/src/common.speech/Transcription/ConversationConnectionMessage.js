"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
exports.ConversationConnectionMessage = void 0;
var Exports_1 = require("../../common/Exports");
var ConversationConnectionMessage = /** @class */ (function (_super) {
    __extends(ConversationConnectionMessage, _super);
    function ConversationConnectionMessage(messageType, body, headers, id) {
        var _this = _super.call(this, messageType, body, headers, id) || this;
        var json = JSON.parse(_this.textBody);
        if (json.type !== undefined) {
            _this.privConversationMessageType = json.type;
        }
        return _this;
    }
    Object.defineProperty(ConversationConnectionMessage.prototype, "conversationMessageType", {
        get: function () {
            return this.privConversationMessageType;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationConnectionMessage;
}(Exports_1.ConnectionMessage));
exports.ConversationConnectionMessage = ConversationConnectionMessage;

//# sourceMappingURL=ConversationConnectionMessage.js.map
