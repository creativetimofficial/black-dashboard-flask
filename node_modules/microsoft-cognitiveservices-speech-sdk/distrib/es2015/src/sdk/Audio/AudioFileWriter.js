// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fs from "fs";
import { Contracts } from "../Contracts";
export class AudioFileWriter {
    constructor(filename) {
        Contracts.throwIfNullOrUndefined(fs.openSync, "\nFile System access not available, please use Push or PullAudioOutputStream");
        this.privFd = fs.openSync(filename, "w");
    }
    set format(format) {
        Contracts.throwIfNotUndefined(this.privAudioFormat, "format is already set");
        this.privAudioFormat = format;
        let headerOffset = 0;
        if (this.privAudioFormat.hasHeader) {
            headerOffset = this.privAudioFormat.header.byteLength;
        }
        if (this.privFd !== undefined) {
            this.privWriteStream = fs.createWriteStream("", { fd: this.privFd, start: headerOffset, autoClose: false });
        }
    }
    write(buffer) {
        Contracts.throwIfNullOrUndefined(this.privAudioFormat, "must set format before writing.");
        if (this.privWriteStream !== undefined) {
            this.privWriteStream.write(new Uint8Array(buffer.slice(0)));
        }
    }
    close() {
        if (this.privFd !== undefined) {
            this.privWriteStream.on("finish", () => {
                if (this.privAudioFormat.hasHeader) {
                    this.privAudioFormat.updateHeader(this.privWriteStream.bytesWritten);
                    fs.writeSync(this.privFd, new Int8Array(this.privAudioFormat.header), 0, this.privAudioFormat.header.byteLength, 0);
                }
                fs.closeSync(this.privFd);
                this.privFd = undefined;
            });
            this.privWriteStream.end();
        }
    }
    id() {
        return this.privId;
    }
}

//# sourceMappingURL=AudioFileWriter.js.map
