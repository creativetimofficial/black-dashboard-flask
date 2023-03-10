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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushAudioOutputStreamImpl = exports.PushAudioOutputStream = exports.PullAudioOutputStreamImpl = exports.PullAudioOutputStream = exports.AudioOutputStream = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../../common/Exports");
var Contracts_1 = require("../Contracts");
var AudioOutputFormat_1 = require("./AudioOutputFormat");
/**
 * Represents audio output stream used for custom audio output configurations.
 * @class AudioOutputStream
 */
var AudioOutputStream = /** @class */ (function () {
    /**
     * Creates and initializes an instance.
     * @constructor
     */
    function AudioOutputStream() {
        return;
    }
    /**
     * Creates a memory backed PullAudioOutputStream with the specified audio format.
     * @member AudioOutputStream.createPullStream
     * @function
     * @public
     * @returns {PullAudioOutputStream} The audio output stream being created.
     */
    AudioOutputStream.createPullStream = function () {
        return PullAudioOutputStream.create();
    };
    return AudioOutputStream;
}());
exports.AudioOutputStream = AudioOutputStream;
/**
 * Represents memory backed push audio output stream used for custom audio output configurations.
 * @class PullAudioOutputStream
 */
var PullAudioOutputStream = /** @class */ (function (_super) {
    __extends(PullAudioOutputStream, _super);
    function PullAudioOutputStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a memory backed PullAudioOutputStream with the specified audio format.
     * @member PullAudioOutputStream.create
     * @function
     * @public
     * @returns {PullAudioOutputStream} The push audio output stream being created.
     */
    PullAudioOutputStream.create = function () {
        return new PullAudioOutputStreamImpl();
    };
    return PullAudioOutputStream;
}(AudioOutputStream));
exports.PullAudioOutputStream = PullAudioOutputStream;
/**
 * Represents memory backed push audio output stream used for custom audio output configurations.
 * @private
 * @class PullAudioOutputStreamImpl
 */
var PullAudioOutputStreamImpl = /** @class */ (function (_super) {
    __extends(PullAudioOutputStreamImpl, _super);
    /**
     * Creates and initializes an instance with the given values.
     * @constructor
     */
    function PullAudioOutputStreamImpl() {
        var _this = _super.call(this) || this;
        _this.privId = Exports_1.createNoDashGuid();
        _this.privStream = new Exports_1.Stream();
        return _this;
    }
    Object.defineProperty(PullAudioOutputStreamImpl.prototype, "format", {
        /**
         * Format information for the audio
         */
        get: function () {
            return this.privFormat;
        },
        /**
         * Sets the format information to the stream. For internal use only.
         * @param {AudioStreamFormat} format - the format to be set.
         */
        set: function (format) {
            if (format === undefined || format === null) {
                this.privFormat = AudioOutputFormat_1.AudioOutputFormatImpl.getDefaultOutputFormat();
            }
            this.privFormat = format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PullAudioOutputStreamImpl.prototype, "isClosed", {
        /**
         * Checks if the stream is closed
         * @member PullAudioOutputStreamImpl.prototype.isClosed
         * @property
         * @public
         */
        get: function () {
            return this.privStream.isClosed;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the id of the stream
     * @member PullAudioOutputStreamImpl.prototype.id
     * @property
     * @public
     */
    PullAudioOutputStreamImpl.prototype.id = function () {
        return this.privId;
    };
    /**
     * Reads audio data from the internal buffer.
     * @member PullAudioOutputStreamImpl.prototype.read
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - An ArrayBuffer to store the read data.
     * @returns {Promise<number>} - Audio buffer length has been read.
     */
    PullAudioOutputStreamImpl.prototype.read = function (dataBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var intView, totalBytes, chunk, tmpBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        intView = new Int8Array(dataBuffer);
                        totalBytes = 0;
                        if (this.privLastChunkView !== undefined) {
                            if (this.privLastChunkView.length > dataBuffer.byteLength) {
                                intView.set(this.privLastChunkView.slice(0, dataBuffer.byteLength));
                                this.privLastChunkView = this.privLastChunkView.slice(dataBuffer.byteLength);
                                return [2 /*return*/, Promise.resolve(dataBuffer.byteLength)];
                            }
                            intView.set(this.privLastChunkView);
                            totalBytes = this.privLastChunkView.length;
                            this.privLastChunkView = undefined;
                        }
                        _a.label = 1;
                    case 1:
                        if (!(totalBytes < dataBuffer.byteLength && !this.privStream.isReadEnded)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.privStream.read()];
                    case 2:
                        chunk = _a.sent();
                        if (chunk !== undefined && !chunk.isEnd) {
                            tmpBuffer = void 0;
                            if (chunk.buffer.byteLength > dataBuffer.byteLength - totalBytes) {
                                tmpBuffer = chunk.buffer.slice(0, dataBuffer.byteLength - totalBytes);
                                this.privLastChunkView = new Int8Array(chunk.buffer.slice(dataBuffer.byteLength - totalBytes));
                            }
                            else {
                                tmpBuffer = chunk.buffer;
                            }
                            intView.set(new Int8Array(tmpBuffer), totalBytes);
                            totalBytes += tmpBuffer.byteLength;
                        }
                        else {
                            this.privStream.readEnded();
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, totalBytes];
                }
            });
        });
    };
    /**
     * Writes the audio data specified by making an internal copy of the data.
     * @member PullAudioOutputStreamImpl.prototype.write
     * @function
     * @public
     * @param {ArrayBuffer} dataBuffer - The audio buffer of which this function will make a copy.
     */
    PullAudioOutputStreamImpl.prototype.write = function (dataBuffer) {
        Contracts_1.Contracts.throwIfNullOrUndefined(this.privStream, "must set format before writing");
        this.privStream.writeStreamChunk({
            buffer: dataBuffer,
            isEnd: false,
            timeReceived: Date.now()
        });
    };
    /**
     * Closes the stream.
     * @member PullAudioOutputStreamImpl.prototype.close
     * @function
     * @public
     */
    PullAudioOutputStreamImpl.prototype.close = function () {
        this.privStream.close();
    };
    return PullAudioOutputStreamImpl;
}(PullAudioOutputStream));
exports.PullAudioOutputStreamImpl = PullAudioOutputStreamImpl;
/*
 * Represents audio output stream used for custom audio output configurations.
 * @class PushAudioOutputStream
 */
