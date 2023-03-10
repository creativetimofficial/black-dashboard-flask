import { VoiceProfile } from "./Exports";
/**
 * Defines SpeakerIdentificationModel class for Speaker Recognition
 * Model contains a set of profiles against which to identify speaker(s)
 * @class SpeakerIdentificationModel
 */
export declare class SpeakerIdentificationModel {
    private privVoiceProfiles;
    private constructor();
    static fromProfiles(profiles: VoiceProfile[]): SpeakerIdentificationModel;
    get voiceProfileIds(): string;
}
