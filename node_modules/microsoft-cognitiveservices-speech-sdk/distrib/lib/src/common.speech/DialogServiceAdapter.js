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
exports.DialogServiceAdapter = void 0;
var Exports_1 = require("../common.browser/Exports");
var DialogEvents_1 = require("../common/DialogEvents");
var Exports_2 = require("../common/Exports");
var AudioOutputFormat_1 = require("../sdk/Audio/AudioOutputFormat");
var Exports_3 = require("../sdk/Exports");
var DialogServiceTurnStateManager_1 = require("./DialogServiceTurnStateManager");
var Exports_4 = require("./Exports");
var ActivityResponsePayload_1 = require("./ServiceMessages/ActivityResponsePayload");
var SpeechConnectionMessage_Internal_1 = require("./SpeechConnectionMessage.Internal");
var DialogServiceAdapter = /** @class */ (function (_super) {
    __extends(DialogServiceAdapter, _super);
    function DialogServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, dialogServiceConnector) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, dialogServiceConnector) || this;
        _this.privEvents = new Exports_2.EventSource();
        _this.privDialogServiceConnector = dialogServiceConnector;
        _this.receiveMessageOverride = function () { return _this.receiveDialogMessageOverride(); };
        _this.privTurnStateManager = new DialogServiceTurnStateManager_1.DialogServiceTurnStateManager();
        _this.recognizeOverride =
            function (recoMode, successCallback, errorCallback) {
                return _this.listenOnce(recoMode, successCallback, errorCallback);
            };
        _this.postConnectImplOverride = function (connection) { return _this.dialogConnectImpl(connection); };
        _this.configConnectionOverride = function (connection) { return _this.configConnection(connection); };
        _this.disconnectOverride = function () { return _this.privDisconnect(); };
        _this.privDialogAudioSource = audioSource;
        _this.agentConfigSent = false;
        _this.privLastResult = null;
        _this.connectionEvents.attach(function (connectionEvent) {
            if (connectionEvent.name === "ConnectionClosedEvent") {
                _this.terminateMessageLoop = true;
            }
        });
        return _this;
    }
    DialogServiceAdapter.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var interactionGuid, requestId, agentMessage, agentMessageJson, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        interactionGuid = Exports_2.createGuid();
                        requestId = Exports_2.createNoDashGuid();
                        agentMessage = {
                            context: {
                                interactionId: interactionGuid
                            },
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            messagePayload: JSON.parse(message),
                            version: 0.5
                        };
                        agentMessageJson = JSON.stringify(agentMessage);
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "agent", requestId, "application/json", agentMessageJson))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogServiceAdapter.prototype.privDisconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.NoError, "Disconnecting")];
                    case 1:
                        _a.sent();
                        this.terminateMessageLoop = true;
                        this.agentConfigSent = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogServiceAdapter.prototype.processTypeSpecificMessages = function (connectionMessage) {
        var resultProps = new Exports_3.PropertyCollection();
        if (connectionMessage.messageType === Exports_2.MessageType.Text) {
            resultProps.setProperty(Exports_3.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        var result;
        var processed;
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.phrase":
                var speechPhrase = Exports_4.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);
                this.privRequestSession.onPhraseRecognized(this.privRequestSession.currentTurnAudioOffset + speechPhrase.Offset + speechPhrase.Duration);
                if (speechPhrase.RecognitionStatus !== Exports_4.RecognitionStatus.TooManyRequests && speechPhrase.RecognitionStatus !== Exports_4.RecognitionStatus.Error) {
                    var args = this.fireEventForResult(speechPhrase, resultProps);
                    this.privLastResult = args.result;
                    if (!!this.privDialogServiceConnector.recognized) {
                        try {
                            this.privDialogServiceConnector.recognized(this.privDialogServiceConnector, args);
                            /* eslint-disable no-empty */
                        }
                        catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }
                }
                processed = true;
                break;
            case "speech.hypothesis":
                var hypothesis = Exports_4.SpeechHypothesis.fromJSON(connectionMessage.textBody);
                var offset = hypothesis.Offset + this.privRequestSession.currentTurnAudioOffset;
                result = new Exports_3.SpeechRecognitionResult(this.privRequestSession.requestId, Exports_3.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, undefined, undefined, connectionMessage.textBody, resultProps);
                this.privRequestSession.onHypothesis(offset);
                var ev = new Exports_3.SpeechRecognitionEventArgs(result, hypothesis.Duration, this.privRequestSession.sessionId);
                if (!!this.privDialogServiceConnector.recognizing) {
                    try {
                        this.privDialogServiceConnector.recognizing(this.privDialogServiceConnector, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "speech.keyword":
                var keyword = Exports_4.SpeechKeyword.fromJSON(connectionMessage.textBody);
                result = new Exports_3.SpeechRecognitionResult(this.privRequestSession.requestId, keyword.Status === "Accepted" ? Exports_3.ResultReason.RecognizedKeyword : Exports_3.ResultReason.NoMatch, keyword.Text, keyword.Duration, keyword.Offset, undefined, undefined, undefined, undefined, connectionMessage.textBody, resultProps);
                if (keyword.Status !== "Accepted") {
                    this.privLastResult = result;
                }
                var event_1 = new Exports_3.SpeechRecognitionEventArgs(result, result.duration, result.resultId);
                if (!!this.privDialogServiceConnector.recognized) {
                    try {
                        this.privDialogServiceConnector.recognized(this.privDialogServiceConnector, event_1);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "audio":
                {
                    var audioRequestId = connectionMessage.requestId.toUpperCase();
                    var turn = this.privTurnStateManager.GetTurn(audioRequestId);
                    try {
                        // Empty binary message signals end of stream.
                        if (!connectionMessage.binaryBody) {
                            turn.endAudioStream();
                        }
                        else {
                            turn.audioStream.write(connectionMessage.binaryBody);
                        }
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "response":
                {
                    this.handleResponseMessage(connectionMessage);
                }
                processed = true;
                break;
            default:
                break;
        }
        var defferal = new Exports_2.Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    };
    // Cancels recognition.
    DialogServiceAdapter.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        return __awaiter(this, void 0, void 0, function () {
            var properties, cancelEvent, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.terminateMessageLoop = true;
                        if (!!!this.privRequestSession.isRecognizing) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privRequestSession.onStopRecognizing()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!this.privDialogServiceConnector.canceled) {
                            properties = new Exports_3.PropertyCollection();
                            properties.setProperty(Exports_4.CancellationErrorCodePropertyName, Exports_3.CancellationErrorCode[errorCode]);
                            cancelEvent = new Exports_3.SpeechRecognitionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
                            try {
                                this.privDialogServiceConnector.canceled(this.privDialogServiceConnector, cancelEvent);
                                /* eslint-disable no-empty */
                            }
                            catch (_b) { }
                            if (!!this.privSuccessCallback) {
                                result = new Exports_3.SpeechRecognitionResult(undefined, // ResultId
                                Exports_3.ResultReason.Canceled, undefined, // Text
                                undefined, // Duration
                                undefined, // Offset
                                undefined, // Language
                                undefined, // Language Detection Confidence
                                undefined, // Speaker Id
                                error, undefined, // Json
                                properties);
                                try {
                                    this.privSuccessCallback(result);
                                    this.privSuccessCallback = undefined;
                                    /* eslint-disable no-empty */
                                }
                                catch (_c) { }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogServiceAdapter.prototype.listenOnce = function (recoMode, successCallback, errorCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var conPromise, preAudioPromise, node, format, deviceInfo, audioNode, error_1, sessionStartEventArgs, audioSendPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privRecognizerConfig.recognitionMode = recoMode;
                        this.privSuccessCallback = successCallback;
                        this.privErrorCallback = errorCallback;
                        this.privRequestSession.startNewRecognition();
                        this.privRequestSession.listenForServiceTelemetry(this.privDialogAudioSource.events);
                        this.privRecognizerConfig.parameters.setProperty(Exports_3.PropertyId.Speech_SessionId, this.privRequestSession.sessionId);
                        conPromise = this.connectImpl();
                        preAudioPromise = this.sendPreAudioMessages();
                        return [4 /*yield*/, this.privDialogAudioSource.attach(this.privRequestSession.audioNodeId)];
                    case 1:
                        node = _a.sent();
                        return [4 /*yield*/, this.privDialogAudioSource.format];
                    case 2:
                        format = _a.sent();
                        return [4 /*yield*/, this.privDialogAudioSource.deviceInfo];
                    case 3:
                        deviceInfo = _a.sent();
                        audioNode = new Exports_1.ReplayableAudioNode(node, format.avgBytesPerSec);
                        return [4 /*yield*/, this.privRequestSession.onAudioSourceAttachCompleted(audioNode, false)];
                    case 4:
                        _a.sent();
                        this.privRecognizerConfig.SpeechServiceConfig.Context.audio = { source: deviceInfo };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 10]);
                        return [4 /*yield*/, conPromise];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, preAudioPromise];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.ConnectionFailure, error_1)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                    case 10:
                        sessionStartEventArgs = new Exports_3.SessionEventArgs(this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.sessionStarted) {
                            this.privRecognizer.sessionStarted(this.privRecognizer, sessionStartEventArgs);
                        }
                        audioSendPromise = this.sendAudio(audioNode);
                        // /* eslint-disable no-empty */
                        audioSendPromise.then(function () { }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.RuntimeError, error)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    // Establishes a websocket connection to the end point.
    DialogServiceAdapter.prototype.dialogConnectImpl = function (connection) {
        this.privConnectionLoop = this.startMessageLoop();
        return connection;
    };
    DialogServiceAdapter.prototype.receiveDialogMessageOverride = function () {
        var _this = this;
        // we won't rely on the cascading promises of the connection since we want to continually be available to receive messages
        var communicationCustodian = new Exports_2.Deferred();
        var loop = function () { return __awaiter(_this, void 0, void 0, function () {
            var isDisposed, terminateMessageLoop, connection, message, connectionMessage, _a, turnRequestId, audioSessionReqId, speechStartDetected, speechStartEventArgs, json, speechStopDetected, speechStopEventArgs, turnEndRequestId, audioSessionReqId, sessionStopEventArgs, processed, e_1, ret, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        isDisposed = this.isDisposed();
                        terminateMessageLoop = (!this.isDisposed() && this.terminateMessageLoop);
                        if (isDisposed || terminateMessageLoop) {
                            // We're done.
                            communicationCustodian.resolve(undefined);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, connection.read()];
                    case 2:
                        message = _b.sent();
                        if (!message) {
                            return [2 /*return*/, loop()];
                        }
                        connectionMessage = SpeechConnectionMessage_Internal_1.SpeechConnectionMessage.fromConnectionMessage(message);
                        _a = connectionMessage.path.toLowerCase();
                        switch (_a) {
                            case "turn.start": return [3 /*break*/, 3];
                            case "speech.startdetected": return [3 /*break*/, 4];
                            case "speech.enddetected": return [3 /*break*/, 5];
                            case "turn.end": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        {
                            turnRequestId = connectionMessage.requestId.toUpperCase();
                            audioSessionReqId = this.privRequestSession.requestId.toUpperCase();
                            // turn started by the service
                            if (turnRequestId !== audioSessionReqId) {
                                this.privTurnStateManager.StartTurn(turnRequestId);
                            }
                            else {
                                this.privRequestSession.onServiceTurnStartResponse();
                            }
                        }
                        return [3 /*break*/, 13];
                    case 4:
                        speechStartDetected = Exports_4.SpeechDetected.fromJSON(connectionMessage.textBody);
                        speechStartEventArgs = new Exports_3.RecognitionEventArgs(speechStartDetected.Offset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechStartDetected) {
                            this.privRecognizer.speechStartDetected(this.privRecognizer, speechStartEventArgs);
                        }
                        return [3 /*break*/, 13];
                    case 5:
                        json = void 0;
                        if (connectionMessage.textBody.length > 0) {
                            json = connectionMessage.textBody;
                        }
                        else {
                            // If the request was empty, the JSON returned is empty.
                            json = "{ Offset: 0 }";
                        }
                        speechStopDetected = Exports_4.SpeechDetected.fromJSON(json);
                        this.privRequestSession.onServiceRecognized(speechStopDetected.Offset + this.privRequestSession.currentTurnAudioOffset);
                        speechStopEventArgs = new Exports_3.RecognitionEventArgs(speechStopDetected.Offset + this.privRequestSession.currentTurnAudioOffset, this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.speechEndDetected) {
                            this.privRecognizer.speechEndDetected(this.privRecognizer, speechStopEventArgs);
                        }
                        return [3 /*break*/, 13];
                    case 6:
                        turnEndRequestId = connectionMessage.requestId.toUpperCase();
                        audioSessionReqId = this.privRequestSession.requestId.toUpperCase();
                        if (!(turnEndRequestId !== audioSessionReqId)) return [3 /*break*/, 7];
                        this.privTurnStateManager.CompleteTurn(turnEndRequestId);
                        return [3 /*break*/, 9];
                    case 7:
                        sessionStopEventArgs = new Exports_3.SessionEventArgs(this.privRequestSession.sessionId);
                        return [4 /*yield*/, this.privRequestSession.onServiceTurnEndResponse(false)];
                    case 8:
                        _b.sent();
                        if (!this.privRecognizerConfig.isContinuousRecognition || this.privRequestSession.isSpeechEnded || !this.privRequestSession.isRecognizing) {
                            if (!!this.privRecognizer.sessionStopped) {
                                this.privRecognizer.sessionStopped(this.privRecognizer, sessionStopEventArgs);
                            }
                        }
                        // report result to promise.
                        if (!!this.privSuccessCallback && this.privLastResult) {
                            try {
                                this.privSuccessCallback(this.privLastResult);
                                this.privLastResult = null;
                            }
                            catch (e) {
                                if (!!this.privErrorCallback) {
                                    this.privErrorCallback(e);
                                }
                            }
                            // Only invoke the call back once.
                            // and if it's successful don't invoke the
                            // error after that.
                            this.privSuccessCallback = undefined;
                            this.privErrorCallback = undefined;
                        }
                        _b.label = 9;
                    case 9: return [3 /*break*/, 13];
                    case 10:
                        _b.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.processTypeSpecificMessages(connectionMessage)];
                    case 11:
                        processed = _b.sent();
                        if (!processed) {
                            if (!!this.serviceEvents) {
                                this.serviceEvents.onEvent(new Exports_2.ServiceEvent(connectionMessage.path.toLowerCase(), connectionMessage.textBody));
                            }
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        e_1 = _b.sent();
                        return [3 /*break*/, 13];
                    case 13:
                        ret = loop();
                        return [2 /*return*/, ret];
                    case 14:
                        error_2 = _b.sent();
                        this.terminateMessageLoop = true;
                        communicationCustodian.resolve();
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        loop().catch(function (reason) {
            Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
        });
        return communicationCustodian.promise;
    };
    DialogServiceAdapter.prototype.startMessageLoop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.terminateMessageLoop = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.receiveDialogMessageOverride()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_3 = _a.sent();
                        return [4 /*yield*/, this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.RuntimeError, error_3)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    // Takes an established websocket connection to the endpoint and sends speech configuration information.
    DialogServiceAdapter.prototype.configConnection = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.terminateMessageLoop) {
                            this.terminateMessageLoop = false;
                            return [2 /*return*/, Promise.reject("Connection to service terminated.")];
                        }
                        return [4 /*yield*/, this.sendSpeechServiceConfig(connection, this.privRequestSession, this.privRecognizerConfig.SpeechServiceConfig.serialize())];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sendAgentConfig(connection)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, connection];
                }
            });
        });
    };
    DialogServiceAdapter.prototype.sendPreAudioMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        this.addKeywordContextData();
                        return [4 /*yield*/, this.sendSpeechContext(connection, true)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendAgentContext(connection)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.sendWaveHeader(connection)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DialogServiceAdapter.prototype.sendAgentConfig = function (connection) {
        if (this.agentConfig && !this.agentConfigSent) {
            if (this.privRecognizerConfig
                .parameters
                .getProperty(Exports_3.PropertyId.Conversation_DialogType) === Exports_3.DialogServiceConfig.DialogTypes.CustomCommands) {
                var config = this.agentConfig.get();
                config.botInfo.commandsCulture = this.privRecognizerConfig.parameters.getProperty(Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage, "en-us");
                this.agentConfig.set(config);
            }
            this.onEvent(new DialogEvents_1.SendingAgentContextMessageEvent(this.agentConfig));
            var agentConfigJson = this.agentConfig.toJsonString();
            // guard against sending this multiple times on one connection
            this.agentConfigSent = true;
            return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "agent.config", this.privRequestSession.requestId, "application/json", agentConfigJson));
        }
        return;
    };
    DialogServiceAdapter.prototype.sendAgentContext = function (connection) {
        var guid = Exports_2.createGuid();
        var speechActivityTemplate = this.privDialogServiceConnector.properties.getProperty(Exports_3.PropertyId.Conversation_Speech_Activity_Template);
        var agentContext = {
            channelData: "",
            context: {
                interactionId: guid
            },
            messagePayload: typeof speechActivityTemplate === undefined ? undefined : speechActivityTemplate,
            version: 0.5
        };
        var agentContextJson = JSON.stringify(agentContext);
        return connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "speech.agent.context", this.privRequestSession.requestId, "application/json", agentContextJson));
    };
    DialogServiceAdapter.prototype.fireEventForResult = function (serviceResult, properties) {
        var resultReason = Exports_4.EnumTranslation.implTranslateRecognitionResult(serviceResult.RecognitionStatus);
        var offset = serviceResult.Offset + this.privRequestSession.currentTurnAudioOffset;
        var result = new Exports_3.SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, serviceResult.DisplayText, serviceResult.Duration, offset, serviceResult.Language, serviceResult.LanguageDetectionConfidence, undefined, undefined, JSON.stringify(serviceResult), properties);
        var ev = new Exports_3.SpeechRecognitionEventArgs(result, offset, this.privRequestSession.sessionId);
        return ev;
    };
    DialogServiceAdapter.prototype.handleResponseMessage = function (responseMessage) {
        // "response" messages can contain either "message" (activity) or "MessageStatus" data. Fire the appropriate
        // event according to the message type that's specified.
        var responsePayload = JSON.parse(responseMessage.textBody);
        switch (responsePayload.messageType.toLowerCase()) {
            case "message":
                var responseRequestId = responseMessage.requestId.toUpperCase();
                var activityPayload = ActivityResponsePayload_1.ActivityPayloadResponse.fromJSON(responseMessage.textBody);
                var turn = this.privTurnStateManager.GetTurn(responseRequestId);
                // update the conversation Id
                if (activityPayload.conversationId) {
                    var updateAgentConfig = this.agentConfig.get();
                    updateAgentConfig.botInfo.conversationId = activityPayload.conversationId;
                    this.agentConfig.set(updateAgentConfig);
                }
                var pullAudioOutputStream = turn.processActivityPayload(activityPayload, AudioOutputFormat_1.AudioOutputFormatImpl.fromSpeechSynthesisOutputFormatString(this.privDialogServiceConnector.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)));
                var activity = new Exports_3.ActivityReceivedEventArgs(activityPayload.messagePayload, pullAudioOutputStream);
                if (!!this.privDialogServiceConnector.activityReceived) {
                    try {
                        this.privDialogServiceConnector.activityReceived(this.privDialogServiceConnector, activity);
                        /* eslint-disable-next-line no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                break;
            case "messagestatus":
                if (!!this.privDialogServiceConnector.turnStatusReceived) {
                    try {
                        this.privDialogServiceConnector.turnStatusReceived(this.privDialogServiceConnector, new Exports_3.TurnStatusReceivedEventArgs(responseMessage.textBody));
                        /* eslint-disable-next-line no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                break;
            default:
                Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent("Unexpected response of type " + responsePayload.messageType + ". Ignoring."));
                break;
        }
    };
    DialogServiceAdapter.prototype.onEvent = function (event) {
        this.privEvents.onEvent(event);
        Exports_2.Events.instance.onEvent(event);
    };
    DialogServiceAdapter.prototype.addKeywordContextData = function () {
        var keywordPropertyValue = this.privRecognizerConfig.parameters.getProperty("SPEECH-KeywordsToDetect");
        if (keywordPropertyValue === undefined) {
            return;
        }
        var keywordOffsetPropertyValue = this.privRecognizerConfig.parameters
            .getProperty("SPEECH-KeywordsToDetect-Offsets");
        var keywordDurationPropertyValue = this.privRecognizerConfig.parameters
            .getProperty("SPEECH-KeywordsToDetect-Durations");
        var keywords = keywordPropertyValue.split(";");
        var keywordOffsets = keywordOffsetPropertyValue === undefined ? [] : keywordOffsetPropertyValue.split(";");
        var keywordDurations = keywordDurationPropertyValue === undefined ? [] : keywordDurationPropertyValue.split(";");
        var keywordDefinitionArray = [];
        for (var i = 0; i < keywords.length; i++) {
            var definition = {};
            definition.text = keywords[i];
            if (i < keywordOffsets.length) {
                definition.offset = Number(keywordOffsets[i]);
            }
            if (i < keywordDurations.length) {
                definition.duration = Number(keywordDurations[i]);
            }
            keywordDefinitionArray.push(definition);
        }
        this.speechContext.setSection("invocationSource", "VoiceActivationWithKeyword");
        this.speechContext.setSection("keywordDetection", [{
                clientDetectedKeywords: keywordDefinitionArray,
                onReject: { action: "EndOfTurn" },
                type: "startTrigger"
            }]);
    };
    return DialogServiceAdapter;
}(Exports_4.ServiceRecognizerBase));
exports.DialogServiceAdapter = DialogServiceAdapter;

//# sourceMappingURL=DialogServiceAdapter.js.map
