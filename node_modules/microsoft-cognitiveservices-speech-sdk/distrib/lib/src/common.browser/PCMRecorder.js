"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcmRecorder = void 0;
var Exports_1 = require("../common/Exports");
var PcmRecorder = /** @class */ (function () {
    function PcmRecorder(stopInputOnRelease) {
        this.privStopInputOnRelease = stopInputOnRelease;
    }
    PcmRecorder.prototype.record = function (context, mediaStream, outputStream) {
        var _this = this;
        var desiredSampleRate = 16000;
        var waveStreamEncoder = new Exports_1.RiffPcmEncoder(context.sampleRate, desiredSampleRate);
        var micInput = context.createMediaStreamSource(mediaStream);
        var attachScriptProcessor = function () {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            var scriptNode = (function () {
                var bufferSize = 0;
                try {
                    return context.createScriptProcessor(bufferSize, 1, 1);
                }
                catch (error) {
                    // Webkit (<= version 31) requires a valid bufferSize.
                    bufferSize = 2048;
                    var audioSampleRate = context.sampleRate;
                    while (bufferSize < 16384 && audioSampleRate >= (2 * desiredSampleRate)) {
                        bufferSize <<= 1;
                        audioSampleRate >>= 1;
                    }
                    return context.createScriptProcessor(bufferSize, 1, 1);
                }
            })();
            scriptNode.onaudioprocess = function (event) {
                var inputFrame = event.inputBuffer.getChannelData(0);
                if (outputStream && !outputStream.isClosed) {
                    var waveFrame = waveStreamEncoder.encode(inputFrame);
                    if (!!waveFrame) {
                        outputStream.writeStreamChunk({
                            buffer: waveFrame,
                            isEnd: false,
                            timeReceived: Date.now(),
                        });
                    }
                }
            };
            micInput.connect(scriptNode);
            scriptNode.connect(context.destination);
            _this.privMediaResources = {
                scriptProcessorNode: scriptNode,
                source: micInput,
                stream: mediaStream,
            };
        };
        // https://webaudio.github.io/web-audio-api/#audioworklet
        // Using AudioWorklet to improve audio quality and avoid audio glitches due to blocking the UI thread
        if (!!context.audioWorklet) {
            if (!this.privSpeechProcessorScript) {
                var workletScript = "class SP extends AudioWorkletProcessor {\n                    constructor(options) {\n                      super(options);\n                    }\n                    process(inputs, outputs) {\n                      const input = inputs[0];\n                      const output = [];\n                      for (let channel = 0; channel < input.length; channel += 1) {\n                        output[channel] = input[channel];\n                      }\n                      this.port.postMessage(output[0]);\n                      return true;\n                    }\n                  }\n                  registerProcessor('speech-processor', SP);";
                var blob = new Blob([workletScript], { type: "application/javascript; charset=utf-8" });
                this.privSpeechProcessorScript = URL.createObjectURL(blob);
            }
            context.audioWorklet
                .addModule(this.privSpeechProcessorScript)
                .then(function () {
                var workletNode = new AudioWorkletNode(context, "speech-processor");
                workletNode.port.onmessage = function (ev) {
                    var inputFrame = ev.data;
                    if (outputStream && !outputStream.isClosed) {
                        var waveFrame = waveStreamEncoder.encode(inputFrame);
                        if (!!waveFrame) {
                            outputStream.writeStreamChunk({
                                buffer: waveFrame,
                                isEnd: false,
                                timeReceived: Date.now(),
                            });
                        }
                    }
                };
                micInput.connect(workletNode);
                workletNode.connect(context.destination);
                _this.privMediaResources = {
                    scriptProcessorNode: workletNode,
                    source: micInput,
                    stream: mediaStream,
                };
            })
                .catch(function () {
                attachScriptProcessor();
            });
        }
        else {
            try {
                attachScriptProcessor();
            }
            catch (err) {
                throw new Error("Unable to start audio worklet node for PCMRecorder: " + err);
            }
        }
    };
    PcmRecorder.prototype.releaseMediaResources = function (context) {
        if (this.privMediaResources) {
            if (this.privMediaResources.scriptProcessorNode) {
                this.privMediaResources.scriptProcessorNode.disconnect(context.destination);
                this.privMediaResources.scriptProcessorNode = null;
            }
            if (this.privMediaResources.source) {
                this.privMediaResources.source.disconnect();
                if (this.privStopInputOnRelease) {
                    this.privMediaResources.stream.getTracks().forEach(function (track) { return track.stop(); });
                }
                this.privMediaResources.source = null;
            }
        }
    };
    PcmRecorder.prototype.setWorkletUrl = function (url) {
        this.privSpeechProcessorScript = url;
    };
    return PcmRecorder;
}());
exports.PcmRecorder = PcmRecorder;

//# sourceMappingURL=PCMRecorder.js.map
