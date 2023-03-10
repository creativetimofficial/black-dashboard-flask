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
exports.SpeechConnectionMessage = void 0;
var Exports_1 = require("../common/Exports");
var HeaderNames_1 = require("./HeaderNames");
var SpeechConnectionMessage = /** @class */ (function (_super) {
    __extends(SpeechConnectionMessage, _super);
    function SpeechConnectionMessage(messageType, path, requestId, contentType, body, streamId, additionalHeaders, id) {
        var _this = this;
        if (!path) {
            throw new Exports_1.ArgumentNullError("path");
        }
        if (!requestId) {
            throw new Exports_1.ArgumentNullError("requestId");
        }
        var headers = {};
        headers[HeaderNames_1.HeaderNames.Path] = path;
        headers[HeaderNames_1.HeaderNames.RequestId] = requestId;
        headers[HeaderNames_1.HeaderNames.RequestTimestamp] = new Date().toISOString();
        if (contentType) {
            headers[HeaderNames_1.HeaderNames.ContentType] = contentType;
        }
        if (streamId) {
            headers[HeaderNames_1.HeaderNames.RequestStreamId] = streamId;
        }
        if (additionalHeaders) {
            for (var headerName in additionalHeaders) {
                if (headerName) {
                    headers[headerName] = additionalHeaders[headerName];
                }
            }
        }
        if (id) {
            _this = _super.call(this, messageType, body, headers, id) || this;
        }
        else {
            _this = _super.call(this, messageType, body, headers) || this;
        }
        _this.privPath = path;
        _this.privRequestId = requestId;
        _this.privContentType = contentType;
        _this.privStreamId = streamId;
        _this.privAdditionalHeaders = additionalHeaders;
        return _this;
    }
    Object.defineProperty(SpeechConnectionMessage.prototype, "path", {
        get: function () {
            return this.privPath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechConnectionMessage.prototype, "requestId", {
        get: function () {
            return this.privRequestId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechConnectionMessage.prototype, "contentType", {
        get: function () {
            return this.privContentType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechConnectionMessage.prototype, "streamId", {
        get: function () {
            return this.privStreamId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechConnectionMessage.prototype, "additionalHeaders", {
        get: function () {
            return this.privAdditionalHeaders;
        },
        enumerable: false,
        configurable: true
    });
    SpeechConnectionMessage.fromConnectionMessage = function (message) {
        var path = null;
        var requestId = null;
        var contentType = null;
        // let requestTimestamp = null;
        var streamId = null;
        var additionalHeaders = {};
        if (message.headers) {
            for (var headerName in message.headers) {
                if (headerName) {
                    if (headerName.toLowerCase() === HeaderNames_1.HeaderNames.Path.toLowerCase()) {
                        path = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_1.HeaderNames.RequestId.toLowerCase()) {
                        requestId = message.headers[headerName];
                        // } else if (headerName.toLowerCase() === HeaderNames.RequestTimestamp.toLowerCase()) {
                        //  requestTimestamp = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_1.HeaderNames.ContentType.toLowerCase()) {
                        contentType = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames_1.HeaderNames.RequestStreamId.toLowerCase()) {
                        streamId = message.headers[headerName];
                    }
                    else {
                        additionalHeaders[headerName] = message.headers[headerName];
                    }
                }
            }
        }
        return new SpeechConnectionMessage(message.messageType, path, requestId, contentType, message.body, streamId, additionalHeaders, message.id);
    };
    return SpeechConnectionMessage;
}(Exports_1.ConnectionMessage));
exports.SpeechConnectionMessage = SpeechConnectionMessage;

//# sourceMappingURL=SpeechConnectionMessage.Internal.js.map