var PushAudioOutputStream = /** @class */ (function (_super) {
    __extends(PushAudioOutputStream, _super);
    /**
     * Creates and initializes and instance.
     * @constructor
     */
    function PushAudioOutputStream() {
        return _super.call(this) || this;
    }
    /**
     * Creates a PushAudioOutputStream that delegates to the specified callback interface for
     * write() and close() methods.
     * @member PushAudioOutputStream.create
     * @function
     * @public
     * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
     * derived from PushAudioOutputStreamCallback
     * @returns {PushAudioOutputStream} The push audio output stream being created.
     */
    PushAudioOutputStream.create = function (callback) {
        return new PushAudioOutputStreamImpl(callback);
    };
    return PushAudioOutputStream;
}(AudioOutputStream));
exports.PushAudioOutputStream = PushAudioOutputStream;
/**
 * Represents audio output stream used for custom audio output configurations.
 * @private
 * @class PushAudioOutputStreamImpl
 */
var PushAudioOutputStreamImpl = /** @class */ (function (_super) {
    __extends(PushAudioOutputStreamImpl, _super);
    /**
     * Creates a PushAudioOutputStream that delegates to the specified callback interface for
     * read() and close() methods.
     * @constructor
     * @param {PushAudioOutputStreamCallback} callback - The custom audio output object,
     * derived from PushAudioOutputStreamCallback
     */
    function PushAudioOutputStreamImpl(callback) {
        var _this = _super.call(this) || this;
        _this.privId = Exports_1.createNoDashGuid();
        _this.privCallback = callback;
        return _this;
    }
    Object.defineProperty(PushAudioOutputStreamImpl.prototype, "format", {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        set: function (format) { },
        enumerable: false,
        configurable: true
    });
    PushAudioOutputStreamImpl.prototype.write = function (buffer) {
        if (!!this.privCallback.write) {
            this.privCallback.write(buffer);
        }
    };
    PushAudioOutputStreamImpl.prototype.close = function () {
        if (!!this.privCallback.close) {
            this.privCallback.close();
        }
    };
    PushAudioOutputStreamImpl.prototype.id = function () {
        return this.privId;
    };
    return PushAudioOutputStreamImpl;
}(PushAudioOutputStream));
exports.PushAudioOutputStreamImpl = PushAudioOutputStreamImpl;

//# sourceMappingURL=AudioOutputStream.js.map
