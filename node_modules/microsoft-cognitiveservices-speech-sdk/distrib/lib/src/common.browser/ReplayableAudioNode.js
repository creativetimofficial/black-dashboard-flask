"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayableAudioNode = void 0;
var ReplayableAudioNode = /** @class */ (function () {
    function ReplayableAudioNode(audioSource, bytesPerSecond) {
        this.privBuffers = [];
        this.privReplayOffset = 0;
        this.privLastShrinkOffset = 0;
        this.privBufferStartOffset = 0;
        this.privBufferSerial = 0;
        this.privBufferedBytes = 0;
        this.privReplay = false;
        this.privLastChunkAcquiredTime = 0;
        this.privAudioNode = audioSource;
        this.privBytesPerSecond = bytesPerSecond;
    }
    ReplayableAudioNode.prototype.id = function () {
        return this.privAudioNode.id();
    };
    // Reads and returns the next chunk of audio buffer.
    // If replay of existing buffers are needed, read() will first seek and replay
    // existing content, and upoin completion it will read new content from the underlying
    // audio node, saving that content into the replayable buffers.
    ReplayableAudioNode.prototype.read = function () {
        var _this = this;
        // if there is a replay request to honor.
        if (!!this.privReplay && this.privBuffers.length !== 0) {
            // Find the start point in the buffers.
            // Offsets are in 100ns increments.
            // So how many bytes do we need to seek to get the right offset?
            var offsetToSeek = this.privReplayOffset - this.privBufferStartOffset;
            var bytesToSeek = Math.round(offsetToSeek * this.privBytesPerSecond * 1e-7);
            if (0 !== (bytesToSeek % 2)) {
                bytesToSeek++;
            }
            var i = 0;
            while (i < this.privBuffers.length && bytesToSeek >= this.privBuffers[i].chunk.buffer.byteLength) {
                bytesToSeek -= this.privBuffers[i++].chunk.buffer.byteLength;
            }
            if (i < this.privBuffers.length) {
                var retVal = this.privBuffers[i].chunk.buffer.slice(bytesToSeek);
                this.privReplayOffset += (retVal.byteLength / this.privBytesPerSecond) * 1e+7;
                // If we've reached the end of the buffers, stop replaying.
                if (i === this.privBuffers.length - 1) {
                    this.privReplay = false;
                }
                return Promise.resolve({
                    buffer: retVal,
                    isEnd: false,
                    timeReceived: this.privBuffers[i].chunk.timeReceived,
                });
            }
        }
        return this.privAudioNode.read()
            .then(function (result) {
            if (result && result.buffer) {
                _this.privBuffers.push(new BufferEntry(result, _this.privBufferSerial++, _this.privBufferedBytes));
                _this.privBufferedBytes += result.buffer.byteLength;
            }
            return result;
        });
    };
    ReplayableAudioNode.prototype.detach = function () {
        this.privBuffers = undefined;
        return this.privAudioNode.detach();
    };
    ReplayableAudioNode.prototype.replay = function () {
        if (this.privBuffers && 0 !== this.privBuffers.length) {
            this.privReplay = true;
            this.privReplayOffset = this.privLastShrinkOffset;
        }
    };
    // Shrinks the existing audio buffers to start at the new offset, or at the
    // beginning of the buffer closest to the requested offset.
    // A replay request will start from the last shrink point.
    ReplayableAudioNode.prototype.shrinkBuffers = function (offset) {
        if (this.privBuffers === undefined || this.privBuffers.length === 0) {
            return;
        }
        this.privLastShrinkOffset = offset;
        // Find the start point in the buffers.
        // Offsets are in 100ns increments.
        // So how many bytes do we need to seek to get the right offset?
        var offsetToSeek = offset - this.privBufferStartOffset;
        var bytesToSeek = Math.round(offsetToSeek * this.privBytesPerSecond * 1e-7);
        var i = 0;
        while (i < this.privBuffers.length && bytesToSeek >= this.privBuffers[i].chunk.buffer.byteLength) {
            bytesToSeek -= this.privBuffers[i++].chunk.buffer.byteLength;
        }
        this.privBufferStartOffset = Math.round(offset - ((bytesToSeek / this.privBytesPerSecond) * 1e+7));
        this.privBuffers = this.privBuffers.slice(i);
    };
    // Finds the time a buffer of audio was first seen by offset.
    ReplayableAudioNode.prototype.findTimeAtOffset = function (offset) {
        if (offset < this.privBufferStartOffset || this.privBuffers === undefined) {
            return 0;
        }
        for (var _i = 0, _a = this.privBuffers; _i < _a.length; _i++) {
            var value = _a[_i];
            var startOffset = (value.byteOffset / this.privBytesPerSecond) * 1e7;
            var endOffset = startOffset + ((value.chunk.buffer.byteLength / this.privBytesPerSecond) * 1e7);
            if (offset >= startOffset && offset <= endOffset) {
                return value.chunk.timeReceived;
            }
        }
        return 0;
    };
    return ReplayableAudioNode;
}());
exports.ReplayableAudioNode = ReplayableAudioNode;
// Primary use of this class is to help debugging problems with the replay
// code. If the memory cost of alloc / dealloc gets too much, drop it and just use
// the ArrayBuffer directly.
var BufferEntry = /** @class */ (function () {
    function BufferEntry(chunk, serial, byteOffset) {
        this.chunk = chunk;
        this.serial = serial;
        this.byteOffset = byteOffset;
    }
    return BufferEntry;
}());

//# sourceMappingURL=ReplayableAudioNode.js.map
