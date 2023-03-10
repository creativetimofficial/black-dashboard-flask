"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationWebsocketMessageFormatter = void 0;
var Exports_1 = require("../../common/Exports");
var ConversationConnectionMessage_1 = require("./ConversationConnectionMessage");
/**
 * Based off WebsocketMessageFormatter. The messages for Conversation Translator have some variations from the Speech messages.
 */
var ConversationWebsocketMessageFormatter = /** @class */ (function () {
    function ConversationWebsocketMessageFormatter() {
    }
    /**
     * Format incoming messages: text (speech partial/final, IM) or binary (tts)
     */
    ConversationWebsocketMessageFormatter.prototype.toConnectionMessage = function (message) {
        var deferral = new Exports_1.Deferred();
        try {
            if (message.messageType === Exports_1.MessageType.Text) {
                var incomingMessage = new ConversationConnectionMessage_1.ConversationConnectionMessage(message.messageType, message.textContent, {}, message.id);
                deferral.resolve(incomingMessage);
            }
            else if (message.messageType === Exports_1.MessageType.Binary) {
                deferral.resolve(new ConversationConnectionMessage_1.ConversationConnectionMessage(message.messageType, message.binaryContent, undefined, message.id));
            }
        }
        catch (e) {
            deferral.reject("Error formatting the message. Error: " + e);
        }
        return deferral.promise;
    };
    /**
     * Format outgoing messages: text (commands or IM)
     */
    ConversationWebsocketMessageFormatter.prototype.fromConnectionMessage = function (message) {
        var deferral = new Exports_1.Deferred();
        try {
            if (message.messageType === Exports_1.MessageType.Text) {
                var payload = "" + (message.textBody ? message.textBody : "");
                deferral.resolve(new Exports_1.RawWebsocketMessage(Exports_1.MessageType.Text, payload, message.id));
            }
        }
        catch (e) {
            deferral.reject("Error formatting the message. " + e);
        }
        return deferral.promise;
    };
    return ConversationWebsocketMessageFormatter;
}());
exports.ConversationWebsocketMessageFormatter = ConversationWebsocketMessageFormatter;

//# sourceMappingURL=ConversationWebsocketMessageFormatter.js.map
