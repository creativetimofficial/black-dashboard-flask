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
import { ArgumentNullError, createNoDashGuid, } from "../common/Exports";
import { WebsocketMessageAdapter } from "./WebsocketMessageAdapter";
export class WebsocketConnection {
    constructor(uri, queryParameters, headers, messageFormatter, proxyInfo, enableCompression = false, connectionId) {
        this.privIsDisposed = false;
        if (!uri) {
            throw new ArgumentNullError("uri");
        }
        if (!messageFormatter) {
            throw new ArgumentNullError("messageFormatter");
        }
        this.privMessageFormatter = messageFormatter;
        let queryParams = "";
        let i = 0;
        if (queryParameters) {
            for (const paramName in queryParameters) {
                if (paramName) {
                    queryParams += ((i === 0) && (uri.indexOf("?") === -1)) ? "?" : "&";
                    const key = encodeURIComponent(paramName);
                    queryParams += key;
                    let val = queryParameters[paramName];
                    if (val) {
                        val = encodeURIComponent(val);
                        queryParams += `=${val}`;
                    }
                    i++;
                }
            }
        }
        if (headers) {
            for (const headerName in headers) {
                if (headerName) {
                    queryParams += ((i === 0) && (uri.indexOf("?") === -1)) ? "?" : "&";
                    const val = encodeURIComponent(headers[headerName]);
                    queryParams += `${headerName}=${val}`;
                    i++;
                }
            }
        }
        this.privUri = uri + queryParams;
        this.privId = connectionId ? connectionId : createNoDashGuid();
        this.privConnectionMessageAdapter = new WebsocketMessageAdapter(this.privUri, this.id, this.privMessageFormatter, proxyInfo, headers, enableCompression);
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            this.privIsDisposed = true;
            if (this.privConnectionMessageAdapter) {
                yield this.privConnectionMessageAdapter.close();
            }
        });
    }
    isDisposed() {
        return this.privIsDisposed;
    }
    get id() {
        return this.privId;
    }
    get uri() {
        return this.privUri;
    }
    state() {
        return this.privConnectionMessageAdapter.state;
    }
    open() {
        return this.privConnectionMessageAdapter.open();
    }
    send(message) {
        return this.privConnectionMessageAdapter.send(message);
    }
    read() {
        return this.privConnectionMessageAdapter.read();
    }
    get events() {
        return this.privConnectionMessageAdapter.events;
    }
}

//# sourceMappingURL=WebsocketConnection.js.map
