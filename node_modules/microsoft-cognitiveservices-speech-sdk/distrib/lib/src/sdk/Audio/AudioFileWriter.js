"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioFileWriter = void 0;
var fs = __importStar(require("fs"));
var Contracts_1 = require("../Contracts");
var AudioFileWriter = /** @class */ (function () {
    function AudioFileWriter(filename) {
        Contracts_1.Contracts.throwIfNullOrUndefined(fs.openSync, "\nFile System access not available, please use Push or PullAudioOutputStream");
        this.privFd = fs.openSync(filename, "w");
    }
    Object.defineProperty(AudioFileWriter.prototype, "format", {
        set: function (format) {
            Contracts_1.Contracts.throwIfNotUndefined(this.privAudioFormat, "format is already set");
            this.privAudioFormat = format;
            var headerOffset = 0;
            if (this.privAudioFormat.hasHeader) {
                headerOffset = this.privAudioFormat.header.byteLength;
            }
            if (this.privFd !== undefined) {
                this.privWriteStream = fs.createWriteStream("", { fd: this.privFd, start: headerOffset, autoClose: false });
            }
        },
        enumerable: false,
        configurable: true
    });
    AudioFileWriter.prototype.write = function (buffer) {
        Contracts_1.Contracts.throwIfNullOrUndefined(this.privAudioFormat, "must set format before writing.");
        if (this.privWriteStream !== undefined) {
            this.privWriteStream.write(new Uint8Array(buffer.slice(0)));
        }
    };
    AudioFileWriter.prototype.close = function () {
        var _this = this;
        if (this.privFd !== undefined) {
            this.privWriteStream.on("finish", function () {
                if (_this.privAudioFormat.hasHeader) {
                    _this.privAudioFormat.updateHeader(_this.privWriteStream.bytesWritten);
                    fs.writeSync(_this.privFd, new Int8Array(_this.privAudioFormat.header), 0, _this.privAudioFormat.header.byteLength, 0);
                }
                fs.closeSync(_this.privFd);
                _this.privFd = undefined;
            });
            this.privWriteStream.end();
        }
    };
    AudioFileWriter.prototype.id = function () {
        return this.privId;
    };
    return AudioFileWriter;
}());
exports.AudioFileWriter = AudioFileWriter;

//# sourceMappingURL=AudioFileWriter.js.map
