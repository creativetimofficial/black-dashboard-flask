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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentServiceRecognizer = void 0;
var Exports_1 = require("../common/Exports");
var Exports_2 = require("../sdk/Exports");
var Exports_3 = require("./Exports");
// eslint-disable-next-line max-classes-per-file
var IntentServiceRecognizer = /** @class */ (function (_super) {
    __extends(IntentServiceRecognizer, _super);
    function IntentServiceRecognizer(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, recognizer) || this;
        _this.privIntentRecognizer = recognizer;
        _this.privIntentDataSent = false;
        return _this;
    }
    IntentServiceRecognizer.prototype.setIntents = function (addedIntents, umbrellaIntent) {
        this.privAddedLmIntents = addedIntents;
        this.privUmbrellaIntent = umbrellaIntent;
        this.privIntentDataSent = true;
    };
    IntentServiceRecognizer.prototype.processTypeSpecificMessages = function (connectionMessage) {
        var _this = this;
        var result;
        var ev;
        var processed = false;
        var resultProps = new Exports_2.PropertyCollection();
        if (connectionMessage.messageType === Exports_1.MessageType.Text) {
            resultProps.setProperty(Exports_2.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.hypothesis":
                var speechHypothesis = Exports_3.SpeechHypothesis.fromJSON(connectionMessage.textBody);
                result = new Exports_2.IntentRecognitionResult(undefined, this.privRequestSession.requestId, Exports_2.ResultReason.RecognizingIntent, speechHypothesis.Text, speechHypothesis.Duration, speechHypothesis.Offset + this.privRequestSession.currentTurnAudioOffset, speechHypothesis.Language, speechHypothesis.LanguageDetectionConfidence, undefined, connectionMessage.textBody, resultProps);
                this.privRequestSession.onHypothesis(result.offset);
                ev = new Exports_2.IntentRecognitionEventArgs(result, speechHypothesis.Offset + this.privRequestSession.currentTurnAudioOffset, this.privRequestSession.sessionId);
                if (!!this.privIntentRecognizer.recognizing) {
                    try {
                        this.privIntentRecognizer.recognizing(this.privIntentRecognizer, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                processed = true;
                break;
            case "speech.phrase":
                var simple = Exports_3.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);
                result = new Exports_2.IntentRecognitionResult(undefined, this.privRequestSession.requestId, Exports_3.EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus), simple.DisplayText, simple.Duration, simple.Offset + this.privRequestSession.currentTurnAudioOffset, simple.Language, simple.LanguageDetectionConfidence, undefined, connectionMessage.textBody, resultProps);
                ev = new Exports_2.IntentRecognitionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                var sendEvent = function () {
                    if (!!_this.privIntentRecognizer.recognized) {
                        try {
                            _this.privIntentRecognizer.recognized(_this.privIntentRecognizer, ev);
                            /* eslint-disable no-empty */
                        }
                        catch (error) {
                            // Not going to let errors in the event handler
                            // trip things up.
                        }
                    }
                    // report result to promise.
                    if (!!_this.privSuccessCallback) {
                        try {
                            _this.privSuccessCallback(result);
                        }
                        catch (e) {
                            if (!!_this.privErrorCallback) {
                                _this.privErrorCallback(e);
                            }
                        }
                        // Only invoke the call back once.
                        // and if it's successful don't invoke the
                        // error after that.
                        _this.privSuccessCallback = undefined;
                        _this.privErrorCallback = undefined;
                    }
                };
                // If intent data was sent, the terminal result for this recognizer is an intent being found.
                // If no intent data was sent, the terminal event is speech recognition being successful.
                if (false === this.privIntentDataSent || Exports_2.ResultReason.NoMatch === ev.result.reason) {
                    // Advance the buffers.
                    this.privRequestSession.onPhraseRecognized(ev.offset + ev.result.duration);
                    sendEvent();
                }
                else {
                    // Squirrel away the args, when the response event arrives it will build upon them
                    // and then return
                    this.privPendingIntentArgs = ev;
                }
                processed = true;
                break;
            case "response":
                // Response from LUIS
                ev = this.privPendingIntentArgs;
                this.privPendingIntentArgs = undefined;
                if (undefined === ev) {
                    if ("" === connectionMessage.textBody) {
                        // This condition happens if there is nothing but silence in the
                        // audio sent to the service.
                        return;
                    }
                    // Odd... Not sure this can happen
                    ev = new Exports_2.IntentRecognitionEventArgs(new Exports_2.IntentRecognitionResult(), 0, this.privRequestSession.sessionId);
                }
                var intentResponse = Exports_3.IntentResponse.fromJSON(connectionMessage.textBody);
                // If LUIS didn't return anything, send the existing event, else
                // modify it to show the match.
                // See if the intent found is in the list of intents asked for.
                if (null !== intentResponse && !!intentResponse.topScoringIntent && !!intentResponse.topScoringIntent.intent) {
                    var addedIntent = this.privAddedLmIntents[intentResponse.topScoringIntent.intent];
                    if (this.privUmbrellaIntent !== undefined) {
                        addedIntent = this.privUmbrellaIntent;
                    }
                    if (!!addedIntent) {
                        var intentId = addedIntent === undefined || addedIntent.intentName === undefined ? intentResponse.topScoringIntent.intent : addedIntent.intentName;
                        var reason = ev.result.reason;
                        if (undefined !== intentId) {
                            reason = Exports_2.ResultReason.RecognizedIntent;
                        }
                        // make sure, properties is set.
                        var properties = (undefined !== ev.result.properties) ?
                            ev.result.properties : new Exports_2.PropertyCollection();
                        properties.setProperty(Exports_2.PropertyId.LanguageUnderstandingServiceResponse_JsonResult, connectionMessage.textBody);
                        ev = new Exports_2.IntentRecognitionEventArgs(new Exports_2.IntentRecognitionResult(intentId, ev.result.resultId, reason, ev.result.text, ev.result.duration, ev.result.offset, undefined, undefined, ev.result.errorDetails, ev.result.json, properties), ev.offset, ev.sessionId);
                    }
                }
                this.privRequestSession.onPhraseRecognized(ev.offset + ev.result.duration);
                if (!!this.privIntentRecognizer.recognized) {
                    try {
                        this.privIntentRecognizer.recognized(this.privIntentRecognizer, ev);
                        /* eslint-disable no-empty */
                    }
                    catch (error) {
                        // Not going to let errors in the event handler
                        // trip things up.
                    }
                }
                // report result to promise.
                if (!!this.privSuccessCallback) {
                    try {
                        this.privSuccessCallback(ev.result);
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
                processed = true;
                break;
            default:
                break;
        }
        var defferal = new Exports_1.Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    };
    // Cancels recognition.
    IntentServiceRecognizer.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_2.PropertyCollection();
        properties.setProperty(Exports_3.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[errorCode]);
        if (!!this.privIntentRecognizer.canceled) {
            var cancelEvent = new Exports_2.IntentRecognitionCanceledEventArgs(cancellationReason, error, errorCode, undefined, undefined, sessionId);
            try {
                this.privIntentRecognizer.canceled(this.privIntentRecognizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
        if (!!this.privSuccessCallback) {
            var result = new Exports_2.IntentRecognitionResult(undefined, // Intent Id
            requestId, Exports_2.ResultReason.Canceled, undefined, // Text
            undefined, // Duration
            undefined, // Offset
            undefined, // Language
            undefined, // LanguageDetectionConfidence
            error, undefined, // Json
            properties);
            try {
                this.privSuccessCallback(result);
                this.privSuccessCallback = undefined;
                /* eslint-disable no-empty */
            }
            catch (_b) { }
        }
    };
    return IntentServiceRecognizer;
}(Exports_3.ServiceRecognizerBase));
exports.IntentServiceRecognizer = IntentServiceRecognizer;

//# sourceMappingURL=IntentServiceRecognizer.js.map
