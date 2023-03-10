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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerAudioDestination = void 0;
var Exports_1 = require("../../common.speech/Exports");
var Exports_2 = require("../../common/Exports");
var AudioOutputStream_1 = require("./AudioOutputStream");
var AudioStreamFormat_1 = require("./AudioStreamFormat");
var MediaDurationPlaceholderSeconds = 60 * 30;
var AudioFormatToMimeType = (_a = {},
    _a[AudioStreamFormat_1.AudioFormatTag.PCM] = "audio/wav",
    _a[AudioStreamFormat_1.AudioFormatTag.MuLaw] = "audio/x-wav",
    _a[AudioStreamFormat_1.AudioFormatTag.MP3] = "audio/mpeg",
    _a[AudioStreamFormat_1.AudioFormatTag.OGG_OPUS] = "audio/ogg",
    _a[AudioStreamFormat_1.AudioFormatTag.WEBM_OPUS] = "audio/webm; codecs=opus",
    _a[AudioStreamFormat_1.AudioFormatTag.ALaw] = "audio/x-wav",
    _a[AudioStreamFormat_1.AudioFormatTag.FLAC] = "audio/flac",
    _a);
/**
 * Represents the speaker playback audio destination, which only works in browser.
 * Note: the SDK will try to use <a href="https://www.w3.org/TR/media-source/">Media Source Extensions</a> to play audio.
 * Mp3 format has better supports on Microsoft Edge, Chrome and Safari (desktop), so, it's better to specify mp3 format for playback.
 * @class SpeakerAudioDestination
 * Updated in version 1.17.0
 */
