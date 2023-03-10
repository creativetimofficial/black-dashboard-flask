"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationImpl = exports.Conversation = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../../common.speech/Exports");
var Exports_2 = require("../../common/Exports");
var Contracts_1 = require("../Contracts");
var Exports_3 = require("../Exports");
var Conversation = /** @class */ (function () {
    function Conversation() {
        return;
    }
    /**
     * Create a conversation
     * @param speechConfig
     * @param cb
     * @param err
     */
    Conversation.createConversationAsync = function (speechConfig, arg2, arg3, arg4) {
        var _this = this;
        Contracts_1.Contracts.throwIfNullOrUndefined(speechConfig, Exports_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "config"));
        Contracts_1.Contracts.throwIfNullOrUndefined(speechConfig.region, Exports_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "SpeechServiceConnection_Region"));
        if (!speechConfig.subscriptionKey && !speechConfig.getProperty(Exports_3.PropertyId[Exports_3.PropertyId.SpeechServiceAuthorization_Token])) {
            Contracts_1.Contracts.throwIfNullOrUndefined(speechConfig.subscriptionKey, Exports_1.ConversationConnectionConfig.restErrors.invalidArgs.replace("{arg}", "SpeechServiceConnection_Key"));
        }
        var conversationImpl;
        var cb;
        var err;
        if (typeof arg2 === "string") {
            conversationImpl = new ConversationImpl(speechConfig, arg2);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            Exports_2.marshalPromiseToCallbacks((function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); })(), arg3, arg4);
        }
        else {
            conversationImpl = new ConversationImpl(speechConfig);
            cb = arg2;
            err = arg3;
            conversationImpl.createConversationAsync((function () {
                if (!!cb) {
                    cb();
                }
            }), function (error) {
                if (!!err) {
                    err(error);
                }
            });
        }
        return conversationImpl;
    };
    return Conversation;
}());
exports.Conversation = Conversation;
var ConversationImpl = /** @class */ (function (_super) {
    __extends(ConversationImpl, _super);
    /**
     * Create a conversation impl
     * @param speechConfig
     * @param {string} id - optional conversationId
     */
    function ConversationImpl(speechConfig, id) {
        var _this = _super.call(this) || this;
        _this.privErrors = Exports_1.ConversationConnectionConfig.restErrors;
        /** websocket callbacks */
        /* eslint-disable @typescript-eslint/typedef */
        _this.onConnected = function (e) {
            var _a;
            _this.privIsConnected = true;
            try {
                if (!!((_a = _this.privConversationTranslator) === null || _a === void 0 ? void 0 : _a.sessionStarted)) {
                    _this.privConversationTranslator.sessionStarted(_this.privConversationTranslator, e);
                }
            }
            catch (e) {
                //
            }
        };
        _this.onDisconnected = function (e) {
            var _a;
            try {
                if (!!((_a = _this.privConversationTranslator) === null || _a === void 0 ? void 0 : _a.sessionStopped)) {
                    _this.privConversationTranslator.sessionStopped(_this.privConversationTranslator, e);
                }
            }
            catch (e) {
                //
            }
            finally {
                void _this.close(false);
            }
        };
        _this.onCanceled = function (r, e) {
            var _a;
            try {
                if (!!((_a = _this.privConversationTranslator) === null || _a === void 0 ? void 0 : _a.canceled)) {
                    _this.privConversationTranslator.canceled(_this.privConversationTranslator, e);
                }
            }
            catch (e) {
                //
            }
        };
        _this.onParticipantUpdateCommandReceived = function (r, e) {
            try {
                var updatedParticipant = _this.privParticipants.getParticipant(e.id);
                if (updatedParticipant !== undefined) {
                    switch (e.key) {
                        case Exports_1.ConversationTranslatorCommandTypes.changeNickname:
                            updatedParticipant.displayName = e.value;
                            break;
                        case Exports_1.ConversationTranslatorCommandTypes.setUseTTS:
                            updatedParticipant.isUsingTts = e.value;
                            break;
                        case Exports_1.ConversationTranslatorCommandTypes.setProfanityFiltering:
                            updatedParticipant.profanity = e.value;
                            break;
                        case Exports_1.ConversationTranslatorCommandTypes.setMute:
                            updatedParticipant.isMuted = e.value;
                            break;
                        case Exports_1.ConversationTranslatorCommandTypes.setTranslateToLanguages:
                            updatedParticipant.translateToLanguages = e.value;
                            break;
                    }
                    _this.privParticipants.addOrUpdateParticipant(updatedParticipant);
                    if (!!_this.privConversationTranslator) {
                        _this.privConversationTranslator.participantsChanged(_this.privConversationTranslator, new Exports_3.ConversationParticipantsChangedEventArgs(Exports_3.ParticipantChangedReason.Updated, [_this.toParticipant(updatedParticipant)], e.sessionId));
                    }
                }
            }
            catch (e) {
                //
            }
        };
        _this.onLockRoomCommandReceived = function () {
            // TODO
        };
        _this.onMuteAllCommandReceived = function (r, e) {
            try {
                _this.privParticipants.participants.forEach(function (p) { return p.isMuted = (p.isHost ? false : e.isMuted); });
                if (!!_this.privConversationTranslator) {
                    _this.privConversationTranslator.participantsChanged(_this.privConversationTranslator, new Exports_3.ConversationParticipantsChangedEventArgs(Exports_3.ParticipantChangedReason.Updated, _this.toParticipants(false), e.sessionId));
                }
            }
            catch (e) {
                //
            }
        };
        _this.onParticipantJoinCommandReceived = function (r, e) {
            try {
                var newParticipant = _this.privParticipants.addOrUpdateParticipant(e.participant);
                if (newParticipant !== undefined) {
                    if (!!_this.privConversationTranslator) {
                        _this.privConversationTranslator.participantsChanged(_this.privConversationTranslator, new Exports_3.ConversationParticipantsChangedEventArgs(Exports_3.ParticipantChangedReason.JoinedConversation, [_this.toParticipant(newParticipant)], e.sessionId));
                    }
                }
            }
            catch (e) {
                //
            }
        };
        _this.onParticipantLeaveCommandReceived = function (r, e) {
            try {
                var ejectedParticipant = _this.privParticipants.getParticipant(e.participant.id);
                if (ejectedParticipant !== undefined) {
                    // remove the participant from the internal participants list
                    _this.privParticipants.deleteParticipant(e.participant.id);
                    if (!!_this.privConversationTranslator) {
                        // notify subscribers that the participant has left the conversation
                        _this.privConversationTranslator.participantsChanged(_this.privConversationTranslator, new Exports_3.ConversationParticipantsChangedEventArgs(Exports_3.ParticipantChangedReason.LeftConversation, [_this.toParticipant(ejectedParticipant)], e.sessionId));
                    }
                }
            }
            catch (e) {
                //
            }
        };
        _this.onTranslationReceived = function (r, e) {
            try {
                switch (e.command) {
                    case Exports_1.ConversationTranslatorMessageTypes.final:
                        if (!!_this.privConversationTranslator) {
                            _this.privConversationTranslator.transcribed(_this.privConversationTranslator, new Exports_3.ConversationTranslationEventArgs(e.payload, undefined, e.sessionId));
                        }
                        break;
                    case Exports_1.ConversationTranslatorMessageTypes.partial:
                        if (!!_this.privConversationTranslator) {
                            _this.privConversationTranslator.transcribing(_this.privConversationTranslator, new Exports_3.ConversationTranslationEventArgs(e.payload, undefined, e.sessionId));
                        }
                        break;
                    case Exports_1.ConversationTranslatorMessageTypes.instantMessage:
                        if (!!_this.privConversationTranslator) {
                            _this.privConversationTranslator.textMessageReceived(_this.privConversationTranslator, new Exports_3.ConversationTranslationEventArgs(e.payload, undefined, e.sessionId));
                        }
                        break;
                }
            }
            catch (e) {
                //
            }
        };
        _this.onParticipantsListReceived = function (r, e) {
            var _a;
            try {
                // check if the session token needs to be updated
                if (e.sessionToken !== undefined && e.sessionToken !== null) {
                    _this.privRoom.token = e.sessionToken;
                }
                // save the participants
                _this.privParticipants.participants = __spreadArrays(e.participants);
                // enable the conversation
                if (_this.privParticipants.me !== undefined) {
                    _this.privIsReady = true;
                }
                if (!!_this.privConversationTranslator) {
                    _this.privConversationTranslator.participantsChanged(_this.privConversationTranslator, new Exports_3.ConversationParticipantsChangedEventArgs(Exports_3.ParticipantChangedReason.JoinedConversation, _this.toParticipants(true), e.sessionId));
                }
                // if this is the host, update the nickname if needed
                if (_this.me.isHost) {
                    var nickname = (_a = _this.privConversationTranslator) === null || _a === void 0 ? void 0 : _a.properties.getProperty(Exports_3.PropertyId.ConversationTranslator_Name);
                    if (nickname !== undefined && nickname.length > 0 && nickname !== _this.me.displayName) {
                        // issue a change nickname request
                        _this.changeNicknameAsync(nickname);
                    }
                }
            }
            catch (e) {
                //
            }
        };
        _this.onConversationExpiration = function (r, e) {
            try {
                if (!!_this.privConversationTranslator) {
                    _this.privConversationTranslator.conversationExpiration(_this.privConversationTranslator, e);
                }
            }
            catch (e) {
                //
            }
        };
        _this.privIsConnected = false;
        _this.privIsDisposed = false;
        _this.privConversationId = "";
        _this.privProperties = new Exports_3.PropertyCollection();
        _this.privManager = new Exports_1.ConversationManager();
        // check the speech language
        var language = speechConfig.getProperty(Exports_3.PropertyId[Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        if (!language) {
            speechConfig.setProperty(Exports_3.PropertyId[Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage], Exports_1.ConversationConnectionConfig.defaultLanguageCode);
        }
        _this.privLanguage = speechConfig.getProperty(Exports_3.PropertyId[Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage]);
        if (!id) {
            // check the target language(s)
            if (speechConfig.targetLanguages.length === 0) {
                speechConfig.addTargetLanguage(_this.privLanguage);
            }
            // check the profanity setting: speech and conversationTranslator should be in sync
            var profanity = speechConfig.getProperty(Exports_3.PropertyId[Exports_3.PropertyId.SpeechServiceResponse_ProfanityOption]);
            if (!profanity) {
                speechConfig.setProfanity(Exports_3.ProfanityOption.Masked);
            }
            // check the nickname: it should pass this regex: ^\w+([\s-][\w\(\)]+)*$"
            // TODO: specify the regex required. Nicknames must be unique or get the duplicate nickname error
            // TODO: check what the max length is and if a truncation is required or if the service handles it without an error
            var hostNickname = speechConfig.getProperty(Exports_3.PropertyId[Exports_3.PropertyId.ConversationTranslator_Name]);
            if (hostNickname === undefined || hostNickname === null) {
                hostNickname = "Host";
            }
            Contracts_1.Contracts.throwIfNullOrTooLong(hostNickname, "nickname", 50);
            Contracts_1.Contracts.throwIfNullOrTooShort(hostNickname, "nickname", 2);
            speechConfig.setProperty(Exports_3.PropertyId[Exports_3.PropertyId.ConversationTranslator_Name], hostNickname);
        }
        else {
            _this.privConversationId = id;
        }
        // save the speech config for future usage
        _this.privConfig = speechConfig;
        // save the config properties
        var configImpl = speechConfig;
        Contracts_1.Contracts.throwIfNull(configImpl, "speechConfig");
        _this.privProperties = configImpl.properties.clone();
        _this.privIsConnected = false;
        _this.privParticipants = new Exports_1.InternalParticipants();
        _this.privIsReady = false;
        _this.privTextMessageMaxLength = 1000;
        return _this;
    }
    Object.defineProperty(ConversationImpl.prototype, "room", {
        // get the internal data about a conversation
        get: function () {
            return this.privRoom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "connection", {
        // get the wrapper for connecting to the websockets
        get: function () {
            return this.privConversationRecognizer; // this.privConnection;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "config", {
        // get the config
        get: function () {
            return this.privConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "conversationId", {
        // get the conversation Id
        get: function () {
            return this.privRoom ? this.privRoom.roomId : this.privConversationId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "properties", {
        // get the properties
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "speechRecognitionLanguage", {
        // get the speech language
        get: function () {
            return this.privLanguage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "isMutedByHost", {
        get: function () {
            var _a, _b;
            return ((_a = this.privParticipants.me) === null || _a === void 0 ? void 0 : _a.isHost) ? false : (_b = this.privParticipants.me) === null || _b === void 0 ? void 0 : _b.isMuted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "isConnected", {
        get: function () {
            return this.privIsConnected && this.privIsReady;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "participants", {
        get: function () {
            return this.toParticipants(true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "me", {
        get: function () {
            return this.toParticipant(this.privParticipants.me);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "host", {
        get: function () {
            return this.toParticipant(this.privParticipants.host);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "transcriberRecognizer", {
        get: function () {
            return this.privTranscriberRecognizer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "conversationInfo", {
        get: function () {
            var convId = this.conversationId;
            var p = this.participants.map(function (part) { return ({
                id: part.id,
                preferredLanguage: part.preferredLanguage,
                voice: part.voice
            }); });
            var props = {};
            for (var _i = 0, _a = Exports_1.ConversationConnectionConfig.transcriptionEventKeys; _i < _a.length; _i++) {
                var key = _a[_i];
                var val = this.properties.getProperty(key, "");
                if (val !== "") {
                    props[key] = val;
                }
            }
            var info = { id: convId, participants: p, conversationProperties: props };
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "canSend", {
        get: function () {
            var _a;
            return this.privIsConnected && !((_a = this.privParticipants.me) === null || _a === void 0 ? void 0 : _a.isMuted);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "canSendAsHost", {
        get: function () {
            var _a;
            return this.privIsConnected && ((_a = this.privParticipants.me) === null || _a === void 0 ? void 0 : _a.isHost);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "authorizationToken", {
        // get / set the speech auth token
        // eslint-disable-next-line @typescript-eslint/member-ordering
        get: function () {
            return this.privToken;
        },
        set: function (value) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(value, "authorizationToken");
            this.privToken = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationImpl.prototype, "conversationTranslator", {
        set: function (conversationTranslator) {
            this.privConversationTranslator = conversationTranslator;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new conversation as Host
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.createConversationAsync = function (cb, err) {
        var _this = this;
        try {
            if (!!this.privConversationRecognizer) {
                this.handleError(new Error(this.privErrors.permissionDeniedStart), err);
            }
            this.privManager.createOrJoin(this.privProperties, undefined, (function (room) {
                if (!room) {
                    _this.handleError(new Error(_this.privErrors.permissionDeniedConnect), err);
                }
                _this.privRoom = room;
                _this.handleCallback(cb, err);
            }), (function (error) {
                _this.handleError(error, err);
            }));
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Starts a new conversation as host.
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.startConversationAsync = function (cb, err) {
        var _this = this;
        try {
            // check if there is already a recognizer
            if (!!this.privConversationRecognizer) {
                this.handleError(new Error(this.privErrors.permissionDeniedStart), err);
            }
            // check if there is conversation data available
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedConnect);
            // connect to the conversation websocket
            this.privParticipants.meId = this.privRoom.participantId;
            this.privConversationRecognizer = Exports_1.ConversationRecognizerFactory.fromConfig(this, this.privConfig);
            // Because ConversationTranslator manually sets up and manages the connection, Conversation
            // has to forward serviceRecognizer connection events that usually get passed automatically
            this.privConversationRecognizer.connected = this.onConnected;
            this.privConversationRecognizer.disconnected = this.onDisconnected;
            this.privConversationRecognizer.canceled = this.onCanceled;
            this.privConversationRecognizer.participantUpdateCommandReceived = this.onParticipantUpdateCommandReceived;
            this.privConversationRecognizer.lockRoomCommandReceived = this.onLockRoomCommandReceived;
            this.privConversationRecognizer.muteAllCommandReceived = this.onMuteAllCommandReceived;
            this.privConversationRecognizer.participantJoinCommandReceived = this.onParticipantJoinCommandReceived;
            this.privConversationRecognizer.participantLeaveCommandReceived = this.onParticipantLeaveCommandReceived;
            this.privConversationRecognizer.translationReceived = this.onTranslationReceived;
            this.privConversationRecognizer.participantsListReceived = this.onParticipantsListReceived;
            this.privConversationRecognizer.conversationExpiration = this.onConversationExpiration;
            this.privConversationRecognizer.connect(this.privRoom.token, (function () {
                _this.handleCallback(cb, err);
            }), (function (error) {
                _this.handleError(error, err);
            }));
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Join a conversation as a participant.
     * @param { IParticipant } participant - participant to add
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.addParticipantAsync = function (participant, cb, err) {
        Contracts_1.Contracts.throwIfNullOrUndefined(participant, "Participant");
        Exports_2.marshalPromiseToCallbacks(this.addParticipantImplAsync(participant), cb, err);
    };
    /**
     * Join a conversation as a participant.
     * @param conversation
     * @param nickname
     * @param lang
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.joinConversationAsync = function (conversationId, nickname, lang, cb, err) {
        var _this = this;
        try {
            // TODO
            // if (!!this.privConversationRecognizer) {
            //     throw new Error(this.privErrors.permissionDeniedStart);
            // }
            Contracts_1.Contracts.throwIfNullOrWhitespace(conversationId, this.privErrors.invalidArgs.replace("{arg}", "conversationId"));
            Contracts_1.Contracts.throwIfNullOrWhitespace(nickname, this.privErrors.invalidArgs.replace("{arg}", "nickname"));
            Contracts_1.Contracts.throwIfNullOrWhitespace(lang, this.privErrors.invalidArgs.replace("{arg}", "language"));
            // join the conversation
            this.privManager.createOrJoin(this.privProperties, conversationId, (function (room) {
                Contracts_1.Contracts.throwIfNullOrUndefined(room, _this.privErrors.permissionDeniedConnect);
                _this.privRoom = room;
                _this.privConfig.authorizationToken = room.cognitiveSpeechAuthToken;
                // join callback
                if (!!cb) {
                    cb(room.cognitiveSpeechAuthToken);
                }
            }), (function (error) {
                _this.handleError(error, err);
            }));
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Deletes a conversation
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.deleteConversationAsync = function (cb, err) {
        Exports_2.marshalPromiseToCallbacks(this.deleteConversationImplAsync(), cb, err);
    };
    ConversationImpl.prototype.deleteConversationImplAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Contracts_1.Contracts.throwIfNullOrUndefined(this.privProperties, this.privErrors.permissionDeniedConnect);
                        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.token, this.privErrors.permissionDeniedConnect);
                        return [4 /*yield*/, this.privManager.leave(this.privProperties, this.privRoom.token)];
                    case 1:
                        _a.sent();
                        this.dispose();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Issues a request to close the client websockets
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.endConversationAsync = function (cb, err) {
        Exports_2.marshalPromiseToCallbacks(this.endConversationImplAsync(), cb, err);
    };
    ConversationImpl.prototype.endConversationImplAsync = function () {
        return this.close(true);
    };
    /**
     * Issues a request to lock the conversation
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.lockConversationAsync = function (cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSendAsHost) {
                this.handleError(new Error(this.privErrors.permissionDeniedConversation.replace("{command}", "lock")), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getLockCommand(true), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to mute the conversation
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.muteAllParticipantsAsync = function (cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privConversationRecognizer, this.privErrors.permissionDeniedSend);
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            // check the user's permissions
            if (!this.canSendAsHost) {
                this.handleError(new Error(this.privErrors.permissionDeniedConversation.replace("{command}", "mute")), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getMuteAllCommand(true), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to mute a participant in the conversation
     * @param userId
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.muteParticipantAsync = function (userId, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrWhitespace(userId, this.privErrors.invalidArgs.replace("{arg}", "userId"));
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            // check the connection is open (host + participant can perform the mute command)
            if (!this.canSend) {
                this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
            }
            // if not host, check the participant is not muting another participant
            if (!this.me.isHost && this.me.id !== userId) {
                this.handleError(new Error(this.privErrors.permissionDeniedParticipant.replace("{command}", "mute")), err);
            }
            // check the user exists
            var exists = this.privParticipants.getParticipantIndex(userId);
            if (exists === -1) {
                this.handleError(new Error(this.privErrors.invalidParticipantRequest), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getMuteCommand(userId, true), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to remove a participant from the conversation
     * @param userId
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.removeParticipantAsync = function (userId, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            if (!!this.privTranscriberRecognizer && userId.hasOwnProperty("id")) {
                // Assume this is a transcription participant
                Exports_2.marshalPromiseToCallbacks(this.removeParticipantImplAsync(userId), cb, err);
            }
            else {
                Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
                Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
                if (!this.canSendAsHost) {
                    this.handleError(new Error(this.privErrors.permissionDeniedParticipant.replace("{command}", "remove")), err);
                }
                var participantId_1 = "";
                if (typeof userId === "string") {
                    participantId_1 = userId;
                }
                else if (userId.hasOwnProperty("id")) {
                    var participant = userId;
                    participantId_1 = participant.id;
                }
                else if (userId.hasOwnProperty("userId")) {
                    var user = userId;
                    participantId_1 = user.userId;
                }
                Contracts_1.Contracts.throwIfNullOrWhitespace(participantId_1, this.privErrors.invalidArgs.replace("{arg}", "userId"));
                // check the participant exists
                var index = this.participants.findIndex(function (p) { return p.id === participantId_1; });
                if (index === -1) {
                    this.handleError(new Error(this.privErrors.invalidParticipantRequest), err);
                }
                if (!!this.privConversationRecognizer) {
                    this.privConversationRecognizer.sendRequest(this.getEjectCommand(participantId_1), (function () {
                        _this.handleCallback(cb, err);
                    }), (function (error) {
                        _this.handleError(error, err);
                    }));
                }
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to unlock the conversation
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.unlockConversationAsync = function (cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSendAsHost) {
                this.handleError(new Error(this.privErrors.permissionDeniedConversation.replace("{command}", "unlock")), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getLockCommand(false), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to unmute all participants in the conversation
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.unmuteAllParticipantsAsync = function (cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSendAsHost) {
                this.handleError(new Error(this.privErrors.permissionDeniedConversation.replace("{command}", "unmute all")), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getMuteAllCommand(false), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Issues a request to unmute a participant in the conversation
     * @param userId
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.unmuteParticipantAsync = function (userId, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrWhitespace(userId, this.privErrors.invalidArgs.replace("{arg}", "userId"));
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            // check the connection is open (host + participant can perform the mute command)
            if (!this.canSend) {
                this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
            }
            // if not host, check the participant is not muting another participant
            if (!this.me.isHost && this.me.id !== userId) {
                this.handleError(new Error(this.privErrors.permissionDeniedParticipant.replace("{command}", "mute")), err);
            }
            // check the user exists
            var exists = this.privParticipants.getParticipantIndex(userId);
            if (exists === -1) {
                this.handleError(new Error(this.privErrors.invalidParticipantRequest), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getMuteCommand(userId, false), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Send a text message
     * @param message
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.sendTextMessageAsync = function (message, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrWhitespace(message, this.privErrors.invalidArgs.replace("{arg}", "message"));
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSend) {
                this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
            }
            // TODO: is a max length check required?
            if (message.length > this.privTextMessageMaxLength) {
                this.handleError(new Error(this.privErrors.invalidArgs.replace("{arg}", "message length")), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getMessageCommand(message), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Set translated to languages
     * @param {string[]} languages - languages to translate to
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.setTranslatedLanguagesAsync = function (languages, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfArrayEmptyOrWhitespace(languages, this.privErrors.invalidArgs.replace("{arg}", "languages"));
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSend) {
                this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getSetTranslateToLanguagesCommand(languages), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    /**
     * Change nickname
     * @param {string} nickname - new nickname for the room
     * @param cb
     * @param err
     */
    ConversationImpl.prototype.changeNicknameAsync = function (nickname, cb, err) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfDisposed(this.privConversationRecognizer.isDisposed());
            Contracts_1.Contracts.throwIfNullOrWhitespace(nickname, this.privErrors.invalidArgs.replace("{arg}", "nickname"));
            Contracts_1.Contracts.throwIfNullOrUndefined(this.privRoom, this.privErrors.permissionDeniedSend);
            if (!this.canSend) {
                this.handleError(new Error(this.privErrors.permissionDeniedSend), err);
            }
            if (!!this.privConversationRecognizer) {
                this.privConversationRecognizer.sendRequest(this.getChangeNicknameCommand(nickname), (function () {
                    _this.handleCallback(cb, err);
                }), (function (error) {
                    _this.handleError(error, err);
                }));
            }
        }
        catch (error) {
            this.handleError(error, err);
        }
    };
    ConversationImpl.prototype.isDisposed = function () {
        return this.privIsDisposed;
    };
    ConversationImpl.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this.privIsDisposed = true;
        if (!!this.config) {
            this.config.close();
        }
        this.privConfig = undefined;
        this.privLanguage = undefined;
        this.privProperties = undefined;
        this.privRoom = undefined;
        this.privToken = undefined;
        this.privManager = undefined;
        this.privIsConnected = false;
        this.privIsReady = false;
        this.privParticipants = undefined;
    };
    ConversationImpl.prototype.connectTranscriberRecognizer = function (recognizer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!!this.privTranscriberRecognizer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privTranscriberRecognizer.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, recognizer.enforceAudioGating()];
                    case 3:
                        _a.sent();
                        this.privTranscriberRecognizer = recognizer;
                        this.privTranscriberRecognizer.conversation = this;
                        return [2 /*return*/];
                }
            });
        });
    };
    ConversationImpl.prototype.getKeepAlive = function () {
        var nickname = (!!this.me) ? this.me.displayName : "default_nickname";
        return JSON.stringify({
            id: "0",
            nickname: nickname,
            participantId: this.privRoom.participantId,
            roomId: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.keepAlive
        });
    };
    /* eslint-enable @typescript-eslint/typedef */
    ConversationImpl.prototype.addParticipantImplAsync = function (participant) {
        var newParticipant = this.privParticipants.addOrUpdateParticipant(participant);
        if (newParticipant !== undefined) {
            if (!!this.privTranscriberRecognizer) {
                var conversationInfo = this.conversationInfo;
                conversationInfo.participants = [participant];
                return this.privTranscriberRecognizer.pushConversationEvent(conversationInfo, "join");
            }
        }
    };
    ConversationImpl.prototype.removeParticipantImplAsync = function (participant) {
        this.privParticipants.deleteParticipant(participant.id);
        var conversationInfo = this.conversationInfo;
        conversationInfo.participants = [participant];
        return this.privTranscriberRecognizer.pushConversationEvent(conversationInfo, "leave");
    };
    ConversationImpl.prototype.close = function (dispose) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        this.privIsConnected = false;
                        return [4 /*yield*/, ((_a = this.privConversationRecognizer) === null || _a === void 0 ? void 0 : _a.close())];
                    case 1:
                        _b.sent();
                        this.privConversationRecognizer = undefined;
                        if (!!this.privConversationTranslator) {
                            this.privConversationTranslator.dispose();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        // ignore error
                        throw e_1;
                    case 3:
                        if (dispose) {
                            this.dispose();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Helpers */
    ConversationImpl.prototype.handleCallback = function (cb, err) {
        if (!!cb) {
            try {
                cb();
            }
            catch (e) {
                if (!!err) {
                    err(e);
                }
            }
            cb = undefined;
        }
    };
    ConversationImpl.prototype.handleError = function (error, err) {
        if (!!err) {
            if (error instanceof Error) {
                var typedError = error;
                err(typedError.name + ": " + typedError.message);
            }
            else {
                err(error);
            }
        }
    };
    /** Participant Helpers */
    ConversationImpl.prototype.toParticipants = function (includeHost) {
        var _this = this;
        var participants = this.privParticipants.participants.map(function (p) { return (_this.toParticipant(p)); });
        if (!includeHost) {
            return participants.filter(function (p) { return p.isHost === false; });
        }
        else {
            return participants;
        }
    };
    ConversationImpl.prototype.toParticipant = function (p) {
        return new Exports_3.Participant(p.id, p.avatar, p.displayName, p.isHost, p.isMuted, p.isUsingTts, p.preferredLanguage, p.voice);
    };
    ConversationImpl.prototype.getMuteAllCommand = function (isMuted) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.setMuteAll,
            participantId: this.privRoom.participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
            value: isMuted
        });
    };
    ConversationImpl.prototype.getMuteCommand = function (participantId, isMuted) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.setMute,
            // eslint-disable-next-line object-shorthand
            participantId: participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
            value: isMuted
        });
    };
    ConversationImpl.prototype.getLockCommand = function (isLocked) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.setLockState,
            participantId: this.privRoom.participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
            value: isLocked
        });
    };
    ConversationImpl.prototype.getEjectCommand = function (participantId) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.ejectParticipant,
            // eslint-disable-next-line object-shorthand
            participantId: participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
        });
    };
    ConversationImpl.prototype.getSetTranslateToLanguagesCommand = function (languages) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.setTranslateToLanguages,
            participantId: this.privRoom.participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
            value: languages
        });
    };
    ConversationImpl.prototype.getChangeNicknameCommand = function (nickname) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(nickname, "nickname");
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.participantId, "participantId");
        return JSON.stringify({
            command: Exports_1.ConversationTranslatorCommandTypes.changeNickname,
            nickname: nickname,
            participantId: this.privRoom.participantId,
            roomid: this.privRoom.roomId,
            type: Exports_1.ConversationTranslatorMessageTypes.participantCommand,
            value: nickname
        });
    };
    ConversationImpl.prototype.getMessageCommand = function (message) {
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.roomId, "conversationId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(this.privRoom.participantId, "participantId");
        Contracts_1.Contracts.throwIfNullOrWhitespace(message, "message");
        return JSON.stringify({
            participantId: this.privRoom.participantId,
            roomId: this.privRoom.roomId,
            text: message,
            type: Exports_1.ConversationTranslatorMessageTypes.instantMessage
        });
    };
    return ConversationImpl;
}(Conversation));
exports.ConversationImpl = ConversationImpl;

//# sourceMappingURL=Conversation.js.map
