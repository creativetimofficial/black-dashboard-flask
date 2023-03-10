"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
exports.BackgroundEvent = void 0;
var Exports_1 = require("./Exports");
var BackgroundEvent = /** @class */ (function (_super) {
    __extends(BackgroundEvent, _super);
    function BackgroundEvent(error) {
        var _this = _super.call(this, "BackgroundEvent", Exports_1.EventType.Error) || this;
        _this.privError = error;
        return _this;
    }
    Object.defineProperty(BackgroundEvent.prototype, "error", {
        get: function () {
            return this.privError;
        },
        enumerable: false,
        configurable: true
    });
    return BackgroundEvent;
}(Exports_1.PlatformEvent));
exports.BackgroundEvent = BackgroundEvent;

//# sourceMappingURL=BackgroundError.js.map
