// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * Defines Voice Profile class for Speaker Recognition
 * @class VoiceProfile
 */
export class VoiceProfile {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} profileId - profileId of this Voice Profile.
     * @param {VoiceProfileType} profileType - profileType of this Voice Profile.
     */
    constructor(profileId, profileType) {
        this.privId = profileId;
        this.privProfileType = profileType;
    }
    /**
     * profileId of this Voice Profile instance
     * @member VoiceProfile.prototype.profileId
     * @function
     * @public
     * @returns {string} profileId of this Voice Profile instance.
     */
    get profileId() {
        return this.privId;
    }
    /**
     * profileType of this Voice Profile instance
     * @member VoiceProfile.prototype.profileType
     * @function
     * @public
     * @returns {VoiceProfileType} profile type of this Voice Profile instance.
     */
    get profileType() {
        return this.privProfileType;
    }
}

//# sourceMappingURL=VoiceProfile.js.map
