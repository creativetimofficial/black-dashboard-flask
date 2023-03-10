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
exports.SynthesisAdapterBase = void 0;
var Exports_1 = require("../common/Exports");
var Exports_2 = require("../sdk/Exports");
var Exports_3 = require("./Exports");
var SpeechConnectionMessage_Internal_1 = require("./SpeechConnectionMessage.Internal");
var SynthesisAdapterBase = /** @class */ (function () {
    function SynthesisAdapterBase(authentication, connectionFactory, synthesizerConfig, speechSynthesizer, audioDestination) {
        var _this = this;
        this.speakOverride = undefined;
        this.receiveMessageOverride = undefined;
        this.connectImplOverride = undefined;
        this.configConnectionOverride = undefined;
        // A promise for a configured connection.
        // Do not consume directly, call fetchConnection instead.
        this.privConnectionConfigurationPromise = undefined;
        if (!authentication) {
            throw new Exports_1.ArgumentNullError("authentication");
        }
        if (!connectionFactory) {
            throw new Exports_1.ArgumentNullError("connectionFactory");
        }
        if (!synthesizerConfig) {
            throw new Exports_1.ArgumentNullError("synthesizerConfig");
        }
        this.privAuthentication = authentication;
        this.privConnectionFactory = connectionFactory;
        this.privSynthesizerConfig = synthesizerConfig;
        this.privIsDisposed = false;
        this.privSpeechSynthesizer = speechSynthesizer;
        this.privSessionAudioDestination = audioDestination;
        this.privSynthesisTurn = new Exports_3.SynthesisTurn();
        this.privConnectionEvents = new Exports_1.EventSource();
        this.privServiceEvents = new Exports_1.EventSource();
        this.privSynthesisContext = new Exports_3.SynthesisContext(this.privSpeechSynthesizer);
        this.privAgentConfig = new Exports_3.AgentConfig();
        this.connectionEvents.attach(function (connectionEvent) {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                var connectionClosedEvent = connectionEvent;
                if (connectionClosedEvent.statusCode !== 1000) {
                    _this.cancelSynthesisLocal(Exports_2.CancellationReason.Error, connectionClosedEvent.statusCode === 1007 ? Exports_2.CancellationErrorCode.BadRequestParameters : Exports_2.CancellationErrorCode.ConnectionFailure, connectionClosedEvent.reason + " websocket error code: " + connectionClosedEvent.statusCode);
                }
            }
        });
    }
    Object.defineProperty(SynthesisAdapterBase.prototype, "synthesisContext", {
        get: function () {
            return this.privSynthesisContext;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisAdapterBase.prototype, "agentConfig", {
        get: function () {
            return this.privAgentConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisAdapterBase.prototype, "connectionEvents", {
        get: function () {
            return this.privConnectionEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisAdapterBase.prototype, "serviceEvents", {
        get: function () {
            return this.privServiceEvents;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisAdapterBase.prototype, "activityTemplate", {
        get: function () {
            return this.privActivityTemplate;
        },
        set: function (messagePayload) {
            this.privActivityTemplate = messagePayload;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SynthesisAdapterBase.prototype, "audioOutputFormat", {
        set: function (format) {
            this.privAudioOutputFormat = format;
            this.privSynthesisTurn.audioOutputFormat = format;
            if (this.privSessionAudioDestination !== undefined) {
                this.privSessionAudioDestination.format = format;
            }
            if (this.synthesisContext !== undefined) {
                this.synthesisContext.audioOutputFormat = format;
            }
        },
        enumerable: false,
        configurable: true
    });
    SynthesisAdapterBase.addHeader = function (audio, format) {
        if (!format.hasHeader) {
            return audio;
        }
        format.updateHeader(audio.byteLength);
        var tmp = new Uint8Array(audio.byteLength + format.header.byteLength);
        tmp.set(new Uint8Array(format.header), 0);
        tmp.set(new Uint8Array(audio), format.header.byteLength);
        return tmp.buffer;
    };
    SynthesisAdapterBase.prototype.isDisposed = function () {
        return this.privIsDisposed;
    };
    SynthesisAdapterBase.prototype.dispose = function (reason) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privIsDisposed = true;
                        if (this.privSessionAudioDestination !== undefined) {
                            this.privSessionAudioDestination.close();
                        }
                        if (!(this.privConnectionConfigurationPromise !== undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.privConnectionConfigurationPromise];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.dispose(reason)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SynthesisAdapterBase.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectImpl()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SynthesisAdapterBase.prototype.sendNetworkMessage = function (path, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var type, contentType, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = typeof payload === "string" ? Exports_1.MessageType.Text : Exports_1.MessageType.Binary;
                        contentType = typeof payload === "string" ? "application/json" : "";
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(type, path, this.privSynthesisTurn.requestId, contentType, payload))];
                }
            });
        });
    };
    SynthesisAdapterBase.prototype.Speak = function (text, isSSML, requestId, successCallback, errorCallBack, audioDestination) {
        return __awaiter(this, void 0, void 0, function () {
            var ssml, connection, synthesisStartEventArgs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isSSML) {
                            ssml = text;
                        }
                        else {
                            ssml = this.privSpeechSynthesizer.buildSsml(text);
                        }
                        if (this.speakOverride !== undefined) {
                            return [2 /*return*/, this.speakOverride(ssml, requestId, successCallback, errorCallBack)];
                        }
                        this.privSuccessCallback = successCallback;
                        this.privErrorCallback = errorCallBack;
                        this.privSynthesisTurn.startNewSynthesis(requestId, text, isSSML, audioDestination);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.connectImpl()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.fetchConnection()];
                    case 3:
                        connection = _a.sent();
                        return [4 /*yield*/, this.sendSynthesisContext(connection)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.sendSsmlMessage(connection, ssml, requestId)];
                    case 5:
                        _a.sent();
                        synthesisStartEventArgs = new Exports_2.SpeechSynthesisEventArgs(new Exports_2.SpeechSynthesisResult(requestId, Exports_2.ResultReason.SynthesizingAudioStarted));
                        if (!!this.privSpeechSynthesizer.synthesisStarted) {
                            this.privSpeechSynthesizer.synthesisStarted(this.privSpeechSynthesizer, synthesisStartEventArgs);
                        }
                        void this.receiveMessage();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.cancelSynthesisLocal(Exports_2.CancellationReason.Error, Exports_2.CancellationErrorCode.ConnectionFailure, e_1);
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Cancels synthesis.
    SynthesisAdapterBase.prototype.cancelSynthesis = function (requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_2.PropertyCollection();
        properties.setProperty(Exports_3.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[errorCode]);
        var result = new Exports_2.SpeechSynthesisResult(requestId, Exports_2.ResultReason.Canceled, undefined, error, properties);
        if (!!this.privSpeechSynthesizer.SynthesisCanceled) {
            var cancelEvent = new Exports_2.SpeechSynthesisEventArgs(result);
            try {
                this.privSpeechSynthesizer.SynthesisCanceled(this.privSpeechSynthesizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
        if (!!this.privSuccessCallback) {
            try {
                this.privSuccessCallback(result);
                /* eslint-disable no-empty */
            }
            catch (_b) { }
        }
    };
    // Cancels synthesis.
    SynthesisAdapterBase.prototype.cancelSynthesisLocal = function (cancellationReason, errorCode, error) {
        if (!!this.privSynthesisTurn.isSynthesizing) {
            this.privSynthesisTurn.onStopSynthesizing();
            this.cancelSynthesis(this.privSynthesisTurn.requestId, cancellationReason, errorCode, error);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    SynthesisAdapterBase.prototype.processTypeSpecificMessages = function (connectionMessage) {
        return true;
    };
    SynthesisAdapterBase.prototype.receiveMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, message, connectionMessage, _a, audioWithHeader, ev, metadataList, _i, metadataList_1, metadata, wordBoundaryEventArgs, bookmarkEventArgs, visemeEventArgs, result, audioBuffer, error_1, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.read()];
                    case 2:
                        message = _b.sent();
                        if (this.receiveMessageOverride !== undefined) {
                            return [2 /*return*/, this.receiveMessageOverride()];
                        }
                        if (this.privIsDisposed) {
                            // We're done.
                            return [2 /*return*/];
                        }
                        // indicates we are draining the queue and it came with no message;
                        if (!message) {
                            if (!this.privSynthesisTurn.isSynthesizing) {
                                return [2 /*return*/];
                            }
                            else {
                                return [2 /*return*/, this.receiveMessage()];
                            }
                        }
                        connectionMessage = SpeechConnectionMessage_Internal_1.SpeechConnectionMessage.fromConnectionMessage(message);
                        if (!(connectionMessage.requestId.toLowerCase() === this.privSynthesisTurn.requestId.toLowerCase())) return [3 /*break*/, 13];
                        _a = connectionMessage.path.toLowerCase();
                        switch (_a) {
                            case "turn.start": return [3 /*break*/, 3];
                            case "response": return [3 /*break*/, 4];
                            case "audio": return [3 /*break*/, 5];
                            case "audio.metadata": return [3 /*break*/, 6];
                            case "turn.end": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 12];
                    case 3:
                        this.privSynthesisTurn.onServiceTurnStartResponse();
                        return [3 /*break*/, 13];
                    case 4:
                        this.privSynthesisTurn.onServiceResponseMessage(connectionMessage.textBody);
                        return [3 /*break*/, 13];
                    case 5:
                        if (this.privSynthesisTurn.streamId.toLowerCase() === connectionMessage.streamId.toLowerCase()
                            && !!connectionMessage.binaryBody) {
                            this.privSynthesisTurn.onAudioChunkReceived(connectionMessage.binaryBody);
                            if (!!this.privSpeechSynthesizer.synthesizing) {
                                try {
                                    audioWithHeader = SynthesisAdapterBase.addHeader(connectionMessage.binaryBody, this.privSynthesisTurn.audioOutputFormat);
                                    ev = new Exports_2.SpeechSynthesisEventArgs(new Exports_2.SpeechSynthesisResult(this.privSynthesisTurn.requestId, Exports_2.ResultReason.SynthesizingAudio, audioWithHeader));
                                    this.privSpeechSynthesizer.synthesizing(this.privSpeechSynthesizer, ev);
                                }
                                catch (error) {
                                    // Not going to let errors in the event handler
                                    // trip things up.
                                }
                            }
                            if (this.privSessionAudioDestination !== undefined) {
                                this.privSessionAudioDestination.write(connectionMessage.binaryBody);
                            }
                        }
                        return [3 /*break*/, 13];
                    case 6:
                        metadataList = Exports_3.SynthesisAudioMetadata.fromJSON(connectionMessage.textBody).Metadata;
                        for (_i = 0, metadataList_1 = metadataList; _i < metadataList_1.length; _i++) {
                            metadata = metadataList_1[_i];
                            switch (metadata.Type) {
                                case Exports_3.MetadataType.WordBoundary:
                                case Exports_3.MetadataType.SentenceBoundary:
                                    this.privSynthesisTurn.onTextBoundaryEvent(metadata);
                                    wordBoundaryEventArgs = new Exports_2.SpeechSynthesisWordBoundaryEventArgs(metadata.Data.Offset, metadata.Data.Duration, metadata.Data.text.Text, metadata.Data.text.Length, metadata.Type === Exports_3.MetadataType.WordBoundary
                                        ? this.privSynthesisTurn.currentTextOffset : this.privSynthesisTurn.currentSentenceOffset, metadata.Data.text.BoundaryType);
                                    if (!!this.privSpeechSynthesizer.wordBoundary) {
                                        try {
                                            this.privSpeechSynthesizer.wordBoundary(this.privSpeechSynthesizer, wordBoundaryEventArgs);
                                        }
                                        catch (error) {
                                            // Not going to let errors in the event handler
                                            // trip things up.
                                        }
                                    }
                                    break;
                                case Exports_3.MetadataType.Bookmark:
                                    bookmarkEventArgs = new Exports_2.SpeechSynthesisBookmarkEventArgs(metadata.Data.Offset, metadata.Data.Bookmark);
                                    if (!!this.privSpeechSynthesizer.bookmarkReached) {
                                        try {
                                            this.privSpeechSynthesizer.bookmarkReached(this.privSpeechSynthesizer, bookmarkEventArgs);
                                        }
                                        catch (error) {
                                            // Not going to let errors in the event handler
                                            // trip things up.
                                        }
                                    }
                                    break;
                                case Exports_3.MetadataType.Viseme:
                                    this.privSynthesisTurn.onVisemeMetadataReceived(metadata);
                                    if (metadata.Data.IsLastAnimation) {
                                        visemeEventArgs = new Exports_2.SpeechSynthesisVisemeEventArgs(metadata.Data.Offset, metadata.Data.VisemeId, this.privSynthesisTurn.getAndClearVisemeAnimation());
                                        if (!!this.privSpeechSynthesizer.visemeReceived) {
                                            try {
                                                this.privSpeechSynthesizer.visemeReceived(this.privSpeechSynthesizer, visemeEventArgs);
                                            }
                                            catch (error) {
                                                // Not going to let errors in the event handler
                                                // trip things up.
                                            }
                                        }
                                    }
                                    break;
                                case Exports_3.MetadataType.SessionEnd:
                                    this.privSynthesisTurn.onSessionEnd(metadata);
                                    break;
                            }
                        }
                        return [3 /*break*/, 13];
                    case 7:
                        this.privSynthesisTurn.onServiceTurnEndResponse();
                        result = void 0;
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, this.privSynthesisTurn.getAllReceivedAudioWithHeader()];
                    case 9:
                        audioBuffer = _b.sent();
                        result = new Exports_2.SpeechSynthesisResult(this.privSynthesisTurn.requestId, Exports_2.ResultReason.SynthesizingAudioCompleted, audioBuffer, undefined, undefined, this.privSynthesisTurn.audioDuration);
                        if (!!this.privSuccessCallback) {
                            this.privSuccessCallback(result);
                        }
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        if (!!this.privErrorCallback) {
                            this.privErrorCallback(error_1);
                        }
                        return [3 /*break*/, 11];
                    case 11:
                        if (this.privSpeechSynthesizer.synthesisCompleted) {
                            try {
                                this.privSpeechSynthesizer.synthesisCompleted(this.privSpeechSynthesizer, new Exports_2.SpeechSynthesisEventArgs(result));
                            }
                            catch (e) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        if (!this.processTypeSpecificMessages(connectionMessage)) {
                            // here are some messages that the derived class has not processed, dispatch them to connect class
                            if (!!this.privServiceEvents) {
                                this.serviceEvents.onEvent(new Exports_1.ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                            }
                        }
                        _b.label = 13;
                    case 13: return [2 /*return*/, this.receiveMessage()];
                    case 14:
                        e_2 = _b.sent();
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    SynthesisAdapterBase.prototype.sendSynthesisContext = function (connection) {
        var synthesisContextJson = this.synthesisContext.toJSON();
        if (synthesisContextJson) {
            return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_1.MessageType.Text, "synthesis.context", this.privSynthesisTurn.requestId, "application/json", synthesisContextJson));
        }
        return;
    };
    SynthesisAdapterBase.prototype.connectImpl = function (isUnAuthorized) {
        var _this = this;
        if (isUnAuthorized === void 0) { isUnAuthorized = false; }
        if (this.privConnectionPromise != null) {
            return this.privConnectionPromise.then(function (connection) {
                if (connection.state() === Exports_1.ConnectionState.Disconnected) {
                    _this.privConnectionId = null;
                    _this.privConnectionPromise = null;
                    return _this.connectImpl();
                }
                return _this.privConnectionPromise;
            }, function () {
                _this.privConnectionId = null;
                _this.privConnectionPromise = null;
                return _this.connectImpl();
            });
        }
        this.privAuthFetchEventId = Exports_1.createNoDashGuid();
        this.privConnectionId = Exports_1.createNoDashGuid();
        this.privSynthesisTurn.onPreConnectionStart(this.privAuthFetchEventId);
        var authPromise = isUnAuthorized ? this.privAuthentication.fetchOnExpiry(this.privAuthFetchEventId) : this.privAuthentication.fetch(this.privAuthFetchEventId);
        this.privConnectionPromise = authPromise.then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var connection, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privSynthesisTurn.onAuthCompleted(false);
                        connection = this.privConnectionFactory.create(this.privSynthesizerConfig, result, this.privConnectionId);
                        // Attach to the underlying event. No need to hold onto the detach pointers as in the event the connection goes away,
                        // it'll stop sending events.
                        connection.events.attach(function (event) {
                            _this.connectionEvents.onEvent(event);
                        });
                        return [4 /*yield*/, connection.open()];
                    case 1:
                        response = _a.sent();
                        if (response.statusCode === 200) {
                            this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                            return [2 /*return*/, Promise.resolve(connection)];
                        }
                        else if (response.statusCode === 403 && !isUnAuthorized) {
                            return [2 /*return*/, this.connectImpl(true)];
                        }
                        else {
                            this.privSynthesisTurn.onConnectionEstablishCompleted(response.statusCode);
                            return [2 /*return*/, Promise.reject("Unable to contact server. StatusCode: " + response.statusCode + ", " + this.privSynthesizerConfig.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint) + " Reason: " + response.reason)];
                        }
                        return [2 /*return*/];
                }
            });
        }); }, function (error) {
            _this.privSynthesisTurn.onAuthCompleted(true);
            throw new Error(error);
        });
        // Attach an empty handler to allow the promise to run in the background while
        // other startup events happen. It'll eventually be awaited on.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.privConnectionPromise.catch(function () { });
        return this.privConnectionPromise;
    };
    SynthesisAdapterBase.prototype.sendSpeechServiceConfig = function (connection, SpeechServiceConfigJson) {
        if (SpeechServiceConfigJson) {
            return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_1.MessageType.Text, "speech.config", this.privSynthesisTurn.requestId, "application/json", SpeechServiceConfigJson));
        }
    };
    SynthesisAdapterBase.prototype.sendSsmlMessage = function (connection, ssml, requestId) {
        return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_1.MessageType.Text, "ssml", requestId, "application/ssml+xml", ssml));
    };
    SynthesisAdapterBase.prototype.fetchConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privConnectionConfigurationPromise !== undefined) {
                            return [2 /*return*/, this.privConnectionConfigurationPromise.then(function (connection) {
                                    if (connection.state() === Exports_1.ConnectionState.Disconnected) {
                                        _this.privConnectionId = null;
                                        _this.privConnectionConfigurationPromise = undefined;
                                        return _this.fetchConnection();
                                    }
                                    return _this.privConnectionConfigurationPromise;
                                }, function () {
                                    _this.privConnectionId = null;
                                    _this.privConnectionConfigurationPromise = undefined;
                                    return _this.fetchConnection();
                                })];
                        }
                        this.privConnectionConfigurationPromise = this.configureConnection();
                        return [4 /*yield*/, this.privConnectionConfigurationPromise];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    SynthesisAdapterBase.prototype.configureConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connectImpl()];
                    case 1:
                        connection = _a.sent();
                        if (this.configConnectionOverride !== undefined) {
                            return [2 /*return*/, this.configConnectionOverride(connection)];
                        }
                        return [4 /*yield*/, this.sendSpeechServiceConfig(connection, this.privSynthesizerConfig.SpeechServiceConfig.serialize())];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    SynthesisAdapterBase.telemetryDataEnabled = true;
    return SynthesisAdapterBase;
}());
exports.SynthesisAdapterBase = SynthesisAdapterBase;

//# sourceMappingURL=SynthesisAdapterBase.js.map
