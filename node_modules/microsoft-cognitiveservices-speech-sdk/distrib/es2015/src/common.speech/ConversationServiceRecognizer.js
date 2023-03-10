var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OutputFormat, PropertyCollection, PropertyId, ResultReason, SpeechRecognitionResult } from "../sdk/Exports";
import { DetailedSpeechPhrase, EnumTranslation, OutputFormatPropertyName, RecognitionStatus, ServiceRecognizerBase, SimpleSpeechPhrase, SpeechHypothesis } from "./Exports";
export class ConversationServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, recognizer);
        this.handleSpeechPhraseMessage = (textBody) => __awaiter(this, void 0, void 0, function* () { return this.handleSpeechPhrase(textBody); });
        this.handleSpeechHypothesisMessage = (textBody) => this.handleSpeechHypothesis(textBody);
    }
    processTypeSpecificMessages(connectionMessage) {
        void connectionMessage;
        return;
    }
    handleRecognizedCallback(result, offset, sessionId) {
        void result;
        void offset;
        void sessionId;
        return;
    }
    handleRecognizingCallback(result, duration, sessionId) {
        void result;
        void duration;
        void sessionId;
        return;
    }
    processSpeechMessages(connectionMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let processed = false;
            switch (connectionMessage.path.toLowerCase()) {
                case "speech.hypothesis":
                case "speech.fragment":
                    if (!!this.handleSpeechHypothesisMessage) {
                        this.handleSpeechHypothesisMessage(connectionMessage.textBody);
                    }
                    processed = true;
                    break;
                case "speech.phrase":
                    if (!!this.handleSpeechPhraseMessage) {
                        yield this.handleSpeechPhraseMessage(connectionMessage.textBody);
                    }
                    processed = true;
                    break;
                default:
                    break;
            }
            return processed;
        });
    }
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        // Implementing to allow inheritance
        void sessionId;
        void requestId;
        void cancellationReason;
        void errorCode;
        void error;
    }
    handleSpeechPhrase(textBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const simple = SimpleSpeechPhrase.fromJSON(textBody);
            const resultReason = EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus);
            let result;
            const resultProps = new PropertyCollection();
            resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, textBody);
            const simpleOffset = simple.Offset + this.privRequestSession.currentTurnAudioOffset;
            let offset = simpleOffset;
            this.privRequestSession.onPhraseRecognized(this.privRequestSession.currentTurnAudioOffset + simple.Offset + simple.Duration);
            if (ResultReason.Canceled === resultReason) {
                const cancelReason = EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
                const cancellationErrorCode = EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
                yield this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
            }
            else {
                if (!(this.privRequestSession.isSpeechEnded && resultReason === ResultReason.NoMatch && simple.RecognitionStatus !== RecognitionStatus.InitialSilenceTimeout)) {
                    if (this.privRecognizerConfig.parameters.getProperty(OutputFormatPropertyName) === OutputFormat[OutputFormat.Simple]) {
                        result = new SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simpleOffset, simple.Language, simple.LanguageDetectionConfidence, simple.SpeakerId, undefined, textBody, resultProps);
                    }
                    else {
                        const detailed = DetailedSpeechPhrase.fromJSON(textBody);
                        const totalOffset = detailed.Offset + this.privRequestSession.currentTurnAudioOffset;
                        const offsetCorrectedJson = detailed.getJsonWithCorrectedOffsets(totalOffset);
                        result = new SpeechRecognitionResult(this.privRequestSession.requestId, resultReason, detailed.Text, detailed.Duration, totalOffset, detailed.Language, detailed.LanguageDetectionConfidence, detailed.SpeakerId, undefined, offsetCorrectedJson, resultProps);
                        offset = result.offset;
                    }
                    this.handleRecognizedCallback(result, offset, this.privRequestSession.sessionId);
                }
            }
        });
    }
    handleSpeechHypothesis(textBody) {
        const hypothesis = SpeechHypothesis.fromJSON(textBody);
        const offset = hypothesis.Offset + this.privRequestSession.currentTurnAudioOffset;
        const resultProps = new PropertyCollection();
        resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, textBody);
        const result = new SpeechRecognitionResult(this.privRequestSession.requestId, ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, hypothesis.SpeakerId, undefined, textBody, resultProps);
        this.privRequestSession.onHypothesis(offset);
        this.handleRecognizingCallback(result, hypothesis.Duration, this.privRequestSession.sessionId);
    }
}

//# sourceMappingURL=ConversationServiceRecognizer.js.map
