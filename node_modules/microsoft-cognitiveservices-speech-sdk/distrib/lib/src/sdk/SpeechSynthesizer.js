"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
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
exports.SynthesisRequest = exports.SpeechSynthesizer = void 0;
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("../common/Exports");
var AudioFileWriter_1 = require("./Audio/AudioFileWriter");
var AudioOutputFormat_1 = require("./Audio/AudioOutputFormat");
var AudioOutputStream_1 = require("./Audio/AudioOutputStream");
var Contracts_1 = require("./Contracts");
var Exports_3 = require("./Exports");
/**
 * Defines the class SpeechSynthesizer for text to speech.
 * Updated in version 1.16.0
 * @class SpeechSynthesizer
 */
var SpeechSynthesizer = /** @class */ (function () {
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer.
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer.
     */
    function SpeechSynthesizer(speechConfig, audioConfig) {
        var speechConfigImpl = speechConfig;
        Contracts_1.Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        if (audioConfig !== null) {
            if (audioConfig === undefined) {
                this.audioConfig = (typeof window === "undefined") ? undefined : Exports_3.AudioConfig.fromDefaultSpeakerOutput();
            }
            else {
                this.audioConfig = audioConfig;
            }
        }
        this.privProperties = speechConfigImpl.properties.clone();
        this.privDisposed = false;
        this.privSynthesizing = false;
        this.privConnectionFactory = new Exports_1.SpeechSynthesisConnectionFactory();
        this.synthesisRequestQueue = new Exports_2.Queue();
        this.implCommonSynthesizeSetup();
    }
    Object.defineProperty(SpeechSynthesizer.prototype, "authorizationToken", {
        /**
         * Gets the authorization token used to communicate with the service.
         * @member SpeechSynthesizer.prototype.authorizationToken
         * @function
         * @public
         * @returns {string} Authorization token.
         */
        get: function () {
            return this.properties.getProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token);
        },
        /**
         * Gets/Sets the authorization token used to communicate with the service.
         * @member SpeechSynthesizer.prototype.authorizationToken
         * @function
         * @public
         * @param {string} token - Authorization token.
         */
        set: function (token) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(token, "token");
            this.properties.setProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token, token);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesizer.prototype, "properties", {
        /**
         * The collection of properties and their values defined for this SpeechSynthesizer.
         * @member SpeechSynthesizer.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The collection of properties and their values defined for this SpeechSynthesizer.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeechSynthesizer.prototype, "autoDetectSourceLanguage", {
        /**
         * Indicates if auto detect source language is enabled
         * @member SpeechSynthesizer.prototype.properties
         * @function
         * @public
         * @returns {boolean} if auto detect source language is enabled
         */
        get: function () {
            return this.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_AutoDetectSourceLanguages) === Exports_1.AutoDetectSourceLanguagesOpenRangeOptionName;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * SpeechSynthesizer constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - an set of initial properties for this synthesizer
     * @param {AutoDetectSourceLanguageConfig} autoDetectSourceLanguageConfig - An source language detection configuration associated with the synthesizer
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the synthesizer
     */
    SpeechSynthesizer.FromConfig = function (speechConfig, autoDetectSourceLanguageConfig, audioConfig) {
        var speechConfigImpl = speechConfig;
        autoDetectSourceLanguageConfig.properties.mergeTo(speechConfigImpl.properties);
        return new SpeechSynthesizer(speechConfig, audioConfig);
    };
    SpeechSynthesizer.prototype.buildSsml = function (text) {
        var _a;
        var languageToDefaultVoice = (_a = {},
            _a["af-ZA"] = "af-ZA-AdriNeural",
            _a["am-ET"] = "am-ET-AmehaNeural",
            _a["ar-AE"] = "ar-AE-FatimaNeural",
            _a["ar-BH"] = "ar-BH-AliNeural",
            _a["ar-DZ"] = "ar-DZ-AminaNeural",
            _a["ar-EG"] = "ar-EG-SalmaNeural",
            _a["ar-IQ"] = "ar-IQ-BasselNeural",
            _a["ar-JO"] = "ar-JO-SanaNeural",
            _a["ar-KW"] = "ar-KW-FahedNeural",
            _a["ar-LY"] = "ar-LY-ImanNeural",
            _a["ar-MA"] = "ar-MA-JamalNeural",
            _a["ar-QA"] = "ar-QA-AmalNeural",
            _a["ar-SA"] = "ar-SA-HamedNeural",
            _a["ar-SY"] = "ar-SY-AmanyNeural",
            _a["ar-TN"] = "ar-TN-HediNeural",
            _a["ar-YE"] = "ar-YE-MaryamNeural",
            _a["bg-BG"] = "bg-BG-BorislavNeural",
            _a["bn-BD"] = "bn-BD-NabanitaNeural",
            _a["bn-IN"] = "bn-IN-BashkarNeural",
            _a["ca-ES"] = "ca-ES-JoanaNeural",
            _a["cs-CZ"] = "cs-CZ-AntoninNeural",
            _a["cy-GB"] = "cy-GB-AledNeural",
            _a["da-DK"] = "da-DK-ChristelNeural",
            _a["de-AT"] = "de-AT-IngridNeural",
            _a["de-CH"] = "de-CH-JanNeural",
            _a["de-DE"] = "de-DE-KatjaNeural",
            _a["el-GR"] = "el-GR-AthinaNeural",
            _a["en-AU"] = "en-AU-NatashaNeural",
            _a["en-CA"] = "en-CA-ClaraNeural",
            _a["en-GB"] = "en-GB-LibbyNeural",
            _a["en-HK"] = "en-HK-SamNeural",
            _a["en-IE"] = "en-IE-ConnorNeural",
            _a["en-IN"] = "en-IN-NeerjaNeural",
            _a["en-KE"] = "en-KE-AsiliaNeural",
            _a["en-NG"] = "en-NG-AbeoNeural",
            _a["en-NZ"] = "en-NZ-MitchellNeural",
            _a["en-PH"] = "en-PH-JamesNeural",
            _a["en-SG"] = "en-SG-LunaNeural",
            _a["en-TZ"] = "en-TZ-ElimuNeural",
            _a["en-US"] = "en-US-JennyNeural",
            _a["en-ZA"] = "en-ZA-LeahNeural",
            _a["es-AR"] = "es-AR-ElenaNeural",
            _a["es-BO"] = "es-BO-MarceloNeural",
            _a["es-CL"] = "es-CL-CatalinaNeural",
            _a["es-CO"] = "es-CO-GonzaloNeural",
            _a["es-CR"] = "es-CR-JuanNeural",
            _a["es-CU"] = "es-CU-BelkysNeural",
            _a["es-DO"] = "es-DO-EmilioNeural",
            _a["es-EC"] = "es-EC-AndreaNeural",
            _a["es-ES"] = "es-ES-AlvaroNeural",
            _a["es-GQ"] = "es-GQ-JavierNeural",
            _a["es-GT"] = "es-GT-AndresNeural",
            _a["es-HN"] = "es-HN-CarlosNeural",
            _a["es-MX"] = "es-MX-DaliaNeural",
            _a["es-NI"] = "es-NI-FedericoNeural",
            _a["es-PA"] = "es-PA-MargaritaNeural",
            _a["es-PE"] = "es-PE-AlexNeural",
            _a["es-PR"] = "es-PR-KarinaNeural",
            _a["es-PY"] = "es-PY-MarioNeural",
            _a["es-SV"] = "es-SV-LorenaNeural",
            _a["es-US"] = "es-US-AlonsoNeural",
            _a["es-UY"] = "es-UY-MateoNeural",
            _a["es-VE"] = "es-VE-PaolaNeural",
            _a["et-EE"] = "et-EE-AnuNeural",
            _a["fa-IR"] = "fa-IR-DilaraNeural",
            _a["fi-FI"] = "fi-FI-SelmaNeural",
            _a["fil-PH"] = "fil-PH-AngeloNeural",
            _a["fr-BE"] = "fr-BE-CharlineNeural",
            _a["fr-CA"] = "fr-CA-SylvieNeural",
            _a["fr-CH"] = "fr-CH-ArianeNeural",
            _a["fr-FR"] = "fr-FR-DeniseNeural",
            _a["ga-IE"] = "ga-IE-ColmNeural",
            _a["gl-ES"] = "gl-ES-RoiNeural",
            _a["gu-IN"] = "gu-IN-DhwaniNeural",
            _a["he-IL"] = "he-IL-AvriNeural",
            _a["hi-IN"] = "hi-IN-MadhurNeural",
            _a["hr-HR"] = "hr-HR-GabrijelaNeural",
            _a["hu-HU"] = "hu-HU-NoemiNeural",
            _a["id-ID"] = "id-ID-ArdiNeural",
            _a["is-IS"] = "is-IS-GudrunNeural",
            _a["it-IT"] = "it-IT-IsabellaNeural",
            _a["ja-JP"] = "ja-JP-NanamiNeural",
            _a["jv-ID"] = "jv-ID-DimasNeural",
            _a["kk-KZ"] = "kk-KZ-AigulNeural",
            _a["km-KH"] = "km-KH-PisethNeural",
            _a["kn-IN"] = "kn-IN-GaganNeural",
            _a["ko-KR"] = "ko-KR-SunHiNeural",
            _a["lo-LA"] = "lo-LA-ChanthavongNeural",
            _a["lt-LT"] = "lt-LT-LeonasNeural",
            _a["lv-LV"] = "lv-LV-EveritaNeural",
            _a["mk-MK"] = "mk-MK-AleksandarNeural",
            _a["ml-IN"] = "ml-IN-MidhunNeural",
            _a["mr-IN"] = "mr-IN-AarohiNeural",
            _a["ms-MY"] = "ms-MY-OsmanNeural",
            _a["mt-MT"] = "mt-MT-GraceNeural",
            _a["my-MM"] = "my-MM-NilarNeural",
            _a["nb-NO"] = "nb-NO-PernilleNeural",
            _a["nl-BE"] = "nl-BE-ArnaudNeural",
            _a["nl-NL"] = "nl-NL-ColetteNeural",
            _a["pl-PL"] = "pl-PL-AgnieszkaNeural",
            _a["ps-AF"] = "ps-AF-GulNawazNeural",
            _a["pt-BR"] = "pt-BR-FranciscaNeural",
            _a["pt-PT"] = "pt-PT-DuarteNeural",
            _a["ro-RO"] = "ro-RO-AlinaNeural",
            _a["ru-RU"] = "ru-RU-SvetlanaNeural",
            _a["si-LK"] = "si-LK-SameeraNeural",
            _a["sk-SK"] = "sk-SK-LukasNeural",
            _a["sl-SI"] = "sl-SI-PetraNeural",
            _a["so-SO"] = "so-SO-MuuseNeural",
            _a["sr-RS"] = "sr-RS-NicholasNeural",
            _a["su-ID"] = "su-ID-JajangNeural",
            _a["sv-SE"] = "sv-SE-SofieNeural",
            _a["sw-KE"] = "sw-KE-RafikiNeural",
            _a["sw-TZ"] = "sw-TZ-DaudiNeural",
            _a["ta-IN"] = "ta-IN-PallaviNeural",
            _a["ta-LK"] = "ta-LK-KumarNeural",
            _a["ta-SG"] = "ta-SG-AnbuNeural",
            _a["te-IN"] = "te-IN-MohanNeural",
            _a["th-TH"] = "th-TH-PremwadeeNeural",
            _a["tr-TR"] = "tr-TR-AhmetNeural",
            _a["uk-UA"] = "uk-UA-OstapNeural",
            _a["ur-IN"] = "ur-IN-GulNeural",
            _a["ur-PK"] = "ur-PK-AsadNeural",
            _a["uz-UZ"] = "uz-UZ-MadinaNeural",
            _a["vi-VN"] = "vi-VN-HoaiMyNeural",
            _a["zh-CN"] = "zh-CN-XiaoxiaoNeural",
            _a["zh-HK"] = "zh-HK-HiuMaanNeural",
            _a["zh-TW"] = "zh-TW-HsiaoChenNeural",
            _a["zu-ZA"] = "zu-ZA-ThandoNeural",
            _a);
        var language = this.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_SynthLanguage, "en-US");
        var voice = this.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_SynthVoice, "");
        var ssml = SpeechSynthesizer.XMLEncode(text);
        if (this.autoDetectSourceLanguage) {
            language = "en-US";
        }
        else {
            voice = voice || languageToDefaultVoice[language];
        }
        if (voice) {
            ssml = "<voice name='" + voice + "'>" + ssml + "</voice>";
        }
        ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts' xmlns:emo='http://www.w3.org/2009/10/emotionml' xml:lang='" + language + "'>" + ssml + "</speak>";
        return ssml;
    };
    /**
     * Executes speech synthesis on plain text.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakTextAsync
     * @function
     * @public
     * @param text - Text to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    SpeechSynthesizer.prototype.speakTextAsync = function (text, cb, err, stream) {
        this.speakImpl(text, false, cb, err, stream);
    };
    /**
     * Executes speech synthesis on SSML.
     * The task returns the synthesis result.
     * @member SpeechSynthesizer.prototype.speakSsmlAsync
     * @function
     * @public
     * @param ssml - SSML to be synthesized.
     * @param cb - Callback that received the SpeechSynthesisResult.
     * @param err - Callback invoked in case of an error.
     * @param stream - AudioOutputStream to receive the synthesized audio.
     */
    SpeechSynthesizer.prototype.speakSsmlAsync = function (ssml, cb, err, stream) {
        this.speakImpl(ssml, true, cb, err, stream);
    };
    /**
     * Get list of synthesis voices available.
     * The task returns the synthesis voice result.
     * @member SpeechSynthesizer.prototype.getVoicesAsync
     * @function
     * @async
     * @public
     * @param locale - Locale of voices in BCP-47 format; if left empty, get all available voices.
     * @return {Promise<SynthesisVoicesResult>} - Promise of a SynthesisVoicesResult.
     */
    SpeechSynthesizer.prototype.getVoicesAsync = function (locale) {
        if (locale === void 0) { locale = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getVoices(locale)];
            });
        });
    };
    /**
     * Dispose of associated resources.
     * @member SpeechSynthesizer.prototype.close
     * @function
     * @public
     */
    SpeechSynthesizer.prototype.close = function (cb, err) {
        Contracts_1.Contracts.throwIfDisposed(this.privDisposed);
        Exports_2.marshalPromiseToCallbacks(this.dispose(true), cb, err);
    };
    Object.defineProperty(SpeechSynthesizer.prototype, "internalData", {
        /**
         * @Internal
         * Do not use externally, object returned will change without warning or notice.
         */
        get: function () {
            return this.privAdapter;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * This method performs cleanup of resources.
     * The Boolean parameter disposing indicates whether the method is called
     * from Dispose (if disposing is true) or from the finalizer (if disposing is false).
     * Derived classes should override this method to dispose resource if needed.
     * @member SpeechSynthesizer.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - Flag to request disposal.
     */
    SpeechSynthesizer.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privDisposed) {
                            return [2 /*return*/];
                        }
                        if (!disposing) return [3 /*break*/, 2];
                        if (!this.privAdapter) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privAdapter.dispose()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.privDisposed = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    // ################################################################################################################
    // IMPLEMENTATION.
    // Move to independent class
    // ################################################################################################################
    //
    SpeechSynthesizer.prototype.createSynthesizerConfig = function (speechConfig) {
        return new Exports_1.SynthesizerConfig(speechConfig, this.privProperties);
    };
    // Creates the synthesis adapter
    SpeechSynthesizer.prototype.createSynthesisAdapter = function (authentication, connectionFactory, audioConfig, synthesizerConfig) {
        return new Exports_1.SynthesisAdapterBase(authentication, connectionFactory, synthesizerConfig, this, this.audioConfig);
    };
    SpeechSynthesizer.prototype.implCommonSynthesizeSetup = function () {
        var _this = this;
        var osPlatform = (typeof window !== "undefined") ? "Browser" : "Node";
        var osName = "unknown";
        var osVersion = "unknown";
        if (typeof navigator !== "undefined") {
            osPlatform = osPlatform + "/" + navigator.platform;
            osName = navigator.userAgent;
            osVersion = navigator.appVersion;
        }
        var synthesizerConfig = this.createSynthesizerConfig(new Exports_1.SpeechServiceConfig(new Exports_1.Context(new Exports_1.OS(osPlatform, osName, osVersion))));
        var subscriptionKey = this.privProperties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_Key, undefined);
        var authentication = (subscriptionKey && subscriptionKey !== "") ?
            new Exports_1.CognitiveSubscriptionKeyAuthentication(subscriptionKey) :
            new Exports_1.CognitiveTokenAuthentication(function () {
                var authorizationToken = _this.privProperties.getProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
                return Promise.resolve(authorizationToken);
            }, function () {
                var authorizationToken = _this.privProperties.getProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token, undefined);
                return Promise.resolve(authorizationToken);
            });
        this.privAdapter = this.createSynthesisAdapter(authentication, this.privConnectionFactory, this.audioConfig, synthesizerConfig);
        this.privAdapter.audioOutputFormat = AudioOutputFormat_1.AudioOutputFormatImpl.fromSpeechSynthesisOutputFormat(Exports_3.SpeechSynthesisOutputFormat[this.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_SynthOutputFormat, undefined)]);
        this.privRestAdapter = new Exports_1.SynthesisRestAdapter(synthesizerConfig, authentication);
    };
    SpeechSynthesizer.prototype.speakImpl = function (text, IsSsml, cb, err, dataStream) {
        var _this = this;
        try {
            Contracts_1.Contracts.throwIfDisposed(this.privDisposed);
            var requestId = Exports_2.createNoDashGuid();
            var audioDestination = void 0;
            if (dataStream instanceof Exports_3.PushAudioOutputStreamCallback) {
                audioDestination = new AudioOutputStream_1.PushAudioOutputStreamImpl(dataStream);
            }
            else if (dataStream instanceof Exports_3.PullAudioOutputStream) {
                audioDestination = dataStream;
            }
            else if (dataStream !== undefined) {
                audioDestination = new AudioFileWriter_1.AudioFileWriter(dataStream);
            }
            else {
                audioDestination = undefined;
            }
            this.synthesisRequestQueue.enqueue(new SynthesisRequest(requestId, text, IsSsml, function (e) {
                _this.privSynthesizing = false;
                if (!!cb) {
                    try {
                        cb(e);
                    }
                    catch (e) {
                        if (!!err) {
                            err(e);
                        }
                    }
                }
                cb = undefined;
                /* eslint-disable no-empty */
                _this.adapterSpeak().catch(function () { });
            }, function (e) {
                if (!!err) {
                    err(e);
                }
            }, audioDestination));
            /* eslint-disable no-empty-function */
            this.adapterSpeak().catch(function () { });
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
            // Destroy the synthesizer.
            /* eslint-disable no-empty */
            this.dispose(true).catch(function () { });
        }
    };
    SpeechSynthesizer.prototype.getVoices = function (locale) {
        return __awaiter(this, void 0, void 0, function () {
            var requestId, response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestId = Exports_2.createNoDashGuid();
                        return [4 /*yield*/, this.privRestAdapter.getVoicesList(requestId)];
                    case 1:
                        response = _a.sent();
                        if (response.ok && Array.isArray(response.json)) {
                            json = response.json;
                            if (!!locale && locale.length > 0) {
                                json = json.filter(function (item) { return !!item.Locale && item.Locale.toLowerCase() === locale.toLowerCase(); });
                            }
                            return [2 /*return*/, new Exports_3.SynthesisVoicesResult(requestId, json, undefined)];
                        }
                        else {
                            return [2 /*return*/, new Exports_3.SynthesisVoicesResult(requestId, undefined, "Error: " + response.status + ": " + response.statusText)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SpeechSynthesizer.prototype.adapterSpeak = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.privDisposed && !this.privSynthesizing)) return [3 /*break*/, 2];
                        this.privSynthesizing = true;
                        return [4 /*yield*/, this.synthesisRequestQueue.dequeue()];
                    case 1:
                        request = _a.sent();
                        return [2 /*return*/, this.privAdapter.Speak(request.text, request.isSSML, request.requestId, request.cb, request.err, request.dataStream)];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SpeechSynthesizer.XMLEncode = function (text) {
        return text.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    };
    return SpeechSynthesizer;
}());
exports.SpeechSynthesizer = SpeechSynthesizer;
var SynthesisRequest = /** @class */ (function () {
    function SynthesisRequest(requestId, text, isSSML, cb, err, dataStream) {
        this.requestId = requestId;
        this.text = text;
        this.isSSML = isSSML;
        this.cb = cb;
        this.err = err;
        this.dataStream = dataStream;
    }
    return SynthesisRequest;
}());
exports.SynthesisRequest = SynthesisRequest;

//# sourceMappingURL=SpeechSynthesizer.js.map