var SpeakerAudioDestination = /** @class */ (function () {
    function SpeakerAudioDestination(audioDestinationId) {
        this.privPlaybackStarted = false;
        this.privAppendingToBuffer = false;
        this.privMediaSourceOpened = false;
        this.privBytesReceived = 0;
        this.privId = audioDestinationId ? audioDestinationId : Exports_2.createNoDashGuid();
        this.privIsPaused = false;
        this.privIsClosed = false;
    }
    SpeakerAudioDestination.prototype.id = function () {
        return this.privId;
    };
    SpeakerAudioDestination.prototype.write = function (buffer, cb, err) {
        if (this.privAudioBuffer !== undefined) {
            this.privAudioBuffer.push(buffer);
            this.updateSourceBuffer().then(function () {
                if (!!cb) {
                    cb();
                }
            }, function (error) {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined) {
            this.privAudioOutputStream.write(buffer);
            this.privBytesReceived += buffer.byteLength;
        }
    };
    SpeakerAudioDestination.prototype.close = function (cb, err) {
        var _this = this;
        this.privIsClosed = true;
        if (this.privSourceBuffer !== undefined) {
            this.handleSourceBufferUpdateEnd().then(function () {
                if (!!cb) {
                    cb();
                }
            }, function (error) {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined && typeof window !== "undefined") {
            if ((this.privFormat.formatTag === AudioStreamFormat_1.AudioFormatTag.PCM || this.privFormat.formatTag === AudioStreamFormat_1.AudioFormatTag.MuLaw
                || this.privFormat.formatTag === AudioStreamFormat_1.AudioFormatTag.ALaw) && this.privFormat.hasHeader === false) {
                // eslint-disable-next-line no-console
                console.warn("Play back is not supported for raw PCM, mulaw or alaw format without header.");
                if (!!this.onAudioEnd) {
                    this.onAudioEnd(this);
                }
            }
            else {
                var receivedAudio_1 = new ArrayBuffer(this.privBytesReceived);
                this.privAudioOutputStream.read(receivedAudio_1).then(function () {
                    receivedAudio_1 = Exports_1.SynthesisAdapterBase.addHeader(receivedAudio_1, _this.privFormat);
                    var audioBlob = new Blob([receivedAudio_1], { type: AudioFormatToMimeType[_this.privFormat.formatTag] });
                    _this.privAudio.src = window.URL.createObjectURL(audioBlob);
                    _this.notifyPlayback().then(function () {
                        if (!!cb) {
                            cb();
                        }
                    }, function (error) {
                        if (!!err) {
                            err(error);
                        }
                    });
                }, function (error) {
                    if (!!err) {
                        err(error);
                    }
                });
            }
        }
        else {
            // unsupported format, call onAudioEnd directly.
            if (!!this.onAudioEnd) {
                this.onAudioEnd(this);
            }
        }
    };
    Object.defineProperty(SpeakerAudioDestination.prototype, "format", {
        set: function (format) {
            var _this = this;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (typeof (AudioContext) !== "undefined" || (typeof (window) !== "undefined" && typeof (window.webkitAudioContext) !== "undefined")) {
                this.privFormat = format;
                var mimeType_1 = AudioFormatToMimeType[this.privFormat.formatTag];
                if (mimeType_1 === undefined) {
                    // eslint-disable-next-line no-console
                    console.warn("Unknown mimeType for format " + AudioStreamFormat_1.AudioFormatTag[this.privFormat.formatTag] + "; playback is not supported.");
                }
                else if (typeof (MediaSource) !== "undefined" && MediaSource.isTypeSupported(mimeType_1)) {
                    this.privAudio = new Audio();
                    this.privAudioBuffer = [];
                    this.privMediaSource = new MediaSource();
                    this.privAudio.src = URL.createObjectURL(this.privMediaSource);
                    this.privAudio.load();
                    this.privMediaSource.onsourceopen = function () {
                        _this.privMediaSourceOpened = true;
                        _this.privMediaSource.duration = MediaDurationPlaceholderSeconds;
                        _this.privSourceBuffer = _this.privMediaSource.addSourceBuffer(mimeType_1);
                        _this.privSourceBuffer.onupdate = function () {
                            _this.updateSourceBuffer().catch(function (reason) {
                                Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
                            });
                        };
                        _this.privSourceBuffer.onupdateend = function () {
                            _this.handleSourceBufferUpdateEnd().catch(function (reason) {
                                Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
                            });
                        };
                        _this.privSourceBuffer.onupdatestart = function () {
                            _this.privAppendingToBuffer = false;
                        };
                    };
                    this.updateSourceBuffer().catch(function (reason) {
                        Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
                    });
                }
                else {
                    // eslint-disable-next-line no-console
                    console.warn("Format " + AudioStreamFormat_1.AudioFormatTag[this.privFormat.formatTag] + " could not be played by MSE, streaming playback is not enabled.");
                    this.privAudioOutputStream = new AudioOutputStream_1.PullAudioOutputStreamImpl();
                    this.privAudioOutputStream.format = this.privFormat;
                    this.privAudio = new Audio();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerAudioDestination.prototype, "volume", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.privAudio) === null || _a === void 0 ? void 0 : _a.volume) !== null && _b !== void 0 ? _b : -1;
        },
        set: function (volume) {
            if (!!this.privAudio) {
                this.privAudio.volume = volume;
            }
        },
        enumerable: false,
        configurable: true
    });
    SpeakerAudioDestination.prototype.mute = function () {
        if (!!this.privAudio) {
            this.privAudio.muted = true;
        }
    };
    SpeakerAudioDestination.prototype.unmute = function () {
        if (!!this.privAudio) {
            this.privAudio.muted = false;
        }
    };
    Object.defineProperty(SpeakerAudioDestination.prototype, "isClosed", {
        get: function () {
            return this.privIsClosed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerAudioDestination.prototype, "currentTime", {
        get: function () {
            if (this.privAudio !== undefined) {
                return this.privAudio.currentTime;
            }
            return -1;
        },
        enumerable: false,
        configurable: true
    });
    SpeakerAudioDestination.prototype.pause = function () {
        if (!this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.pause();
            this.privIsPaused = true;
        }
    };
    SpeakerAudioDestination.prototype.resume = function (cb, err) {
        if (this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.play().then(function () {
                if (!!cb) {
                    cb();
                }
            }, function (error) {
                if (!!err) {
                    err(error);
                }
            });
            this.privIsPaused = false;
        }
    };
    Object.defineProperty(SpeakerAudioDestination.prototype, "internalAudio", {
        get: function () {
            return this.privAudio;
        },
        enumerable: false,
        configurable: true
    });
    SpeakerAudioDestination.prototype.updateSourceBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var binary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.privAudioBuffer !== undefined && (this.privAudioBuffer.length > 0) && this.sourceBufferAvailable())) return [3 /*break*/, 2];
                        this.privAppendingToBuffer = true;
                        binary = this.privAudioBuffer.shift();
                        try {
                            this.privSourceBuffer.appendBuffer(binary);
                        }
                        catch (error) {
                            this.privAudioBuffer.unshift(binary);
                            // eslint-disable-next-line no-console
                            console.log("buffer filled, pausing addition of binaries until space is made");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.notifyPlayback()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!this.canEndStream()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.handleSourceBufferUpdateEnd()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SpeakerAudioDestination.prototype.handleSourceBufferUpdateEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.canEndStream() && this.sourceBufferAvailable())) return [3 /*break*/, 2];
                        this.privMediaSource.endOfStream();
                        return [4 /*yield*/, this.notifyPlayback()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SpeakerAudioDestination.prototype.notifyPlayback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.privPlaybackStarted && this.privAudio !== undefined)) return [3 /*break*/, 2];
                        this.privPlaybackStarted = true;
                        if (!!this.onAudioStart) {
                            this.onAudioStart(this);
                        }
                        this.privAudio.onended = function () {
                            if (!!_this.onAudioEnd) {
                                _this.onAudioEnd(_this);
                            }
                        };
                        if (!!this.privIsPaused) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privAudio.play()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SpeakerAudioDestination.prototype.canEndStream = function () {
        return (this.isClosed && this.privSourceBuffer !== undefined && (this.privAudioBuffer.length === 0)
            && this.privMediaSourceOpened && !this.privAppendingToBuffer && this.privMediaSource.readyState === "open");
    };
    SpeakerAudioDestination.prototype.sourceBufferAvailable = function () {
        return (this.privSourceBuffer !== undefined && !this.privSourceBuffer.updating);
    };
    return SpeakerAudioDestination;
}());
exports.SpeakerAudioDestination = SpeakerAudioDestination;

//# sourceMappingURL=SpeakerAudioDestination.js.map
