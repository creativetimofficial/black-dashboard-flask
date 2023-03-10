// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Deferred, MessageType, } from "../common/Exports";
import { CancellationErrorCode, IntentRecognitionCanceledEventArgs, IntentRecognitionEventArgs, IntentRecognitionResult, PropertyCollection, PropertyId, ResultReason, } from "../sdk/Exports";
import { CancellationErrorCodePropertyName, EnumTranslation, IntentResponse, ServiceRecognizerBase, SimpleSpeechPhrase, SpeechHypothesis, } from "./Exports";
// eslint-disable-next-line max-classes-per-file
export class IntentServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, recognizer);
        this.privIntentRecognizer = recognizer;
        this.privIntentDataSent = false;
    }
    setIntents(addedIntents, umbrellaIntent) {
        this.privAddedLmIntents = addedIntents;
        this.privUmbrellaIntent = umbrellaIntent;
        this.privIntentDataSent = true;
    }
    processTypeSpecificMessages(connectionMessage) {
        let result;
        let ev;
        let processed = false;
        const resultProps = new PropertyCollection();
        if (connectionMessage.messageType === MessageType.Text) {
            resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            case "speech.hypothesis":
                const speechHypothesis = SpeechHypothesis.fromJSON(connectionMessage.textBody);
                result = new IntentRecognitionResult(undefined, this.privRequestSession.requestId, ResultReason.RecognizingIntent, speechHypothesis.Text, speechHypothesis.Duration, speechHypothesis.Offset + this.privRequestSession.currentTurnAudioOffset, speechHypothesis.Language, speechHypothesis.LanguageDetectionConfidence, undefined, connectionMessage.textBody, resultProps);
                this.privRequestSession.onHypothesis(result.offset);
                ev = new IntentRecognitionEventArgs(result, speechHypothesis.Offset + this.privRequestSession.currentTurnAudioOffset, this.privRequestSession.sessionId);
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
                const simple = SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);
                result = new IntentRecognitionResult(undefined, this.privRequestSession.requestId, EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus), simple.DisplayText, simple.Duration, simple.Offset + this.privRequestSession.currentTurnAudioOffset, simple.Language, simple.LanguageDetectionConfidence, undefined, connectionMessage.textBody, resultProps);
                ev = new IntentRecognitionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                const sendEvent = () => {
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
                            this.privSuccessCallback(result);
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
                };
                // If intent data was sent, the terminal result for this recognizer is an intent being found.
                // If no intent data was sent, the terminal event is speech recognition being successful.
                if (false === this.privIntentDataSent || ResultReason.NoMatch === ev.result.reason) {
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
                    ev = new IntentRecognitionEventArgs(new IntentRecognitionResult(), 0, this.privRequestSession.sessionId);
                }
                const intentResponse = IntentResponse.fromJSON(connectionMessage.textBody);
                // If LUIS didn't return anything, send the existing event, else
                // modify it to show the match.
                // See if the intent found is in the list of intents asked for.
                if (null !== intentResponse && !!intentResponse.topScoringIntent && !!intentResponse.topScoringIntent.intent) {
                    let addedIntent = this.privAddedLmIntents[intentResponse.topScoringIntent.intent];
                    if (this.privUmbrellaIntent !== undefined) {
                        addedIntent = this.privUmbrellaIntent;
                    }
                    if (!!addedIntent) {
                        const intentId = addedIntent === undefined || addedIntent.intentName === undefined ? intentResponse.topScoringIntent.intent : addedIntent.intentName;
                        let reason = ev.result.reason;
                        if (undefined !== intentId) {
                            reason = ResultReason.RecognizedIntent;
                        }
                        // make sure, properties is set.
                        const properties = (undefined !== ev.result.properties) ?
                            ev.result.properties : new PropertyCollection();
                        properties.setProperty(PropertyId.LanguageUnderstandingServiceResponse_JsonResult, connectionMessage.textBody);
                        ev = new IntentRecognitionEventArgs(new IntentRecognitionResult(intentId, ev.result.resultId, reason, ev.result.text, ev.result.duration, ev.result.offset, undefined, undefined, ev.result.errorDetails, ev.result.json, properties), ev.offset, ev.sessionId);
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
        const defferal = new Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new PropertyCollection();
        properties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[errorCode]);
        if (!!this.privIntentRecognizer.canceled) {
            const cancelEvent = new IntentRecognitionCanceledEventArgs(cancellationReason, error, errorCode, undefined, undefined, sessionId);
            try {
                this.privIntentRecognizer.canceled(this.privIntentRecognizer, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
        if (!!this.privSuccessCallback) {
            const result = new IntentRecognitionResult(undefined, // Intent Id
            requestId, ResultReason.Canceled, undefined, // Text
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
    }
}

//# sourceMappingURL=IntentServiceRecognizer.js.map
