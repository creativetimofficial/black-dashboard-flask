"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceProfile = void 0;
/**
 * Defines Voice Profile class for Speaker Recognition
 * @class VoiceProfile
 */
var VoiceProfile = /** @class */ (function () {
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} profileId - profileId of this Voice Profile.
     * @param {VoiceProfileType} profileType - profileType of this Voice Profile.
     */
    function VoiceProfile(profileId, profileType) {
        this.privId = profileId;
        this.privProfileType = profileType;
    }
    Object.defineProperty(VoiceProfile.prototype, "profileId", {
        /**
         * profileId of this Voice Profile instance
         * @member VoiceProfile.prototype.profileId
         * @function
         * @public
         * @returns {string} profileId of this Voice Profile instance.
         */
        get: function () {
            return this.privId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfile.prototype, "profileType", {
        /**
         * profileType of this Voice Profile instance
         * @member VoiceProfile.prototype.profileType
         * @function
         * @public
         * @returns {VoiceProfileType} profile type of this Voice Profile instance.
         */
        get: function () {
            return this.privProfileType;
        },
        enumerable: false,
        configurable: true
    });
    return VoiceProfile;
}());
exports.VoiceProfile = VoiceProfile;

//# sourceMappingURL=VoiceProfile.js.map
