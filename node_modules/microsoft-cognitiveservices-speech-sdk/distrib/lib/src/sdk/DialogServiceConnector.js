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
exports.DialogServiceConnector = void 0;
var DialogConnectorFactory_1 = require("../common.speech/DialogConnectorFactory");
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("../common/Exports");
var Contracts_1 = require("./Contracts");
var Exports_3 = require("./Exports");
var PropertyId_1 = require("./PropertyId");
/**
 * Dialog Service Connector
 * @class DialogServiceConnector
 */
var DialogServiceConnector = /** @class */ (function (_super) {
    __extends(DialogServiceConnector, _super);
    /**
     * Initializes an instance of the DialogServiceConnector.
     * @constructor
     * @param {DialogServiceConfig} dialogConfig - Set of properties to configure this recognizer.
     * @param {AudioConfig} audioConfig - An optional audio config associated with the recognizer
     */
    function DialogServiceConnector(dialogConfig, audioConfig) {
        var _this = this;
        var dialogServiceConfigImpl = dialogConfig;
        Contracts_1.Contracts.throwIfNull(dialogConfig, "dialogConfig");
        _this = _super.call(this, audioConfig, dialogServiceConfigImpl.properties, new DialogConnectorFactory_1.DialogConnectionFactory()) || this;
        _this.isTurnComplete = true;
        _this.privIsDisposed = false;
        _this.privProperties = dialogServiceConfigImpl.properties.clone();
        var agentConfig = _this.buildAgentConfig();
        _this.privReco.agentConfig.set(agentConfig);
        return _this;
    }
    /**
     * Starts a connection to the service.
     * Users can optionally call connect() to manually set up a connection in advance, before starting interactions.
     *
     * Note: On return, the connection might not be ready yet. Please subscribe to the Connected event to
     * be notified when the connection is established.
     * @member DialogServiceConnector.prototype.connect
     * @function
     * @public
     */
    DialogServiceConnector.prototype.connect = function (cb, err) {
        Exports_2.marshalPromiseToCallbacks(this.privReco.connect(), cb, err);
    };
    /**
     * Closes the connection the service.
     * Users can optionally call disconnect() to manually shutdown the connection of the associated DialogServiceConnector.
     *
     * If disconnect() is called during a recognition, recognition will fail and cancel with an error.
     */
    DialogServiceConnector.prototype.disconnect = function (cb, err) {
        Exports_2.marshalPromiseToCallbacks(this.privReco.disconnect(), cb, err);
    };
    Object.defineProperty(DialogServiceConnector.prototype, "authorizationToken", {
        /**
         * Gets the authorization token used to communicate with the service.
         * @member DialogServiceConnector.prototype.authorizationToken
         * @function
         * @public
         * @returns {string} Authorization token.
         */
        get: function () {
            return this.properties.getProperty(PropertyId_1.PropertyId.SpeechServiceAuthorization_Token);
        },
        /**
         * Sets the authorization token used to communicate with the service.
         * @member DialogServiceConnector.prototype.authorizationToken
         * @function
         * @public
         * @param {string} token - Authorization token.
         */
        set: function (token) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(token, "token");
            this.properties.setProperty(PropertyId_1.PropertyId.SpeechServiceAuthorization_Token, token);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DialogServiceConnector.prototype, "properties", {
        /**
         * The collection of properties and their values defined for this DialogServiceConnector.
         * @member DialogServiceConnector.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The collection of properties and their values defined for this DialogServiceConnector.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DialogServiceConnector.prototype, "speechActivityTemplate", {
        /** Gets the template for the activity generated by service from speech.
         * Properties from the template will be stamped on the generated activity.
         * It can be empty
         */
        get: function () {
            return this.properties.getProperty(PropertyId_1.PropertyId.Conversation_Speech_Activity_Template);
        },
        /** Sets the template for the activity generated by service from speech.
         * Properties from the template will be stamped on the generated activity.
         * It can be null or empty.
         * Note: it has to be a valid Json object.
         */
        set: function (speechActivityTemplate) {
            this.properties.setProperty(PropertyId_1.PropertyId.Conversation_Speech_Activity_Template, speechActivityTemplate);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Starts recognition and stops after the first utterance is recognized.
     * @member DialogServiceConnector.prototype.listenOnceAsync
     * @function
     * @public
     * @param cb - Callback that received the result when the reco has completed.
     * @param err - Callback invoked in case of an error.
     */
    DialogServiceConnector.prototype.listenOnceAsync = function (cb, err) {
        var _this = this;
        if (this.isTurnComplete) {
            Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
            var callbackHolder = function () { return __awaiter(_this, void 0, void 0, function () {
                var ret, e;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.privReco.connect()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.implRecognizerStop()];
                        case 2:
                            _a.sent();
                            this.isTurnComplete = false;
                            ret = new Exports_2.Deferred();
                            return [4 /*yield*/, this.privReco.recognize(Exports_1.RecognitionMode.Conversation, ret.resolve, ret.reject)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, ret.promise];
                        case 4:
                            e = _a.sent();
                            return [4 /*yield*/, this.implRecognizerStop()];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, e];
                    }
                });
            }); };
            var retPromise = callbackHolder();
            retPromise.catch(function () {
                // Destroy the recognizer.
                // We've done all we can here.
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                _this.dispose(true).catch(function () { });
            });
            Exports_2.marshalPromiseToCallbacks(retPromise.finally(function () {
                _this.isTurnComplete = true;
            }), cb, err);
        }
    };
    DialogServiceConnector.prototype.sendActivityAsync = function (activity, cb, errCb) {
        Exports_2.marshalPromiseToCallbacks(this.privReco.sendMessage(activity), cb, errCb);
    };
    /**
     * closes all external resources held by an instance of this class.
     * @member DialogServiceConnector.prototype.close
     * @function
     * @public
     */
    DialogServiceConnector.prototype.close = function (cb, err) {
        Contracts_1.Contracts.throwIfDisposed(this.privIsDisposed);
        Exports_2.marshalPromiseToCallbacks(this.dispose(true), cb, err);
    };
    DialogServiceConnector.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privIsDisposed) {
                            return [2 /*return*/];
                        }
                        if (!disposing) return [3 /*break*/, 3];
                        this.privIsDisposed = true;
                        return [4 /*yield*/, this.implRecognizerStop()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _super.prototype.dispose.call(this, disposing)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DialogServiceConnector.prototype.createRecognizerConfig = function (speechConfig) {
        return new Exports_1.RecognizerConfig(speechConfig, this.privProperties);
    };
    DialogServiceConnector.prototype.createServiceRecognizer = function (authentication, connectionFactory, audioConfig, recognizerConfig) {
        var audioSource = audioConfig;
        return new Exports_1.DialogServiceAdapter(authentication, connectionFactory, audioSource, recognizerConfig, this);
    };
    DialogServiceConnector.prototype.buildAgentConfig = function () {
        var communicationType = this.properties.getProperty("Conversation_Communication_Type", "Default");
        return {
            botInfo: {
                commType: communicationType,
                commandsCulture: undefined,
                connectionId: this.properties.getProperty(PropertyId_1.PropertyId.Conversation_Agent_Connection_Id),
                conversationId: this.properties.getProperty(PropertyId_1.PropertyId.Conversation_Conversation_Id, undefined),
                fromId: this.properties.getProperty(PropertyId_1.PropertyId.Conversation_From_Id, undefined),
                ttsAudioFormat: this.properties.getProperty(PropertyId_1.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)
            },
            version: 0.2
        };
    };
    return DialogServiceConnector;
}(Exports_3.Recognizer));
exports.DialogServiceConnector = DialogServiceConnector;

//# sourceMappingURL=DialogServiceConnector.js.map
