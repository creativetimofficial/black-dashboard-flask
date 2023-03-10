import { AudioConfig, SpeechTranslationConfig } from "../Exports";
import { Callback } from "./IConversation";
export declare class ConversationCommon {
    protected privAudioConfig: AudioConfig;
    protected privSpeechTranslationConfig: SpeechTranslationConfig;
    constructor(audioConfig?: AudioConfig);
    protected handleCallback(cb: Callback, err: Callback): void;
    protected handleError(error: any, err: Callback): void;
}
