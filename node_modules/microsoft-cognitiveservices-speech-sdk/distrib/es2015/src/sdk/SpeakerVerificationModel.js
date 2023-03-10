// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Contracts } from "./Contracts";
import { VoiceProfileType, } from "./Exports";
/**
 * Defines SpeakerVerificationModel class for Speaker Recognition
 * Model contains a profile against which to verify a speaker
 * @class SpeakerVerificationModel
 */
export class SpeakerVerificationModel {
    constructor(profile) {
        Contracts.throwIfNullOrUndefined(profile, "VoiceProfile");
        if (profile.profileType === VoiceProfileType.TextIndependentIdentification) {
            throw new Error("Verification model cannot be created from Identification profile");
        }
        this.privVoiceProfile = profile;
    }
    static fromProfile(profile) {
        return new SpeakerVerificationModel(profile);
    }
    get voiceProfile() {
        return this.privVoiceProfile;
    }
}

//# sourceMappingURL=SpeakerVerificationModel.js.map
