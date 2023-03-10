// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ArgumentNullError, ConnectionMessage } from "../common/Exports";
import { HeaderNames } from "./HeaderNames";
export class SpeechConnectionMessage extends ConnectionMessage {
    constructor(messageType, path, requestId, contentType, body, streamId, additionalHeaders, id) {
        if (!path) {
            throw new ArgumentNullError("path");
        }
        if (!requestId) {
            throw new ArgumentNullError("requestId");
        }
        const headers = {};
        headers[HeaderNames.Path] = path;
        headers[HeaderNames.RequestId] = requestId;
        headers[HeaderNames.RequestTimestamp] = new Date().toISOString();
        if (contentType) {
            headers[HeaderNames.ContentType] = contentType;
        }
        if (streamId) {
            headers[HeaderNames.RequestStreamId] = streamId;
        }
        if (additionalHeaders) {
            for (const headerName in additionalHeaders) {
                if (headerName) {
                    headers[headerName] = additionalHeaders[headerName];
                }
            }
        }
        if (id) {
            super(messageType, body, headers, id);
        }
        else {
            super(messageType, body, headers);
        }
        this.privPath = path;
        this.privRequestId = requestId;
        this.privContentType = contentType;
        this.privStreamId = streamId;
        this.privAdditionalHeaders = additionalHeaders;
    }
    get path() {
        return this.privPath;
    }
    get requestId() {
        return this.privRequestId;
    }
    get contentType() {
        return this.privContentType;
    }
    get streamId() {
        return this.privStreamId;
    }
    get additionalHeaders() {
        return this.privAdditionalHeaders;
    }
    static fromConnectionMessage(message) {
        let path = null;
        let requestId = null;
        let contentType = null;
        // let requestTimestamp = null;
        let streamId = null;
        const additionalHeaders = {};
        if (message.headers) {
            for (const headerName in message.headers) {
                if (headerName) {
                    if (headerName.toLowerCase() === HeaderNames.Path.toLowerCase()) {
                        path = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames.RequestId.toLowerCase()) {
                        requestId = message.headers[headerName];
                        // } else if (headerName.toLowerCase() === HeaderNames.RequestTimestamp.toLowerCase()) {
                        //  requestTimestamp = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames.ContentType.toLowerCase()) {
                        contentType = message.headers[headerName];
                    }
                    else if (headerName.toLowerCase() === HeaderNames.RequestStreamId.toLowerCase()) {
                        streamId = message.headers[headerName];
                    }
                    else {
                        additionalHeaders[headerName] = message.headers[headerName];
                    }
                }
            }
        }
        return new SpeechConnectionMessage(message.messageType, path, requestId, contentType, message.body, streamId, additionalHeaders, message.id);
    }
}

//# sourceMappingURL=SpeechConnectionMessage.Internal.js.map
