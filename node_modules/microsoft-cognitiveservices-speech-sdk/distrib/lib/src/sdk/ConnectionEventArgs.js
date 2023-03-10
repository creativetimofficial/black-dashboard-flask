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
exports.ConnectionEventArgs = void 0;
var Exports_1 = require("./Exports");
/**
 * Defines payload for connection events like Connected/Disconnected.
 * Added in version 1.2.0
 */
var ConnectionEventArgs = /** @class */ (function (_super) {
    __extends(ConnectionEventArgs, _super);
    function ConnectionEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConnectionEventArgs;
}(Exports_1.SessionEventArgs));
exports.ConnectionEventArgs = ConnectionEventArgs;

//# sourceMappingURL=ConnectionEventArgs.js.map
