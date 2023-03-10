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
exports.SendingAgentContextMessageEvent = exports.DialogEvent = void 0;
var PlatformEvent_1 = require("./PlatformEvent");
var DialogEvent = /** @class */ (function (_super) {
    __extends(DialogEvent, _super);
    function DialogEvent(eventName, eventType) {
        if (eventType === void 0) { eventType = PlatformEvent_1.EventType.Info; }
        return _super.call(this, eventName, eventType) || this;
    }
    return DialogEvent;
}(PlatformEvent_1.PlatformEvent));
exports.DialogEvent = DialogEvent;
var SendingAgentContextMessageEvent = /** @class */ (function (_super) {
    __extends(SendingAgentContextMessageEvent, _super);
    function SendingAgentContextMessageEvent(agentConfig) {
        var _this = _super.call(this, "SendingAgentContextMessageEvent") || this;
        _this.privAgentConfig = agentConfig;
        return _this;
    }
    Object.defineProperty(SendingAgentContextMessageEvent.prototype, "agentConfig", {
        get: function () {
            return this.privAgentConfig;
        },
        enumerable: false,
        configurable: true
    });
    return SendingAgentContextMessageEvent;
}(DialogEvent));
exports.SendingAgentContextMessageEvent = SendingAgentContextMessageEvent;

//# sourceMappingURL=DialogEvents.js.map
