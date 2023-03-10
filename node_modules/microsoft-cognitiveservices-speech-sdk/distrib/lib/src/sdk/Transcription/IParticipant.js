"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// Multi-device Conversation is a Preview feature.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = exports.User = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../Exports");
var User = /** @class */ (function () {
    function User(userId) {
        this.privUserId = userId;
    }
    Object.defineProperty(User.prototype, "userId", {
        get: function () {
            return this.privUserId;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
var Participant = /** @class */ (function () {
    function Participant(id, avatar, displayName, isHost, isMuted, isUsingTts, preferredLanguage, voice) {
        this.privId = id;
        this.privAvatar = avatar;
        this.privDisplayName = displayName;
        this.privIsHost = isHost;
        this.privIsMuted = isMuted;
        this.privIsUsingTts = isUsingTts;
        this.privPreferredLanguage = preferredLanguage;
        this.privVoice = voice;
        this.privProperties = new Exports_1.PropertyCollection();
    }
    Object.defineProperty(Participant.prototype, "avatar", {
        get: function () {
            return this.privAvatar;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "displayName", {
        get: function () {
            return this.privDisplayName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "id", {
        get: function () {
            return this.privId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "preferredLanguage", {
        get: function () {
            return this.privPreferredLanguage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "isHost", {
        get: function () {
            return this.privIsHost;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "isMuted", {
        get: function () {
            return this.privIsMuted;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "isUsingTts", {
        get: function () {
            return this.privIsUsingTts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "voice", {
        get: function () {
            return this.privVoice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Participant.prototype, "properties", {
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Participant.From = function (id, language, voice) {
        return new Participant(id, "", id, false, false, false, language, voice);
    };
    return Participant;
}());
exports.Participant = Participant;

//# sourceMappingURL=IParticipant.js.map
