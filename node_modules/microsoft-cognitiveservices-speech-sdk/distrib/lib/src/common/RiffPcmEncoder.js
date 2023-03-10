"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiffPcmEncoder = void 0;
var RiffPcmEncoder = /** @class */ (function () {
    function RiffPcmEncoder(actualSampleRate, desiredSampleRate) {
        this.privActualSampleRate = actualSampleRate;
        this.privDesiredSampleRate = desiredSampleRate;
    }
    RiffPcmEncoder.prototype.encode = function (actualAudioFrame) {
        var audioFrame = this.downSampleAudioFrame(actualAudioFrame, this.privActualSampleRate, this.privDesiredSampleRate);
        if (!audioFrame) {
            return null;
        }
        var audioLength = audioFrame.length * 2;
        var buffer = new ArrayBuffer(audioLength);
        var view = new DataView(buffer);
        this.floatTo16BitPCM(view, 0, audioFrame);
        return buffer;
    };
    RiffPcmEncoder.prototype.setString = function (view, offset, str) {
        for (var i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };
    RiffPcmEncoder.prototype.floatTo16BitPCM = function (view, offset, input) {
        for (var i = 0; i < input.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, input[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    };
    RiffPcmEncoder.prototype.downSampleAudioFrame = function (srcFrame, srcRate, dstRate) {
        if (!srcFrame) {
            return null;
        }
        if (dstRate === srcRate || dstRate > srcRate) {
            return srcFrame;
        }
        var ratio = srcRate / dstRate;
        var dstLength = Math.round(srcFrame.length / ratio);
        var dstFrame = new Float32Array(dstLength);
        var srcOffset = 0;
        var dstOffset = 0;
        while (dstOffset < dstLength) {
            var nextSrcOffset = Math.round((dstOffset + 1) * ratio);
            var accum = 0;
            var count = 0;
            while (srcOffset < nextSrcOffset && srcOffset < srcFrame.length) {
                accum += srcFrame[srcOffset++];
                count++;
            }
            dstFrame[dstOffset++] = accum / count;
        }
        return dstFrame;
    };
    return RiffPcmEncoder;
}());
exports.RiffPcmEncoder = RiffPcmEncoder;

//# sourceMappingURL=RiffPcmEncoder.js.map
