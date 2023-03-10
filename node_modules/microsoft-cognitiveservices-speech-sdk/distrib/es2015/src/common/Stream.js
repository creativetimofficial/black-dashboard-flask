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
import { InvalidOperationError } from "./Error";
import { createNoDashGuid } from "./Guid";
import { Queue } from "./Queue";
export class Stream {
    constructor(streamId) {
        this.privIsWriteEnded = false;
        this.privIsReadEnded = false;
        this.privId = streamId ? streamId : createNoDashGuid();
        this.privReaderQueue = new Queue();
    }
    get isClosed() {
        return this.privIsWriteEnded;
    }
    get isReadEnded() {
        return this.privIsReadEnded;
    }
    get id() {
        return this.privId;
    }
    close() {
        if (!this.privIsWriteEnded) {
            this.writeStreamChunk({
                buffer: null,
                isEnd: true,
                timeReceived: Date.now(),
            });
            this.privIsWriteEnded = true;
        }
    }
    writeStreamChunk(streamChunk) {
        this.throwIfClosed();
        if (!this.privReaderQueue.isDisposed()) {
            try {
                this.privReaderQueue.enqueue(streamChunk);
            }
            catch (e) {
                // Do nothing
            }
        }
    }
    read() {
        if (this.privIsReadEnded) {
            throw new InvalidOperationError("Stream read has already finished");
        }
        return this.privReaderQueue
            .dequeue()
            .then((streamChunk) => __awaiter(this, void 0, void 0, function* () {
            if (streamChunk === undefined || streamChunk.isEnd) {
                yield this.privReaderQueue.dispose("End of stream reached");
            }
            return streamChunk;
        }));
    }
    readEnded() {
        if (!this.privIsReadEnded) {
            this.privIsReadEnded = true;
            this.privReaderQueue = new Queue();
        }
    }
    throwIfClosed() {
        if (this.privIsWriteEnded) {
            throw new InvalidOperationError("Stream closed");
        }
    }
}

//# sourceMappingURL=Stream.js.map
