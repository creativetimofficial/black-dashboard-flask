"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketMessageFormatter = void 0;
var Exports_1 = require("../common/Exports");
var CRLF = "\r\n";
var WebsocketMessageFormatter = /** @class */ (function () {
    function WebsocketMessageFormatter() {
    }
    WebsocketMessageFormatter.prototype.toConnectionMessage = function (message) {
        var deferral = new Exports_1.Deferred();
        try {
            if (message.messageType === Exports_1.MessageType.Text) {
                var textMessage = message.textContent;
                var headers = {};
                var body = null;
                if (textMessage) {
                    var headerBodySplit = textMessage.split("\r\n\r\n");
                    if (headerBodySplit && headerBodySplit.length > 0) {
                        headers = this.parseHeaders(headerBodySplit[0]);
                        if (headerBodySplit.length > 1) {
                            body = headerBodySplit[1];
                        }
                    }
                }
                deferral.resolve(new Exports_1.ConnectionMessage(message.messageType, body, headers, message.id));
            }
            else if (message.messageType === Exports_1.MessageType.Binary) {
                var binaryMessage = message.binaryContent;
                var headers = {};
                var body = null;
                if (!binaryMessage || binaryMessage.byteLength < 2) {
                    throw new Error("Invalid binary message format. Header length missing.");
                }
                var dataView = new DataView(binaryMessage);
                var headerLength = dataView.getInt16(0);
                if (binaryMessage.byteLength < headerLength + 2) {
                    throw new Error("Invalid binary message format. Header content missing.");
                }
                var headersString = "";
                for (var i = 0; i < headerLength; i++) {
                    headersString += String.fromCharCode((dataView).getInt8(i + 2));
                }
                headers = this.parseHeaders(headersString);
                if (binaryMessage.byteLength > headerLength + 2) {
                    body = binaryMessage.slice(2 + headerLength);
                }
                deferral.resolve(new Exports_1.ConnectionMessage(message.messageType, body, headers, message.id));
            }
        }
        catch (e) {
            deferral.reject("Error formatting the message. Error: " + e);
        }
        return deferral.promise;
    };
    WebsocketMessageFormatter.prototype.fromConnectionMessage = function (message) {
        var deferral = new Exports_1.Deferred();
        try {
            if (message.messageType === Exports_1.MessageType.Text) {
                var payload = "" + this.makeHeaders(message) + CRLF + (message.textBody ? message.textBody : "");
                deferral.resolve(new Exports_1.RawWebsocketMessage(Exports_1.MessageType.Text, payload, message.id));
            }
            else if (message.messageType === Exports_1.MessageType.Binary) {
                var headersString = this.makeHeaders(message);
                var content = message.binaryBody;
                var headerBuffer = this.stringToArrayBuffer(headersString);
                var headerInt8Array = new Int8Array(headerBuffer);
                var headerLength = headerInt8Array.byteLength;
                var payloadInt8Array = new Int8Array(2 + headerLength + (content ? content.byteLength : 0));
                payloadInt8Array[0] = ((headerLength >> 8) & 0xff);
                payloadInt8Array[1] = headerLength & 0xff;
                payloadInt8Array.set(headerInt8Array, 2);
                if (content) {
                    var bodyInt8Array = new Int8Array(content);
                    payloadInt8Array.set(bodyInt8Array, 2 + headerLength);
                }
                var payload = payloadInt8Array.buffer;
                deferral.resolve(new Exports_1.RawWebsocketMessage(Exports_1.MessageType.Binary, payload, message.id));
            }
        }
        catch (e) {
            deferral.reject("Error formatting the message. " + e);
        }
        return deferral.promise;
    };
    WebsocketMessageFormatter.prototype.makeHeaders = function (message) {
        var headersString = "";
        if (message.headers) {
            for (var header in message.headers) {
                if (header) {
                    headersString += header + ": " + message.headers[header] + CRLF;
                }
            }
        }
        return headersString;
    };
    WebsocketMessageFormatter.prototype.parseHeaders = function (headersString) {
        var headers = {};
        if (headersString) {
            var headerMatches = headersString.match(/[^\r\n]+/g);
            if (headers) {
                for (var _i = 0, headerMatches_1 = headerMatches; _i < headerMatches_1.length; _i++) {
                    var header = headerMatches_1[_i];
                    if (header) {
                        var separatorIndex = header.indexOf(":");
                        var headerName = separatorIndex > 0 ? header.substr(0, separatorIndex).trim().toLowerCase() : header;
                        var headerValue = separatorIndex > 0 && header.length > (separatorIndex + 1) ?
                            header.substr(separatorIndex + 1).trim() :
                            "";
                        headers[headerName] = headerValue;
                    }
                }
            }
        }
        return headers;
    };
    WebsocketMessageFormatter.prototype.stringToArrayBuffer = function (str) {
        var buffer = new ArrayBuffer(str.length);
        var view = new DataView(buffer);
        for (var i = 0; i < str.length; i++) {
            view.setUint8(i, str.charCodeAt(i));
        }
        return buffer;
    };
    return WebsocketMessageFormatter;
}());
exports.WebsocketMessageFormatter = WebsocketMessageFormatter;

//# sourceMappingURL=WebsocketMessageFormatter.js.map
