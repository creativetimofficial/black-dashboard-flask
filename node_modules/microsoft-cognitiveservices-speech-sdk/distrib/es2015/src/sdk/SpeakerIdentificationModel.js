// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Contracts } from "./Contracts";
import { VoiceProfileType, } from "./Exports";
/**
 * Defines SpeakerIdentificationModel class for Speaker Recognition
 * Model contains a set of profiles against which to identify speaker(s)
 * @class SpeakerIdentificationModel
 */
export class SpeakerIdentificationModel {
    constructor(profiles) {
        this.privVoiceProfiles = [];
        Contracts.throwIfNullOrUndefined(profiles, "VoiceProfiles");
        if (profiles.length === 0) {
            throw new Error("Empty Voice Profiles array");
        }
        profiles.forEach((profile) => {
            if (profile.profileType !== VoiceProfileType.TextIndependentIdentification) {
                throw new Error("Identification model can only be created from Identification profile: " + profile.profileId);
            }
            this.privVoiceProfiles.push(profile);
        });
    }
    static fromProfiles(profiles) {
        return new SpeakerIdentificationModel(profiles);
    }
    get voiceProfileIds() {
        return this.privVoiceProfiles.map((profile) => profile.profileId).join(",");
    }
}

//# sourceMappingURL=SpeakerIdentificationModel.js.map
