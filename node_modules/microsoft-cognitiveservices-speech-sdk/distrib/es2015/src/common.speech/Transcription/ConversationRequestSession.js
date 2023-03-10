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
import { createNoDashGuid, Deferred, } from "../../common/Exports";
/**
 * Placeholder class for the Conversation Request Session. Based off RequestSession.
 * TODO: define what telemetry is required.
 */
export class ConversationRequestSession {
    constructor(sessionId) {
        this.privIsDisposed = false;
        this.privDetachables = new Array();
        this.privSessionId = sessionId;
        this.privRequestId = createNoDashGuid();
        this.privRequestCompletionDeferral = new Deferred();
    }
    get sessionId() {
        return this.privSessionId;
    }
    get requestId() {
        return this.privRequestId;
    }
    get completionPromise() {
        return this.privRequestCompletionDeferral.promise;
    }
    onPreConnectionStart(authFetchEventId, connectionId) {
        this.privSessionId = connectionId;
    }
    onAuthCompleted(isError) {
        if (isError) {
            this.onComplete();
        }
    }
    onConnectionEstablishCompleted(statusCode) {
        if (statusCode === 200) {
            return;
        }
        else if (statusCode === 403) {
            this.onComplete();
        }
    }
    onServiceTurnEndResponse(continuousRecognition) {
        if (!continuousRecognition) {
            this.onComplete();
        }
        else {
            this.privRequestId = createNoDashGuid();
        }
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.privIsDisposed) {
                // we should have completed by now. If we did not its an unknown error.
                this.privIsDisposed = true;
                for (const detachable of this.privDetachables) {
                    yield detachable.detach();
                }
            }
        });
    }
    onComplete() {
        //
    }
}

//# sourceMappingURL=ConversationRequestSession.js.map
