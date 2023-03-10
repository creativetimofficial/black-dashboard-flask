// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { EventType, PlatformEvent } from "./PlatformEvent";
export class OCSPEvent extends PlatformEvent {
    constructor(eventName, eventType, signature) {
        super(eventName, eventType);
        this.privSignature = signature;
    }
}
export class OCSPMemoryCacheHitEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPMemoryCacheHitEvent", EventType.Debug, signature);
    }
}
export class OCSPCacheMissEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheMissEvent", EventType.Debug, signature);
    }
}
export class OCSPDiskCacheHitEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPDiskCacheHitEvent", EventType.Debug, signature);
    }
}
export class OCSPCacheUpdateNeededEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheUpdateNeededEvent", EventType.Debug, signature);
    }
}
export class OCSPMemoryCacheStoreEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPMemoryCacheStoreEvent", EventType.Debug, signature);
    }
}
export class OCSPDiskCacheStoreEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPDiskCacheStoreEvent", EventType.Debug, signature);
    }
}
export class OCSPCacheUpdateCompleteEvent extends OCSPEvent {
    constructor(signature) {
        super("OCSPCacheUpdateCompleteEvent", EventType.Debug, signature);
    }
}
export class OCSPStapleReceivedEvent extends OCSPEvent {
    constructor() {
        super("OCSPStapleReceivedEvent", EventType.Debug, "");
    }
}
export class OCSPWSUpgradeStartedEvent extends OCSPEvent {
    constructor(serialNumber) {
        super("OCSPWSUpgradeStartedEvent", EventType.Debug, serialNumber);
    }
}
export class OCSPCacheEntryExpiredEvent extends OCSPEvent {
    constructor(serialNumber, expireTime) {
        super("OCSPCacheEntryExpiredEvent", EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
    }
}
export class OCSPCacheEntryNeedsRefreshEvent extends OCSPEvent {
    constructor(serialNumber, startTime, expireTime) {
        super("OCSPCacheEntryNeedsRefreshEvent", EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
        this.privStartTime = startTime;
    }
}
export class OCSPCacheHitEvent extends OCSPEvent {
    constructor(serialNumber, startTime, expireTime) {
        super("OCSPCacheHitEvent", EventType.Debug, serialNumber);
        this.privExpireTime = expireTime;
        this.privExpireTimeString = new Date(expireTime).toLocaleDateString();
        this.privStartTime = startTime;
        this.privStartTimeString = new Date(startTime).toLocaleTimeString();
    }
}
export class OCSPVerificationFailedEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPVerificationFailedEvent", EventType.Debug, serialNumber);
        this.privError = error;
    }
}
export class OCSPCacheFetchErrorEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPCacheFetchErrorEvent", EventType.Debug, serialNumber);
        this.privError = error;
    }
}
export class OCSPResponseRetrievedEvent extends OCSPEvent {
    constructor(serialNumber) {
        super("OCSPResponseRetrievedEvent", EventType.Debug, serialNumber);
    }
}
export class OCSPCacheUpdateErrorEvent extends OCSPEvent {
    constructor(serialNumber, error) {
        super("OCSPCacheUpdateErrorEvent", EventType.Debug, serialNumber);
        this.privError = error;
    }
}

//# sourceMappingURL=OCSPEvents.js.map
