// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
export class AuthInfo {
    constructor(headerName, token) {
        this.privHeaderName = headerName;
        this.privToken = token;
    }
    get headerName() {
        return this.privHeaderName;
    }
    get token() {
        return this.privToken;
    }
}

//# sourceMappingURL=IAuthentication.js.map
