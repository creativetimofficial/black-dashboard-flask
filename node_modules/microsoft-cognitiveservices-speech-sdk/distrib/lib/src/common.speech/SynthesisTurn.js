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
exports.SynthesisTurn = void 0;
var Exports_1 = require("../common/Exports");
var AudioOutputStream_1 = require("../sdk/Audio/AudioOutputStream");
var SynthesisAudioMetadata_1 = require("./ServiceMessages/SynthesisAudioMetadata");
var SynthesisAdapterBase_1 = require("./SynthesisAdapterBase");
var SynthesisEvents_1 = require("./SynthesisEvents");
var SynthesisTurn = /** @class */ (function () {
    function SynthesisTurn() {
        this.privIsDisposed = false;
        this.privIsSynthesizing = false;
        this.privIsSynthesisEnded = false;
        this.privBytesReceived = 0;
        this.privInTurn = false;
        this.privTextOffset = 0;
        this.privNextSearchTextIndex = 0;
        this.privSentenceOffset = 0;
        this.privNextSearchSentenceIndex = 0;
        this.privRequestId = Exports_1.createNoDashGuid();
        this.privTurnDeferral = new Exports_1.Deferred();
        // We're not in a turn, so resolve.
        this.privTurnDeferral.resolve();
    }
    Object.defineProperty(SynthesisTurn.prototype, "requestId", {
        get: function () {
            return this.privRequestId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "streamId", {
        get: function () {
            return this.privStreamId;
        },
        set: function (value) {
            this.privStreamId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "audioOutputFormat", {
        get: function () {
            return this.privAudioOutputFormat;
        },
        set: function (format) {
            this.privAudioOutputFormat = format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "turnCompletionPromise", {
        get: function () {
            return this.privTurnDeferral.promise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "isSynthesisEnded", {
        get: function () {
            return this.privIsSynthesisEnded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "isSynthesizing", {
        get: function () {
            return this.privIsSynthesizing;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "currentTextOffset", {
        get: function () {
            return this.privTextOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "currentSentenceOffset", {
        get: function () {
            return this.privSentenceOffset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "bytesReceived", {
        // The number of bytes received for current turn
        get: function () {
            return this.privBytesReceived;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisTurn.prototype, "audioDuration", {
        get: function () {
            return this.privAudioDuration;
        },
        enumerable: false,
        configurable: true
    });
    SynthesisTurn.prototype.getAllReceivedAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.privReceivedAudio) {
                            return [2 /*return*/, Promise.resolve(this.privReceivedAudio)];
                        }
                        if (!this.privIsSynthesisEnded) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.readAllAudioFromStream()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(this.privReceivedAudio)];
                }
            });
        });
    };
    SynthesisTurn.prototype.getAllReceivedAudioWithHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var audio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.privReceivedAudioWithHeader) {
                            return [2 /*return*/, this.privReceivedAudioWithHeader];
                        }
                        if (!this.privIsSynthesisEnded) {
                            return [2 /*return*/, null];
                        }
                        if (!this.audioOutputFormat.hasHeader) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAllReceivedAudio()];
                    case 1:
                        audio = _a.sent();
                        this.privReceivedAudioWithHeader = SynthesisAdapterBase_1.SynthesisAdapterBase.addHeader(audio, this.audioOutputFormat);
                        return [2 /*return*/, this.privReceivedAudioWithHeader];
                    case 2: return [2 /*return*/, this.getAllReceivedAudio()];
                }
            });
        });
    };
    SynthesisTurn.prototype.startNewSynthesis = function (requestId, rawText, isSSML, audioDestination) {
        this.privIsSynthesisEnded = false;
        this.privIsSynthesizing = true;
        this.privRequestId = requestId;
        this.privRawText = rawText;
        this.privIsSSML = isSSML;
        this.privAudioOutputStream = new AudioOutputStream_1.PullAudioOutputStreamImpl();
        this.privAudioOutputStream.format = this.privAudioOutputFormat;
        this.privReceivedAudio = null;
        this.privReceivedAudioWithHeader = null;
        this.privBytesReceived = 0;
        this.privTextOffset = 0;
        this.privNextSearchTextIndex = 0;
        this.privSentenceOffset = 0;
        this.privNextSearchSentenceIndex = 0;
        this.privPartialVisemeAnimation = "";
        if (audioDestination !== undefined) {
            this.privTurnAudioDestination = audioDestination;
            this.privTurnAudioDestination.format = this.privAudioOutputFormat;
        }
        this.onEvent(new SynthesisEvents_1.SynthesisTriggeredEvent(this.requestId, undefined, audioDestination === undefined ? undefined : audioDestination.id()));
    };
    SynthesisTurn.prototype.onPreConnectionStart = function (authFetchEventId) {
        this.privAuthFetchEventId = authFetchEventId;
        this.onEvent(new SynthesisEvents_1.ConnectingToSynthesisServiceEvent(this.privRequestId, this.privAuthFetchEventId));
    };
    SynthesisTurn.prototype.onAuthCompleted = function (isError) {
        if (isError) {
            this.onComplete();
        }
    };
    SynthesisTurn.prototype.onConnectionEstablishCompleted = function (statusCode) {
        if (statusCode === 200) {
            this.onEvent(new SynthesisEvents_1.SynthesisStartedEvent(this.requestId, this.privAuthFetchEventId));
            this.privBytesReceived = 0;
            return;
        }
        else if (statusCode === 403) {
            this.onComplete();
        }
    };
    SynthesisTurn.prototype.onServiceResponseMessage = function (responseJson) {
        var response = JSON.parse(responseJson);
        this.streamId = response.audio.streamId;
    };
    SynthesisTurn.prototype.onServiceTurnEndResponse = function () {
        this.privInTurn = false;
        this.privTurnDeferral.resolve();
        this.onComplete();
    };
    SynthesisTurn.prototype.onServiceTurnStartResponse = function () {
        if (!!this.privTurnDeferral && !!this.privInTurn) {
            // What? How are we starting a turn with another not done?
            this.privTurnDeferral.reject("Another turn started before current completed.");
            // Avoid UnhandledPromiseRejection if privTurnDeferral is not being awaited
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.privTurnDeferral.promise.then().catch(function () { });
        }
        this.privInTurn = true;
        this.privTurnDeferral = new Exports_1.Deferred();
    };
    SynthesisTurn.prototype.onAudioChunkReceived = function (data) {
        if (this.isSynthesizing) {
            this.privAudioOutputStream.write(data);
            this.privBytesReceived += data.byteLength;
            if (this.privTurnAudioDestination !== undefined) {
                this.privTurnAudioDestination.write(data);
            }
        }
    };
    SynthesisTurn.prototype.onTextBoundaryEvent = function (metadata) {
        this.updateTextOffset(metadata.Data.text.Text, metadata.Type);
    };
    SynthesisTurn.prototype.onVisemeMetadataReceived = function (metadata) {
        if (metadata.Data.AnimationChunk !== undefined) {
            this.privPartialVisemeAnimation += metadata.Data.AnimationChunk;
        }
    };
    SynthesisTurn.prototype.onSessionEnd = function (metadata) {
        this.privAudioDuration = metadata.Data.Offset;
    };
    SynthesisTurn.prototype.dispose = function () {
        if (!this.privIsDisposed) {
            // we should have completed by now. If we did not its an unknown error.
            this.privIsDisposed = true;
        }
    };
    SynthesisTurn.prototype.onStopSynthesizing = function () {
        this.onComplete();
    };
    /**
     * Gets the viseme animation string (merged from animation chunk), and clears the internal
     * partial animation.
     */
    SynthesisTurn.prototype.getAndClearVisemeAnimation = function () {
        var animation = this.privPartialVisemeAnimation;
        this.privPartialVisemeAnimation = "";
        return animation;
    };
    SynthesisTurn.prototype.onEvent = function (event) {
        Exports_1.Events.instance.onEvent(event);
    };
    /**
     * Check if the text is an XML(SSML) tag
     * @param text
     * @private
     */
    SynthesisTurn.isXmlTag = function (text) {
        return text.length >= 2 && text[0] === "<" && text[text.length - 1] === ">";
    };
    SynthesisTurn.prototype.updateTextOffset = function (text, type) {
        if (type === SynthesisAudioMetadata_1.MetadataType.WordBoundary) {
            this.privTextOffset = this.privRawText.indexOf(text, this.privNextSearchTextIndex);
            if (this.privTextOffset >= 0) {
                this.privNextSearchTextIndex = this.privTextOffset + text.length;
                if (this.privIsSSML) {
                    if (this.withinXmlTag(this.privTextOffset) && !SynthesisTurn.isXmlTag(text)) {
                        this.updateTextOffset(text, type);
                    }
                }
            }
        }
        else {
            this.privSentenceOffset = this.privRawText.indexOf(text, this.privNextSearchSentenceIndex);
            if (this.privSentenceOffset >= 0) {
                this.privNextSearchSentenceIndex = this.privSentenceOffset + text.length;
                if (this.privIsSSML) {
                    if (this.withinXmlTag(this.privSentenceOffset) && !SynthesisTurn.isXmlTag(text)) {
                        this.updateTextOffset(text, type);
                    }
                }
            }
        }
    };
    SynthesisTurn.prototype.onComplete = function () {
        if (this.privIsSynthesizing) {
            this.privIsSynthesizing = false;
            this.privIsSynthesisEnded = true;
            this.privAudioOutputStream.close();
            this.privInTurn = false;
            if (this.privTurnAudioDestination !== undefined) {
                this.privTurnAudioDestination.close();
                this.privTurnAudioDestination = undefined;
            }
        }
    };
    SynthesisTurn.prototype.readAllAudioFromStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.privIsSynthesisEnded) return [3 /*break*/, 4];
                        this.privReceivedAudio = new ArrayBuffer(this.bytesReceived);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.privAudioOutputStream.read(this.privReceivedAudio)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.privReceivedAudio = new ArrayBuffer(0);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if current idx is in XML(SSML) tag
     * @param idx
     * @private
     */
    SynthesisTurn.prototype.withinXmlTag = function (idx) {
        return this.privRawText.indexOf("<", idx + 1) > this.privRawText.indexOf(">", idx + 1);
    };
    return SynthesisTurn;
}());
exports.SynthesisTurn = SynthesisTurn;

//# sourceMappingURL=SynthesisTurn.js.map
