// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class ConnectionOpenResponse {
    constructor(statusCode, reason) {
        this.privStatusCode = statusCode;
        this.privReason = reason;
    }
    get statusCode() {
        return this.privStatusCode;
    }
    get reason() {
        return this.privReason;
    }
}

//# sourceMappingURL=ConnectionOpenResponse.js.map
