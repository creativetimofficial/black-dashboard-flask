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
exports.ConversationTranslatorRecognizer = exports.ConversationRecognizerFactory = void 0;
// eslint-disable-next-line max-classes-per-file
var Exports_1 = require("../../common.speech/Exports");
var Exports_2 = require("../../common/Exports");
var Contracts_1 = require("../../sdk/Contracts");
var Exports_3 = require("../../sdk/Exports");
var ConversationConnectionFactory_1 = require("./ConversationConnectionFactory");
var ConversationServiceAdapter_1 = require("./ConversationServiceAdapter");
var ConversationRecognizerFactory = /** @class */ (function () {
    function ConversationRecognizerFactory() {
    }
    ConversationRecognizerFactory.fromConfig = function (conversation, speechConfig, audioConfig) {
        return new ConversationTranslatorRecognizer(conversation, speechConfig, audioConfig);
    };
    return ConversationRecognizerFactory;
}());
exports.ConversationRecognizerFactory = ConversationRecognizerFactory;
/**
 * Sends messages to the Conversation Translator websocket and listens for incoming events containing websocket messages.
 * Based off the recognizers in the SDK folder.
 */
var ConversationTranslatorRecognizer = /** @class */ (function (_super) {
    __extends(ConversationTranslatorRecognizer, _super);
    function ConversationTranslatorRecognizer(conversation, speechConfig, audioConfig) {
        var _this = this;
        var serviceConfigImpl = speechConfig;
        Contracts_1.Contracts.throwIfNull(serviceConfigImpl, "speechConfig");
        var conversationImpl = conversation;
        Contracts_1.Contracts.throwIfNull(conversationImpl, "conversationImpl");
        _this = _super.call(this, audioConfig, serviceConfigImpl.properties, new ConversationConnectionFactory_1.ConversationConnectionFactory()) || this;
        _this.privConversation = conversationImpl;
        _this.privIsDisposed = false;
        _this.privProperties = serviceConfigImpl.properties.clone();
        _this.privConnection = Exports_3.Connection.fromRecognizer(_this);
        _this.privSetTimeout = (typeof (Blob) !== "undefined" && typeof (Worker) !== "undefined") ? Exports_2.Timeout.setTimeout : setTimeout;
        _this.privClearTimeout = (typeof (Blob) !== "undefined" && typeof (Worker) !== "undefined") ? Exports_2.Timeout.clearTimeout : clearTimeout;
        return _this;
    }
    Object.defineProperty(ConversationTranslatorRecognizer.prototype, "connected", {
        set: function (cb) {
            this.privConnection.connected = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationTranslatorRecognizer.prototype, "disconnected", {
        set: function (cb) {
            this.privConnection.disconnected = cb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationTranslatorRecognizer.prototype, "speechRecognitionLanguage", {
        /**
         * Return the speech language used by the recognizer
         */
        get: function () {
            return this.privSpeechRecognitionLanguage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationTranslatorRecognizer.prototype, "properties", {
        /**
         * Return the properties for the recognizer
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    ConversationTranslatorRecognizer.prototype.isDisposed = function () {
        return this.privIsDisposed;
    };
    /**
     * Connect to the recognizer
     * @param token
     */
    ConversationTranslatorRecognizer.prototype.connect = function (token, cb, err) {
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            Contracts_1.Contracts.throwIfNullOrWhitespace(token, "token");
            this.privReco.conversationTranslatorToken = token;
            this.resetConversationTimeout();
            this.privReco.connectAsync(cb, err);
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    var typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
        }
    };
    /**
     * Disconnect from the recognizer
     */
    ConversationTranslatorRecognizer.prototype.disconnect = function (cb, err) {
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            if (this.privTimeoutToken !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                this.privClearTimeout(this.privTimeoutToken);
            }
            this.privReco.disconnect().then(function () {
                if (!!cb) {
                    cb();
                }
            }, function (error) {
                if (!!err) {
                    err(error);
                }
            });
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    var typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
            // Destroy the recognizer.
            this.dispose(true).catch(function (reason) {
                Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
            });
        }
    };
    /**
     * Send the mute all participants command to the websocket
     * @param conversationId
     * @param participantId
     * @param isMuted
     */
    ConversationTranslatorRecognizer.prototype.sendRequest = function (command, cb, err) {
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            this.sendMessage(command, cb, err);
        }
        catch (error) {
            if (!!err) {
                if (error instanceof Error) {
                    var typedError = error;
                    err(typedError.name + ": " + typedError.message);
                }
                else {
                    err(error);
                }
            }
            // Destroy the recognizer.
            this.dispose(true).catch(function (reason) {
                Exports_2.Events.instance.onEvent(new Exports_2.BackgroundEvent(reason));
            });
        }
    };
    /**
     * Close and dispose the recognizer
     */
    ConversationTranslatorRecognizer.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.privIsDisposed) return [3 /*break*/, 2];
                        if (!!this.privConnection) {
                            this.privConnection.closeConnection();
                            this.privConnection.close();
                        }
                        this.privConnection = undefined;
                        return [4 /*yield*/, this.dispose(true)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dispose the recognizer
     * @param disposing
     */
    ConversationTranslatorRecognizer.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privIsDisposed) {
                            return [2 /*return*/];
                        }
                        if (!disposing) return [3 /*break*/, 2];
                        if (this.privTimeoutToken !== undefined) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            this.privClearTimeout(this.privTimeoutToken);
                        }
                        this.privIsDisposed = true;
                        if (!!this.privConnection) {
                            this.privConnection.closeConnection();
                            this.privConnection.close();
                            this.privConnection = undefined;
                        }
                        return [4 /*yield*/, _super.prototype.dispose.call(this, disposing)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create the config for the recognizer
     * @param speechConfig
     */
    ConversationTranslatorRecognizer.prototype.createRecognizerConfig = function (speechConfig) {
        return new Exports_1.RecognizerConfig(speechConfig, this.privProperties);
    };
    /**
     * Create the service recognizer.
     * The audio source is redundnant here but is required by the implementation.
     * @param authentication
     * @param connectionFactory
     * @param audioConfig
     * @param recognizerConfig
     */
    ConversationTranslatorRecognizer.prototype.createServiceRecognizer = function (authentication, connectionFactory, audioConfig, recognizerConfig) {
        var audioSource = audioConfig;
        return new ConversationServiceAdapter_1.ConversationServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, this);
    };
    ConversationTranslatorRecognizer.prototype.sendMessage = function (msg, cb, err) {
        var withAsync = this.privReco;
        var PromiseToEmptyCallback = function (promise, cb, err) {
            if (promise !== undefined) {
                promise.then(function () {
                    try {
                        if (!!cb) {
                            cb();
                        }
                    }
                    catch (e) {
                        if (!!err) {
                            err("'Unhandled error on promise callback: " + e + "'");
                        }
                    }
                }, function (reason) {
                    try {
                        if (!!err) {
                            err(reason);
                        }
                        // eslint-disable-next-line no-empty
                    }
                    catch (error) { }
                });
            }
            else {
                if (!!err) {
                    err("Null promise");
                }
            }
        };
        PromiseToEmptyCallback(withAsync.sendMessageAsync(msg), cb, err);
        this.resetConversationTimeout();
    };
    ConversationTranslatorRecognizer.prototype.resetConversationTimeout = function () {
        var _this = this;
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.privClearTimeout(this.privTimeoutToken);
        }
        this.privTimeoutToken = this.privSetTimeout(function () {
            _this.sendRequest(_this.privConversation.getKeepAlive());
        }, 60000);
    };
    return ConversationTranslatorRecognizer;
}(Exports_3.Recognizer));
exports.ConversationTranslatorRecognizer = ConversationTranslatorRecognizer;

//# sourceMappingURL=ConversationTranslatorRecognizer.js.map
