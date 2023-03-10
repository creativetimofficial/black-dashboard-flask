import { SessionEventArgs } from "../Exports";
import { ParticipantChangedReason } from "./Exports";
import { IParticipant } from "./IParticipant";
export declare class ConversationParticipantsChangedEventArgs extends SessionEventArgs {
    private privReason;
    private privParticipant;
    constructor(reason: ParticipantChangedReason, participants: IParticipant[], sessionId?: string);
    get reason(): ParticipantChangedReason;
    get participants(): IParticipant[];
}
