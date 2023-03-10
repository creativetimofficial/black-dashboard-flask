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
exports.ChunkedArrayBufferStream = void 0;
var Exports_1 = require("./Exports");
var ChunkedArrayBufferStream = /** @class */ (function (_super) {
    __extends(ChunkedArrayBufferStream, _super);
    function ChunkedArrayBufferStream(targetChunkSize, streamId) {
        var _this = _super.call(this, streamId) || this;
        _this.privTargetChunkSize = targetChunkSize;
        _this.privNextBufferReadyBytes = 0;
        return _this;
    }
    ChunkedArrayBufferStream.prototype.writeStreamChunk = function (chunk) {
        // No pending write, and the buffer is the right size so write it.
        if (chunk.isEnd ||
            (0 === this.privNextBufferReadyBytes && chunk.buffer.byteLength === this.privTargetChunkSize)) {
            _super.prototype.writeStreamChunk.call(this, chunk);
            return;
        }
        var bytesCopiedFromBuffer = 0;
        while (bytesCopiedFromBuffer < chunk.buffer.byteLength) {
            // Fill the next buffer.
            if (undefined === this.privNextBufferToWrite) {
                this.privNextBufferToWrite = new ArrayBuffer(this.privTargetChunkSize);
                this.privNextBufferStartTime = chunk.timeReceived;
            }
            // Find out how many bytes we can copy into the read buffer.
            var bytesToCopy = Math.min(chunk.buffer.byteLength - bytesCopiedFromBuffer, this.privTargetChunkSize - this.privNextBufferReadyBytes);
            var targetView = new Uint8Array(this.privNextBufferToWrite);
            var sourceView = new Uint8Array(chunk.buffer.slice(bytesCopiedFromBuffer, bytesToCopy + bytesCopiedFromBuffer));
            targetView.set(sourceView, this.privNextBufferReadyBytes);
            this.privNextBufferReadyBytes += bytesToCopy;
            bytesCopiedFromBuffer += bytesToCopy;
            // Are we ready to write?
            if (this.privNextBufferReadyBytes === this.privTargetChunkSize) {
                _super.prototype.writeStreamChunk.call(this, {
                    buffer: this.privNextBufferToWrite,
                    isEnd: false,
                    timeReceived: this.privNextBufferStartTime,
                });
                this.privNextBufferReadyBytes = 0;
                this.privNextBufferToWrite = undefined;
            }
        }
    };
    ChunkedArrayBufferStream.prototype.close = function () {
        // Send whatever is pending, then close the base class.
        if (0 !== this.privNextBufferReadyBytes && !this.isClosed) {
            _super.prototype.writeStreamChunk.call(this, {
                buffer: this.privNextBufferToWrite.slice(0, this.privNextBufferReadyBytes),
                isEnd: false,
                timeReceived: this.privNextBufferStartTime,
            });
        }
        _super.prototype.close.call(this);
    };
    return ChunkedArrayBufferStream;
}(Exports_1.Stream));
exports.ChunkedArrayBufferStream = ChunkedArrayBufferStream;

//# sourceMappingURL=ChunkedArrayBufferStream.js.map
