"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoDashGuid = exports.createGuid = void 0;
var uuid_1 = require("uuid");
var createGuid = function () { return uuid_1.v4(); };
exports.createGuid = createGuid;
var createNoDashGuid = function () { return createGuid().replace(new RegExp("-", "g"), "").toUpperCase(); };
exports.createNoDashGuid = createNoDashGuid;

//# sourceMappingURL=Guid.js.map
