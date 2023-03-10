"use strict";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRequestSession = void 0;
var Exports_1 = require("../../common/Exports");
/**
 * Placeholder class for the Conversation Request Session. Based off RequestSession.
 * TODO: define what telemetry is required.
 */
var ConversationRequestSession = /** @class */ (function () {
    function ConversationRequestSession(sessionId) {
        this.privIsDisposed = false;
        this.privDetachables = new Array();
        this.privSessionId = sessionId;
        this.privRequestId = Exports_1.createNoDashGuid();
        this.privRequestCompletionDeferral = new Exports_1.Deferred();
    }
    Object.defineProperty(ConversationRequestSession.prototype, "sessionId", {
        get: function () {
            return this.privSessionId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationRequestSession.prototype, "requestId", {
        get: function () {
            return this.privRequestId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConversationRequestSession.prototype, "completionPromise", {
        get: function () {
            return this.privRequestCompletionDeferral.promise;
        },
        enumerable: false,
        configurable: true
    });
    ConversationRequestSession.prototype.onPreConnectionStart = function (authFetchEventId, connectionId) {
        this.privSessionId = connectionId;
    };
    ConversationRequestSession.prototype.onAuthCompleted = function (isError) {
        if (isError) {
            this.onComplete();
        }
    };
    ConversationRequestSession.prototype.onConnectionEstablishCompleted = function (statusCode) {
        if (statusCode === 200) {
            return;
        }
        else if (statusCode === 403) {
            this.onComplete();
        }
    };
    ConversationRequestSession.prototype.onServiceTurnEndResponse = function (continuousRecognition) {
        if (!continuousRecognition) {
            this.onComplete();
        }
        else {
            this.privRequestId = Exports_1.createNoDashGuid();
        }
    };
    ConversationRequestSession.prototype.dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, detachable;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.privIsDisposed) return [3 /*break*/, 4];
                        // we should have completed by now. If we did not its an unknown error.
                        this.privIsDisposed = true;
                        _i = 0, _a = this.privDetachables;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        detachable = _a[_i];
                        return [4 /*yield*/, detachable.detach()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConversationRequestSession.prototype.onComplete = function () {
        //
    };
    return ConversationRequestSession;
}());
exports.ConversationRequestSession = ConversationRequestSession;

//# sourceMappingURL=ConversationRequestSession.js.map
