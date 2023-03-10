"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogServiceTurnState = void 0;
var AudioOutputFormat_1 = require("../sdk/Audio/AudioOutputFormat");
var AudioOutputStream_1 = require("../sdk/Audio/AudioOutputStream");
var ActivityResponsePayload_1 = require("./ServiceMessages/ActivityResponsePayload");
var DialogServiceTurnState = /** @class */ (function () {
    function DialogServiceTurnState(manager, requestId) {
        this.privRequestId = requestId;
        this.privIsCompleted = false;
        this.privAudioStream = null;
        this.privTurnManager = manager;
        this.resetTurnEndTimeout();
    }
    Object.defineProperty(DialogServiceTurnState.prototype, "audioStream", {
        get: function () {
            // Called when is needed to stream.
            this.resetTurnEndTimeout();
            return this.privAudioStream;
        },
        enumerable: false,
        configurable: true
    });
    DialogServiceTurnState.prototype.processActivityPayload = function (payload, audioFormat) {
        if (payload.messageDataStreamType === ActivityResponsePayload_1.MessageDataStreamType.TextToSpeechAudio) {
            this.privAudioStream = AudioOutputStream_1.AudioOutputStream.createPullStream();
            this.privAudioStream.format = (audioFormat !== undefined) ? audioFormat : AudioOutputFormat_1.AudioOutputFormatImpl.getDefaultOutputFormat();
        }
        return this.privAudioStream;
    };
    DialogServiceTurnState.prototype.endAudioStream = function () {
        if (this.privAudioStream !== null && !this.privAudioStream.isClosed) {
            this.privAudioStream.close();
        }
    };
    DialogServiceTurnState.prototype.complete = function () {
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearTimeout(this.privTimeoutToken);
        }
        this.endAudioStream();
    };
    DialogServiceTurnState.prototype.resetTurnEndTimeout = function () {
        var _this = this;
        if (this.privTimeoutToken !== undefined) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            clearTimeout(this.privTimeoutToken);
        }
        this.privTimeoutToken = setTimeout(function () {
            _this.privTurnManager.CompleteTurn(_this.privRequestId);
            return;
        }, 2000);
    };
    return DialogServiceTurnState;
}());
exports.DialogServiceTurnState = DialogServiceTurnState;

//# sourceMappingURL=DialogServiceTurnState.js.map
