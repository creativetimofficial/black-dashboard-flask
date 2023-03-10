import { AudioOutputFormatImpl } from "../sdk/Audio/AudioOutputFormat";
import { PullAudioOutputStreamImpl } from "../sdk/Audio/AudioOutputStream";
import { DialogServiceTurnStateManager } from "./DialogServiceTurnStateManager";
import { ActivityPayloadResponse } from "./ServiceMessages/ActivityResponsePayload";
export declare class DialogServiceTurnState {
    private privRequestId;
    private privIsCompleted;
    private privAudioStream;
    private privTimeoutToken;
    private privTurnManager;
    constructor(manager: DialogServiceTurnStateManager, requestId: string);
    get audioStream(): PullAudioOutputStreamImpl;
    processActivityPayload(payload: ActivityPayloadResponse, audioFormat?: AudioOutputFormatImpl): PullAudioOutputStreamImpl;
    endAudioStream(): void;
    complete(): void;
    private resetTurnEndTimeout;
}
