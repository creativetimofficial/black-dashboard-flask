/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { MessageType } from "./ConnectionMessage";
import { ArgumentNullError, InvalidOperationError } from "./Error";
import { createNoDashGuid } from "./Guid";
export class RawWebsocketMessage {
    constructor(messageType, payload, id) {
        this.privPayload = null;
        if (!payload) {
            throw new ArgumentNullError("payload");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (messageType === MessageType.Binary && payload.__proto__.constructor.name !== "ArrayBuffer") {
            throw new InvalidOperationError("Payload must be ArrayBuffer");
        }
        if (messageType === MessageType.Text && !(typeof (payload) === "string")) {
            throw new InvalidOperationError("Payload must be a string");
        }
        this.privMessageType = messageType;
        this.privPayload = payload;
        this.privId = id ? id : createNoDashGuid();
    }
    get messageType() {
        return this.privMessageType;
    }
    get payload() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.privPayload;
    }
    get textContent() {
        if (this.privMessageType === MessageType.Binary) {
            throw new InvalidOperationError("Not supported for binary message");
        }
        return this.privPayload;
    }
    get binaryContent() {
        if (this.privMessageType === MessageType.Text) {
            throw new InvalidOperationError("Not supported for text message");
        }
        return this.privPayload;
    }
    get id() {
        return this.privId;
    }
}

//# sourceMappingURL=RawWebsocketMessage.js.map
