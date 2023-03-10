"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
exports.BaseAudioPlayer = void 0;
var Error_1 = require("../../common/Error");
var Exports_1 = require("../Exports");
var AudioStreamFormat_1 = require("./AudioStreamFormat");
/**
 * Base audio player class
 * TODO: Plays only PCM for now.
 * @class
 */
var BaseAudioPlayer = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {AudioStreamFormat} audioFormat audio stream format recognized by the player.
     */
    function BaseAudioPlayer(audioFormat) {
        this.audioContext = null;
        this.gainNode = null;
        this.autoUpdateBufferTimer = 0;
        if (audioFormat === undefined) {
            audioFormat = Exports_1.AudioStreamFormat.getDefaultInputFormat();
        }
        this.init(audioFormat);
    }
    /**
     * play Audio sample
     * @param newAudioData audio data to be played.
     */
    BaseAudioPlayer.prototype.playAudioSample = function (newAudioData, cb, err) {
        try {
            this.ensureInitializedContext();
            var audioData = this.formatAudioData(newAudioData);
            var newSamplesData = new Float32Array(this.samples.length + audioData.length);
            newSamplesData.set(this.samples, 0);
            newSamplesData.set(audioData, this.samples.length);
            this.samples = newSamplesData;
            if (!!cb) {
                cb();
            }
        }
        catch (e) {
            if (!!err) {
                err(e);
            }
        }
    };
    /**
     * stops audio and clears the buffers
     */
    BaseAudioPlayer.prototype.stopAudio = function (cb, err) {
        if (this.audioContext !== null) {
            this.samples = new Float32Array();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearInterval(this.autoUpdateBufferTimer);
            this.audioContext.close().then(function () {
                if (!!cb) {
                    cb();
                }
            }, function (error) {
                if (!!err) {
                    err(error);
                }
            });
            this.audioContext = null;
        }
    };
    BaseAudioPlayer.prototype.init = function (audioFormat) {
        this.audioFormat = audioFormat;
        this.samples = new Float32Array();
    };
    BaseAudioPlayer.prototype.ensureInitializedContext = function () {
        var _this = this;
        if (this.audioContext === null) {
            this.createAudioContext();
            var timerPeriod = 200;
            this.autoUpdateBufferTimer = setInterval(function () {
                _this.updateAudioBuffer();
            }, timerPeriod);
        }
    };
    BaseAudioPlayer.prototype.createAudioContext = function () {
        // new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        this.audioContext = AudioStreamFormat_1.AudioStreamFormatImpl.getAudioContext();
        // TODO: Various examples shows this gain node, it does not seem to be needed unless we plan
        // to control the volume, not likely
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.value = 1;
        this.gainNode.connect(this.audioContext.destination);
        this.startTime = this.audioContext.currentTime;
    };
    BaseAudioPlayer.prototype.formatAudioData = function (audioData) {
        switch (this.audioFormat.bitsPerSample) {
            case 8:
                return this.formatArrayBuffer(new Int8Array(audioData), 128);
            case 16:
                return this.formatArrayBuffer(new Int16Array(audioData), 32768);
            case 32:
                return this.formatArrayBuffer(new Int32Array(audioData), 2147483648);
            default:
                throw new Error_1.InvalidOperationError("Only WAVE_FORMAT_PCM (8/16/32 bps) format supported at this time");
        }
    };
    BaseAudioPlayer.prototype.formatArrayBuffer = function (audioData, maxValue) {
        var float32Data = new Float32Array(audioData.length);
        for (var i = 0; i < audioData.length; i++) {
            float32Data[i] = audioData[i] / maxValue;
        }
        return float32Data;
    };
    BaseAudioPlayer.prototype.updateAudioBuffer = function () {
        if (this.samples.length === 0) {
            return;
        }
        var channelCount = this.audioFormat.channels;
        var bufferSource = this.audioContext.createBufferSource();
        var frameCount = this.samples.length / channelCount;
        var audioBuffer = this.audioContext.createBuffer(channelCount, frameCount, this.audioFormat.samplesPerSec);
        // TODO: Should we do the conversion in the pushAudioSample instead?
        for (var channel = 0; channel < channelCount; channel++) {
            // Fill in individual channel data
            var channelOffset = channel;
            var audioData = audioBuffer.getChannelData(channel);
            for (var i = 0; i < this.samples.length; i++, channelOffset += channelCount) {
                audioData[i] = this.samples[channelOffset];
            }
        }
        if (this.startTime < this.audioContext.currentTime) {
            this.startTime = this.audioContext.currentTime;
        }
        bufferSource.buffer = audioBuffer;
        bufferSource.connect(this.gainNode);
        bufferSource.start(this.startTime);
        // Make sure we play the next sample after the current one.
        this.startTime += audioBuffer.duration;
        // Clear the samples for the next pushed data.
        this.samples = new Float32Array();
    };
    BaseAudioPlayer.prototype.playAudio = function (audioData) {
        return __awaiter(this, void 0, void 0, function () {
            var source, destination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.audioContext === null) {
                            this.createAudioContext();
                        }
                        source = this.audioContext.createBufferSource();
                        destination = this.audioContext.destination;
                        return [4 /*yield*/, this.audioContext.decodeAudioData(audioData, function (newBuffer) {
                                source.buffer = newBuffer;
                                source.connect(destination);
                                source.start(0);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BaseAudioPlayer;
}());
exports.BaseAudioPlayer = BaseAudioPlayer;

//# sourceMappingURL=BaseAudioPlayer.js.map
