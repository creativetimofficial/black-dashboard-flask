"use strict";
//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMessageImpl = exports.ConnectionMessage = void 0;
// eslint-disable-next-line max-classes-per-file
var HeaderNames_1 = require("../common.speech/HeaderNames");
var Exports_1 = require("../common/Exports");
var PropertyCollection_1 = require("./PropertyCollection");
var PropertyId_1 = require("./PropertyId");
/**
 * ConnectionMessage represents implementation specific messages sent to and received from
 * the speech service. These messages are provided for debugging purposes and should not
 * be used for production use cases with the Azure Cognitive Services Speech Service.
 * Messages sent to and received from the Speech Service are subject to change without
 * notice. This includes message contents, headers, payloads, ordering, etc.
 * Added in version 1.11.0.
 */
var ConnectionMessage = /** @class */ (function () {
    function ConnectionMessage() {
    }
    return ConnectionMessage;
}());
exports.ConnectionMessage = ConnectionMessage;
var ConnectionMessageImpl = /** @class */ (function () {
    function ConnectionMessageImpl(message) {
        var _this = this;
        this.privConnectionMessage = message;
        this.privProperties = new PropertyCollection_1.PropertyCollection();
        if (!!this.privConnectionMessage.headers[HeaderNames_1.HeaderNames.ConnectionId]) {
            this.privProperties.setProperty(PropertyId_1.PropertyId.Speech_SessionId, this.privConnectionMessage.headers[HeaderNames_1.HeaderNames.ConnectionId]);
        }
        Object.keys(this.privConnectionMessage.headers).forEach(function (header) {
            _this.privProperties.setProperty(header, _this.privConnectionMessage.headers[header]);
        });
    }
    Object.defineProperty(ConnectionMessageImpl.prototype, "path", {
        /**
         * The message path.
         */
        get: function () {
            return this.privConnectionMessage.headers[Object.keys(this.privConnectionMessage.headers).find(function (key) { return key.toLowerCase() === "path".toLowerCase(); })];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectionMessageImpl.prototype, "isTextMessage", {
        /**
         * Checks to see if the ConnectionMessage is a text message.
         * See also IsBinaryMessage().
         */
        get: function () {
            return this.privConnectionMessage.messageType === Exports_1.MessageType.Text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectionMessageImpl.prototype, "isBinaryMessage", {
        /**
         * Checks to see if the ConnectionMessage is a binary message.
         * See also GetBinaryMessage().
         */
        get: function () {
            return this.privConnectionMessage.messageType === Exports_1.MessageType.Binary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectionMessageImpl.prototype, "TextMessage", {
        /**
         * Gets the text message payload. Typically the text message content-type is
         * application/json. To determine other content-types use
         * Properties.GetProperty("Content-Type").
         */
        get: function () {
            return this.privConnectionMessage.textBody;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectionMessageImpl.prototype, "binaryMessage", {
        /**
         * Gets the binary message payload.
         */
        get: function () {
            return this.privConnectionMessage.binaryBody;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConnectionMessageImpl.prototype, "properties", {
        /**
         * A collection of properties and their values defined for this <see cref="ConnectionMessage"/>.
         * Message headers can be accessed via this collection (e.g. "Content-Type").
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a string that represents the connection message.
     */
    ConnectionMessageImpl.prototype.toString = function () {
        return "";
    };
    return ConnectionMessageImpl;
}());
exports.ConnectionMessageImpl = ConnectionMessageImpl;

//# sourceMappingURL=ConnectionMessage.js.map
