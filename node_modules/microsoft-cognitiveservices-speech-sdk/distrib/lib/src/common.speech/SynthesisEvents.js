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
exports.SynthesisStartedEvent = exports.ConnectingToSynthesisServiceEvent = exports.SynthesisTriggeredEvent = exports.SpeechSynthesisEvent = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common/Exports");
var SpeechSynthesisEvent = /** @class */ (function (_super) {
    __extends(SpeechSynthesisEvent, _super);
    function SpeechSynthesisEvent(eventName, requestId, eventType) {
        if (eventType === void 0) { eventType = Exports_1.EventType.Info; }
        var _this = _super.call(this, eventName, eventType) || this;
        _this.privRequestId = requestId;
        return _this;
    }
    Object.defineProperty(SpeechSynthesisEvent.prototype, "requestId", {
        get: function () {
            return this.privRequestId;
        },
        enumerable: false,
        configurable: true
    });
    return SpeechSynthesisEvent;
}(Exports_1.PlatformEvent));
exports.SpeechSynthesisEvent = SpeechSynthesisEvent;
var SynthesisTriggeredEvent = /** @class */ (function (_super) {
    __extends(SynthesisTriggeredEvent, _super);
    function SynthesisTriggeredEvent(requestId, sessionAudioDestinationId, turnAudioDestinationId) {
        var _this = _super.call(this, "SynthesisTriggeredEvent", requestId) || this;
        _this.privSessionAudioDestinationId = sessionAudioDestinationId;
        _this.privTurnAudioDestinationId = turnAudioDestinationId;
        return _this;
    }
    Object.defineProperty(SynthesisTriggeredEvent.prototype, "audioSessionDestinationId", {
        get: function () {
            return this.privSessionAudioDestinationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTriggeredEvent.prototype, "audioTurnDestinationId", {
        get: function () {
            return this.privTurnAudioDestinationId;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesisTriggeredEvent;
}(SpeechSynthesisEvent));
exports.SynthesisTriggeredEvent = SynthesisTriggeredEvent;
var ConnectingToSynthesisServiceEvent = /** @class */ (function (_super) {
    __extends(ConnectingToSynthesisServiceEvent, _super);
    function ConnectingToSynthesisServiceEvent(requestId, authFetchEventId) {
        var _this = _super.call(this, "ConnectingToSynthesisServiceEvent", requestId) || this;
        _this.privAuthFetchEventId = authFetchEventId;
        return _this;
    }
    Object.defineProperty(ConnectingToSynthesisServiceEvent.prototype, "authFetchEventId", {
        get: function () {
            return this.privAuthFetchEventId;
        },
        enumerable: false,
        configurable: true
    });
    return ConnectingToSynthesisServiceEvent;
}(SpeechSynthesisEvent));
exports.ConnectingToSynthesisServiceEvent = ConnectingToSynthesisServiceEvent;
var SynthesisStartedEvent = /** @class */ (function (_super) {
    __extends(SynthesisStartedEvent, _super);
    function SynthesisStartedEvent(requestId, authFetchEventId) {
        var _this = _super.call(this, "SynthesisStartedEvent", requestId) || this;
        _this.privAuthFetchEventId = authFetchEventId;
        return _this;
    }
    Object.defineProperty(SynthesisStartedEvent.prototype, "authFetchEventId", {
        get: function () {
            return this.privAuthFetchEventId;
        },
        enumerable: false,
        configurable: true
    });
    return SynthesisStartedEvent;
}(SpeechSynthesisEvent));
exports.SynthesisStartedEvent = SynthesisStartedEvent;

//# sourceMappingURL=SynthesisEvents.js.map
