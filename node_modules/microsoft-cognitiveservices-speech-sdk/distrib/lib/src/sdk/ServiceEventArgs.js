"use strict";
//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEventArgs = void 0;
var Exports_1 = require("./Exports");
/**
 * Defines payload for any Service message event
 * Added in version 1.9.0
 */
var ServiceEventArgs = /** @class */ (function (_super) {
    __extends(ServiceEventArgs, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @param {string} json - json payload of the USP message.
     */
    function ServiceEventArgs(json, name, sessionId) {
        var _this = _super.call(this, sessionId) || this;
        _this.privJsonResult = json;
        _this.privEventName = name;
        return _this;
    }
    Object.defineProperty(ServiceEventArgs.prototype, "jsonString", {
        get: function () {
            return this.privJsonResult;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceEventArgs.prototype, "eventName", {
        get: function () {
            return this.privEventName;
        },
        enumerable: false,
        configurable: true
    });
    return ServiceEventArgs;
}(Exports_1.SessionEventArgs));
exports.ServiceEventArgs = ServiceEventArgs;

//# sourceMappingURL=ServiceEventArgs.js.map
