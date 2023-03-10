// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SynthesisAdapterBase } from "../../common.speech/Exports";
import { BackgroundEvent, createNoDashGuid, Events } from "../../common/Exports";
import { PullAudioOutputStreamImpl } from "./AudioOutputStream";
import { AudioFormatTag } from "./AudioStreamFormat";
const MediaDurationPlaceholderSeconds = 60 * 30;
const AudioFormatToMimeType = {
    [AudioFormatTag.PCM]: "audio/wav",
    [AudioFormatTag.MuLaw]: "audio/x-wav",
    [AudioFormatTag.MP3]: "audio/mpeg",
    [AudioFormatTag.OGG_OPUS]: "audio/ogg",
    [AudioFormatTag.WEBM_OPUS]: "audio/webm; codecs=opus",
    [AudioFormatTag.ALaw]: "audio/x-wav",
    [AudioFormatTag.FLAC]: "audio/flac",
};
/**
 * Represents the speaker playback audio destination, which only works in browser.
 * Note: the SDK will try to use <a href="https://www.w3.org/TR/media-source/">Media Source Extensions</a> to play audio.
 * Mp3 format has better supports on Microsoft Edge, Chrome and Safari (desktop), so, it's better to specify mp3 format for playback.
 * @class SpeakerAudioDestination
 * Updated in version 1.17.0
 */
