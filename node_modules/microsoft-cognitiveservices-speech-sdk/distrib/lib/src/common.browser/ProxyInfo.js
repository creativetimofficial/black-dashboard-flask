"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyInfo = void 0;
var Exports_1 = require("../sdk/Exports");
var ProxyInfo = /** @class */ (function () {
    function ProxyInfo(proxyHostName, proxyPort, proxyUserName, proxyPassword) {
        this.privProxyHostName = proxyHostName;
        this.privProxyPort = proxyPort;
        this.privProxyUserName = proxyUserName;
        this.privProxyPassword = proxyPassword;
    }
    ProxyInfo.fromParameters = function (parameters) {
        return new ProxyInfo(parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyHostName), parseInt(parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyPort), 10), parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyUserName), parameters.getProperty(Exports_1.PropertyId.SpeechServiceConnection_ProxyPassword));
    };
    ProxyInfo.fromRecognizerConfig = function (config) {
        return this.fromParameters(config.parameters);
    };
    Object.defineProperty(ProxyInfo.prototype, "HostName", {
        get: function () {
            return this.privProxyHostName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProxyInfo.prototype, "Port", {
        get: function () {
            return this.privProxyPort;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProxyInfo.prototype, "UserName", {
        get: function () {
            return this.privProxyUserName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProxyInfo.prototype, "Password", {
        get: function () {
            return this.privProxyPassword;
        },
        enumerable: false,
        configurable: true
    });
    return ProxyInfo;
}());
exports.ProxyInfo = ProxyInfo;

//# sourceMappingURL=ProxyInfo.js.map
