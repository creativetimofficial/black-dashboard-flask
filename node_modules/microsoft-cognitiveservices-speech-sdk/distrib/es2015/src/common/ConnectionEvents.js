// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { EventType, PlatformEvent } from "./PlatformEvent";
export class ServiceEvent extends PlatformEvent {
    constructor(eventName, jsonstring, eventType = EventType.Info) {
        super(eventName, eventType);
        this.privJsonResult = jsonstring;
    }
    get jsonString() {
        return this.privJsonResult;
    }
}
export class ConnectionEvent extends PlatformEvent {
    constructor(eventName, connectionId, eventType = EventType.Info) {
        super(eventName, eventType);
        this.privConnectionId = connectionId;
    }
    get connectionId() {
        return this.privConnectionId;
    }
}
export class ConnectionStartEvent extends ConnectionEvent {
    constructor(connectionId, uri, headers) {
        super("ConnectionStartEvent", connectionId);
        this.privUri = uri;
        this.privHeaders = headers;
    }
    get uri() {
        return this.privUri;
    }
    get headers() {
        return this.privHeaders;
    }
}
export class ConnectionEstablishedEvent extends ConnectionEvent {
    constructor(connectionId) {
        super("ConnectionEstablishedEvent", connectionId);
    }
}
export class ConnectionClosedEvent extends ConnectionEvent {
    constructor(connectionId, statusCode, reason) {
        super("ConnectionClosedEvent", connectionId, EventType.Debug);
        this.privReason = reason;
        this.privStatusCode = statusCode;
    }
    get reason() {
        return this.privReason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
}
export class ConnectionErrorEvent extends ConnectionEvent {
    constructor(connectionId, message, type) {
        super("ConnectionErrorEvent", connectionId, EventType.Debug);
        this.privMessage = message;
        this.privType = type;
    }
    get message() {
        return this.privMessage;
    }
    get type() {
        return this.privType;
    }
}
export class ConnectionEstablishErrorEvent extends ConnectionEvent {
    constructor(connectionId, statuscode, reason) {
        super("ConnectionEstablishErrorEvent", connectionId, EventType.Error);
        this.privStatusCode = statuscode;
        this.privReason = reason;
    }
    get reason() {
        return this.privReason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
}
export class ConnectionMessageReceivedEvent extends ConnectionEvent {
    constructor(connectionId, networkReceivedTimeISO, message) {
        super("ConnectionMessageReceivedEvent", connectionId);
        this.privNetworkReceivedTime = networkReceivedTimeISO;
        this.privMessage = message;
    }
    get networkReceivedTime() {
        return this.privNetworkReceivedTime;
    }
    get message() {
        return this.privMessage;
    }
}
export class ConnectionMessageSentEvent extends ConnectionEvent {
    constructor(connectionId, networkSentTimeISO, message) {
        super("ConnectionMessageSentEvent", connectionId);
        this.privNetworkSentTime = networkSentTimeISO;
        this.privMessage = message;
    }
    get networkSentTime() {
        return this.privNetworkSentTime;
    }
    get message() {
        return this.privMessage;
    }
}

//# sourceMappingURL=ConnectionEvents.js.map
