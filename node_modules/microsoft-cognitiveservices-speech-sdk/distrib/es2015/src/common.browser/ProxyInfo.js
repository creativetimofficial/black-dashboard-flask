// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { PropertyId } from "../sdk/Exports";
export class ProxyInfo {
    constructor(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.privProxyHostName = proxyHostName;
        this.privProxyPort = proxyPort;
        this.privProxyUserName = proxyUserName;
        this.privProxyPassword = proxyPassword;
    }
    static fromParameters(parameters) {
        return new ProxyInfo(parameters.getProperty(PropertyId.SpeechServiceConnection_ProxyHostName), parseInt(parameters.getProperty(PropertyId.SpeechServiceConnection_ProxyPort), 10), parameters.getProperty(PropertyId.SpeechServiceConnection_ProxyUserName), parameters.getProperty(PropertyId.SpeechServiceConnection_ProxyPassword));
    }
    static fromRecognizerConfig(config) {
        return this.fromParameters(config.parameters);
    }
    get HostName() {
        return this.privProxyHostName;
    }
    get Port() {
        return this.privProxyPort;
    }
    get UserName() {
        return this.privProxyUserName;
    }
    get Password() {
        return this.privProxyPassword;
    }
}

//# sourceMappingURL=ProxyInfo.js.map