export class SpeakerAudioDestination {
    constructor(audioDestinationId) {
        this.privPlaybackStarted = false;
        this.privAppendingToBuffer = false;
        this.privMediaSourceOpened = false;
        this.privBytesReceived = 0;
        this.privId = audioDestinationId ? audioDestinationId : createNoDashGuid();
        this.privIsPaused = false;
        this.privIsClosed = false;
    }
    id() {
        return this.privId;
    }
    write(buffer, cb, err) {
        if (this.privAudioBuffer !== undefined) {
            this.privAudioBuffer.push(buffer);
            this.updateSourceBuffer().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined) {
            this.privAudioOutputStream.write(buffer);
            this.privBytesReceived += buffer.byteLength;
        }
    }
    close(cb, err) {
        this.privIsClosed = true;
        if (this.privSourceBuffer !== undefined) {
            this.handleSourceBufferUpdateEnd().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
        }
        else if (this.privAudioOutputStream !== undefined && typeof window !== "undefined") {
            if ((this.privFormat.formatTag === AudioFormatTag.PCM || this.privFormat.formatTag === AudioFormatTag.MuLaw
                || this.privFormat.formatTag === AudioFormatTag.ALaw) && this.privFormat.hasHeader === false) {
                // eslint-disable-next-line no-console
                console.warn("Play back is not supported for raw PCM, mulaw or alaw format without header.");
                if (!!this.onAudioEnd) {
                    this.onAudioEnd(this);
                }
            }
            else {
                let receivedAudio = new ArrayBuffer(this.privBytesReceived);
                this.privAudioOutputStream.read(receivedAudio).then(() => {
                    receivedAudio = SynthesisAdapterBase.addHeader(receivedAudio, this.privFormat);
                    const audioBlob = new Blob([receivedAudio], { type: AudioFormatToMimeType[this.privFormat.formatTag] });
                    this.privAudio.src = window.URL.createObjectURL(audioBlob);
                    this.notifyPlayback().then(() => {
                        if (!!cb) {
                            cb();
                        }
                    }, (error) => {
                        if (!!err) {
                            err(error);
                        }
                    });
                }, (error) => {
                    if (!!err) {
                        err(error);
                    }
                });
            }
        }
        else {
            // unsupported format, call onAudioEnd directly.
            if (!!this.onAudioEnd) {
                this.onAudioEnd(this);
            }
        }
    }
    set format(format) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (typeof (AudioContext) !== "undefined" || (typeof (window) !== "undefined" && typeof (window.webkitAudioContext) !== "undefined")) {
            this.privFormat = format;
            const mimeType = AudioFormatToMimeType[this.privFormat.formatTag];
            if (mimeType === undefined) {
                // eslint-disable-next-line no-console
                console.warn(`Unknown mimeType for format ${AudioFormatTag[this.privFormat.formatTag]}; playback is not supported.`);
            }
            else if (typeof (MediaSource) !== "undefined" && MediaSource.isTypeSupported(mimeType)) {
                this.privAudio = new Audio();
                this.privAudioBuffer = [];
                this.privMediaSource = new MediaSource();
                this.privAudio.src = URL.createObjectURL(this.privMediaSource);
                this.privAudio.load();
                this.privMediaSource.onsourceopen = () => {
                    this.privMediaSourceOpened = true;
                    this.privMediaSource.duration = MediaDurationPlaceholderSeconds;
                    this.privSourceBuffer = this.privMediaSource.addSourceBuffer(mimeType);
                    this.privSourceBuffer.onupdate = () => {
                        this.updateSourceBuffer().catch((reason) => {
                            Events.instance.onEvent(new BackgroundEvent(reason));
                        });
                    };
                    this.privSourceBuffer.onupdateend = () => {
                        this.handleSourceBufferUpdateEnd().catch((reason) => {
                            Events.instance.onEvent(new BackgroundEvent(reason));
                        });
                    };
                    this.privSourceBuffer.onupdatestart = () => {
                        this.privAppendingToBuffer = false;
                    };
                };
                this.updateSourceBuffer().catch((reason) => {
                    Events.instance.onEvent(new BackgroundEvent(reason));
                });
            }
            else {
                // eslint-disable-next-line no-console
                console.warn(`Format ${AudioFormatTag[this.privFormat.formatTag]} could not be played by MSE, streaming playback is not enabled.`);
                this.privAudioOutputStream = new PullAudioOutputStreamImpl();
                this.privAudioOutputStream.format = this.privFormat;
                this.privAudio = new Audio();
            }
        }
    }
    get volume() {
        var _a, _b;
        return (_b = (_a = this.privAudio) === null || _a === void 0 ? void 0 : _a.volume) !== null && _b !== void 0 ? _b : -1;
    }
    set volume(volume) {
        if (!!this.privAudio) {
            this.privAudio.volume = volume;
        }
    }
    mute() {
        if (!!this.privAudio) {
            this.privAudio.muted = true;
        }
    }
    unmute() {
        if (!!this.privAudio) {
            this.privAudio.muted = false;
        }
    }
    get isClosed() {
        return this.privIsClosed;
    }
    get currentTime() {
        if (this.privAudio !== undefined) {
            return this.privAudio.currentTime;
        }
        return -1;
    }
    pause() {
        if (!this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.pause();
            this.privIsPaused = true;
        }
    }
    resume(cb, err) {
        if (this.privIsPaused && this.privAudio !== undefined) {
            this.privAudio.play().then(() => {
                if (!!cb) {
                    cb();
                }
            }, (error) => {
                if (!!err) {
                    err(error);
                }
            });
            this.privIsPaused = false;
        }
    }
    get internalAudio() {
        return this.privAudio;
    }
    updateSourceBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privAudioBuffer !== undefined && (this.privAudioBuffer.length > 0) && this.sourceBufferAvailable()) {
                this.privAppendingToBuffer = true;
                const binary = this.privAudioBuffer.shift();
                try {
                    this.privSourceBuffer.appendBuffer(binary);
                }
                catch (error) {
                    this.privAudioBuffer.unshift(binary);
                    // eslint-disable-next-line no-console
                    console.log("buffer filled, pausing addition of binaries until space is made");
                    return;
                }
                yield this.notifyPlayback();
            }
            else if (this.canEndStream()) {
                yield this.handleSourceBufferUpdateEnd();
            }
        });
    }
    handleSourceBufferUpdateEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.canEndStream() && this.sourceBufferAvailable()) {
                this.privMediaSource.endOfStream();
                yield this.notifyPlayback();
            }
        });
    }
    notifyPlayback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.privPlaybackStarted && this.privAudio !== undefined) {
                this.privPlaybackStarted = true;
                if (!!this.onAudioStart) {
                    this.onAudioStart(this);
                }
                this.privAudio.onended = () => {
                    if (!!this.onAudioEnd) {
                        this.onAudioEnd(this);
                    }
                };
                if (!this.privIsPaused) {
                    yield this.privAudio.play();
                }
            }
        });
    }
    canEndStream() {
        return (this.isClosed && this.privSourceBuffer !== undefined && (this.privAudioBuffer.length === 0)
            && this.privMediaSourceOpened && !this.privAppendingToBuffer && this.privMediaSource.readyState === "open");
    }
    sourceBufferAvailable() {
        return (this.privSourceBuffer !== undefined && !this.privSourceBuffer.updating);
    }
}

//# sourceMappingURL=SpeakerAudioDestination.js.map
