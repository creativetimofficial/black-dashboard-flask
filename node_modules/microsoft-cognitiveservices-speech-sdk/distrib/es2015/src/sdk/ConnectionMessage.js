//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
// eslint-disable-next-line max-classes-per-file
import { HeaderNames } from "../common.speech/HeaderNames";
import { MessageType } from "../common/Exports";
import { PropertyCollection } from "./PropertyCollection";
import { PropertyId } from "./PropertyId";
/**
 * ConnectionMessage represents implementation specific messages sent to and received from
 * the speech service. These messages are provided for debugging purposes and should not
 * be used for production use cases with the Azure Cognitive Services Speech Service.
 * Messages sent to and received from the Speech Service are subject to change without
 * notice. This includes message contents, headers, payloads, ordering, etc.
 * Added in version 1.11.0.
 */
export class ConnectionMessage {
}
export class ConnectionMessageImpl {
    constructor(message) {
        this.privConnectionMessage = message;
        this.privProperties = new PropertyCollection();
        if (!!this.privConnectionMessage.headers[HeaderNames.ConnectionId]) {
            this.privProperties.setProperty(PropertyId.Speech_SessionId, this.privConnectionMessage.headers[HeaderNames.ConnectionId]);
        }
        Object.keys(this.privConnectionMessage.headers).forEach((header) => {
            this.privProperties.setProperty(header, this.privConnectionMessage.headers[header]);
        });
    }
    /**
     * The message path.
     */
    get path() {
        return this.privConnectionMessage.headers[Object.keys(this.privConnectionMessage.headers).find((key) => key.toLowerCase() === "path".toLowerCase())];
    }
    /**
     * Checks to see if the ConnectionMessage is a text message.
     * See also IsBinaryMessage().
     */
    get isTextMessage() {
        return this.privConnectionMessage.messageType === MessageType.Text;
    }
    /**
     * Checks to see if the ConnectionMessage is a binary message.
     * See also GetBinaryMessage().
     */
    get isBinaryMessage() {
        return this.privConnectionMessage.messageType === MessageType.Binary;
    }
    /**
     * Gets the text message payload. Typically the text message content-type is
     * application/json. To determine other content-types use
     * Properties.GetProperty("Content-Type").
     */
    get TextMessage() {
        return this.privConnectionMessage.textBody;
    }
    /**
     * Gets the binary message payload.
     */
    get binaryMessage() {
        return this.privConnectionMessage.binaryBody;
    }
    /**
     * A collection of properties and their values defined for this <see cref="ConnectionMessage"/>.
     * Message headers can be accessed via this collection (e.g. "Content-Type").
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Returns a string that represents the connection message.
     */
    toString() {
        return "";
    }
}

//# sourceMappingURL=ConnectionMessage.js.map
