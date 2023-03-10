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
exports.OCSPCacheUpdateErrorEvent = exports.OCSPResponseRetrievedEvent = exports.OCSPCacheFetchErrorEvent = exports.OCSPVerificationFailedEvent = exports.OCSPCacheHitEvent = exports.OCSPCacheEntryNeedsRefreshEvent = exports.OCSPCacheEntryExpiredEvent = exports.OCSPWSUpgradeStartedEvent = exports.OCSPStapleReceivedEvent = exports.OCSPCacheUpdateCompleteEvent = exports.OCSPDiskCacheStoreEvent = exports.OCSPMemoryCacheStoreEvent = exports.OCSPCacheUpdateNeededEvent = exports.OCSPDiskCacheHitEvent = exports.OCSPCacheMissEvent = exports.OCSPMemoryCacheHitEvent = exports.OCSPEvent = void 0;
/* eslint-disable max-classes-per-file */
var PlatformEvent_1 = require("./PlatformEvent");
var OCSPEvent = /** @class */ (function (_super) {
    __extends(OCSPEvent, _super);
    function OCSPEvent(eventName, eventType, signature) {
        var _this = _super.call(this, eventName, eventType) || this;
        _this.privSignature = signature;
        return _this;
    }
    return OCSPEvent;
}(PlatformEvent_1.PlatformEvent));
exports.OCSPEvent = OCSPEvent;
var OCSPMemoryCacheHitEvent = /** @class */ (function (_super) {
    __extends(OCSPMemoryCacheHitEvent, _super);
    function OCSPMemoryCacheHitEvent(signature) {
        return _super.call(this, "OCSPMemoryCacheHitEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPMemoryCacheHitEvent;
}(OCSPEvent));
exports.OCSPMemoryCacheHitEvent = OCSPMemoryCacheHitEvent;
var OCSPCacheMissEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheMissEvent, _super);
    function OCSPCacheMissEvent(signature) {
        return _super.call(this, "OCSPCacheMissEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPCacheMissEvent;
}(OCSPEvent));
exports.OCSPCacheMissEvent = OCSPCacheMissEvent;
var OCSPDiskCacheHitEvent = /** @class */ (function (_super) {
    __extends(OCSPDiskCacheHitEvent, _super);
    function OCSPDiskCacheHitEvent(signature) {
        return _super.call(this, "OCSPDiskCacheHitEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPDiskCacheHitEvent;
}(OCSPEvent));
exports.OCSPDiskCacheHitEvent = OCSPDiskCacheHitEvent;
var OCSPCacheUpdateNeededEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheUpdateNeededEvent, _super);
    function OCSPCacheUpdateNeededEvent(signature) {
        return _super.call(this, "OCSPCacheUpdateNeededEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPCacheUpdateNeededEvent;
}(OCSPEvent));
exports.OCSPCacheUpdateNeededEvent = OCSPCacheUpdateNeededEvent;
var OCSPMemoryCacheStoreEvent = /** @class */ (function (_super) {
    __extends(OCSPMemoryCacheStoreEvent, _super);
    function OCSPMemoryCacheStoreEvent(signature) {
        return _super.call(this, "OCSPMemoryCacheStoreEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPMemoryCacheStoreEvent;
}(OCSPEvent));
exports.OCSPMemoryCacheStoreEvent = OCSPMemoryCacheStoreEvent;
var OCSPDiskCacheStoreEvent = /** @class */ (function (_super) {
    __extends(OCSPDiskCacheStoreEvent, _super);
    function OCSPDiskCacheStoreEvent(signature) {
        return _super.call(this, "OCSPDiskCacheStoreEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPDiskCacheStoreEvent;
}(OCSPEvent));
exports.OCSPDiskCacheStoreEvent = OCSPDiskCacheStoreEvent;
var OCSPCacheUpdateCompleteEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheUpdateCompleteEvent, _super);
    function OCSPCacheUpdateCompleteEvent(signature) {
        return _super.call(this, "OCSPCacheUpdateCompleteEvent", PlatformEvent_1.EventType.Debug, signature) || this;
    }
    return OCSPCacheUpdateCompleteEvent;
}(OCSPEvent));
exports.OCSPCacheUpdateCompleteEvent = OCSPCacheUpdateCompleteEvent;
var OCSPStapleReceivedEvent = /** @class */ (function (_super) {
    __extends(OCSPStapleReceivedEvent, _super);
    function OCSPStapleReceivedEvent() {
        return _super.call(this, "OCSPStapleReceivedEvent", PlatformEvent_1.EventType.Debug, "") || this;
    }
    return OCSPStapleReceivedEvent;
}(OCSPEvent));
exports.OCSPStapleReceivedEvent = OCSPStapleReceivedEvent;
var OCSPWSUpgradeStartedEvent = /** @class */ (function (_super) {
    __extends(OCSPWSUpgradeStartedEvent, _super);
    function OCSPWSUpgradeStartedEvent(serialNumber) {
        return _super.call(this, "OCSPWSUpgradeStartedEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
    }
    return OCSPWSUpgradeStartedEvent;
}(OCSPEvent));
exports.OCSPWSUpgradeStartedEvent = OCSPWSUpgradeStartedEvent;
var OCSPCacheEntryExpiredEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheEntryExpiredEvent, _super);
    function OCSPCacheEntryExpiredEvent(serialNumber, expireTime) {
        var _this = _super.call(this, "OCSPCacheEntryExpiredEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privExpireTime = expireTime;
        return _this;
    }
    return OCSPCacheEntryExpiredEvent;
}(OCSPEvent));
exports.OCSPCacheEntryExpiredEvent = OCSPCacheEntryExpiredEvent;
var OCSPCacheEntryNeedsRefreshEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheEntryNeedsRefreshEvent, _super);
    function OCSPCacheEntryNeedsRefreshEvent(serialNumber, startTime, expireTime) {
        var _this = _super.call(this, "OCSPCacheEntryNeedsRefreshEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privExpireTime = expireTime;
        _this.privStartTime = startTime;
        return _this;
    }
    return OCSPCacheEntryNeedsRefreshEvent;
}(OCSPEvent));
exports.OCSPCacheEntryNeedsRefreshEvent = OCSPCacheEntryNeedsRefreshEvent;
var OCSPCacheHitEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheHitEvent, _super);
    function OCSPCacheHitEvent(serialNumber, startTime, expireTime) {
        var _this = _super.call(this, "OCSPCacheHitEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privExpireTime = expireTime;
        _this.privExpireTimeString = new Date(expireTime).toLocaleDateString();
        _this.privStartTime = startTime;
        _this.privStartTimeString = new Date(startTime).toLocaleTimeString();
        return _this;
    }
    return OCSPCacheHitEvent;
}(OCSPEvent));
exports.OCSPCacheHitEvent = OCSPCacheHitEvent;
var OCSPVerificationFailedEvent = /** @class */ (function (_super) {
    __extends(OCSPVerificationFailedEvent, _super);
    function OCSPVerificationFailedEvent(serialNumber, error) {
        var _this = _super.call(this, "OCSPVerificationFailedEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privError = error;
        return _this;
    }
    return OCSPVerificationFailedEvent;
}(OCSPEvent));
exports.OCSPVerificationFailedEvent = OCSPVerificationFailedEvent;
var OCSPCacheFetchErrorEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheFetchErrorEvent, _super);
    function OCSPCacheFetchErrorEvent(serialNumber, error) {
        var _this = _super.call(this, "OCSPCacheFetchErrorEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privError = error;
        return _this;
    }
    return OCSPCacheFetchErrorEvent;
}(OCSPEvent));
exports.OCSPCacheFetchErrorEvent = OCSPCacheFetchErrorEvent;
var OCSPResponseRetrievedEvent = /** @class */ (function (_super) {
    __extends(OCSPResponseRetrievedEvent, _super);
    function OCSPResponseRetrievedEvent(serialNumber) {
        return _super.call(this, "OCSPResponseRetrievedEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
    }
    return OCSPResponseRetrievedEvent;
}(OCSPEvent));
exports.OCSPResponseRetrievedEvent = OCSPResponseRetrievedEvent;
var OCSPCacheUpdateErrorEvent = /** @class */ (function (_super) {
    __extends(OCSPCacheUpdateErrorEvent, _super);
    function OCSPCacheUpdateErrorEvent(serialNumber, error) {
        var _this = _super.call(this, "OCSPCacheUpdateErrorEvent", PlatformEvent_1.EventType.Debug, serialNumber) || this;
        _this.privError = error;
        return _this;
    }
    return OCSPCacheUpdateErrorEvent;
}(OCSPEvent));
exports.OCSPCacheUpdateErrorEvent = OCSPCacheUpdateErrorEvent;

//# sourceMappingURL=OCSPEvents.js.map
