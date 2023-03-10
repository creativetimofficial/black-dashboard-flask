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
exports.Queue = void 0;
var Error_1 = require("./Error");
var List_1 = require("./List");
var Promise_1 = require("./Promise");
var SubscriberType;
(function (SubscriberType) {
    SubscriberType[SubscriberType["Dequeue"] = 0] = "Dequeue";
    SubscriberType[SubscriberType["Peek"] = 1] = "Peek";
})(SubscriberType || (SubscriberType = {}));
var Queue = /** @class */ (function () {
    function Queue(list) {
        var _this = this;
        this.privPromiseStore = new List_1.List();
        this.privIsDrainInProgress = false;
        this.privIsDisposing = false;
        this.privDisposeReason = null;
        this.privList = list ? list : new List_1.List();
        this.privDetachables = [];
        this.privSubscribers = new List_1.List();
        this.privDetachables.push(this.privList.onAdded(function () { return _this.drain(); }));
    }
    Queue.prototype.enqueue = function (item) {
        this.throwIfDispose();
        this.enqueueFromPromise(new Promise(function (resolve) { return resolve(item); }));
    };
    Queue.prototype.enqueueFromPromise = function (promise) {
        var _this = this;
        this.throwIfDispose();
        promise.then(function (val) {
            _this.privList.add(val);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        }, function () { });
    };
    Queue.prototype.dequeue = function () {
        this.throwIfDispose();
        var deferredSubscriber = new Promise_1.Deferred();
        if (this.privSubscribers) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Dequeue });
            this.drain();
        }
        return deferredSubscriber.promise;
    };
    Queue.prototype.peek = function () {
        this.throwIfDispose();
        var deferredSubscriber = new Promise_1.Deferred();
        var subs = this.privSubscribers;
        if (subs) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Peek });
            this.drain();
        }
        return deferredSubscriber.promise;
    };
    Queue.prototype.length = function () {
        this.throwIfDispose();
        return this.privList.length();
    };
    Queue.prototype.isDisposed = function () {
        return this.privSubscribers == null;
    };
    Queue.prototype.drainAndDispose = function (pendingItemProcessor, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var subs, subscriber, _i, _a, detachable, promiseArray_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.isDisposed() && !this.privIsDisposing)) return [3 /*break*/, 5];
                        this.privDisposeReason = reason;
                        this.privIsDisposing = true;
                        subs = this.privSubscribers;
                        if (subs) {
                            while (subs.length() > 0) {
                                subscriber = subs.removeFirst();
                                // TODO: this needs work (Resolve(null) instead?).
                                subscriber.deferral.resolve(undefined);
                                // subscriber.deferral.reject("Disposed");
                            }
                            // note: this block assumes cooperative multitasking, i.e.,
                            // between the if-statement and the assignment there are no
                            // thread switches.
                            // Reason is that between the initial const = this.; and this
                            // point there is the derral.resolve() operation that might have
                            // caused recursive calls to the Queue, especially, calling
                            // Dispose() on the queue alredy (which would reset the var
                            // here to null!).
                            // That should generally hold true for javascript...
                            if (this.privSubscribers === subs) {
                                this.privSubscribers = subs;
                            }
                        }
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
                    case 4:
                        if (this.privPromiseStore.length() > 0 && pendingItemProcessor) {
                            promiseArray_1 = [];
                            this.privPromiseStore.toArray().forEach(function (wrapper) {
                                promiseArray_1.push(wrapper);
                            });
                            return [2 /*return*/, Promise.all(promiseArray_1).finally(function () {
                                    _this.privSubscribers = null;
                                    _this.privList.forEach(function (item) {
                                        pendingItemProcessor(item);
                                    });
                                    _this.privList = null;
                                    return;
                                }).then()];
                        }
                        else {
                            this.privSubscribers = null;
                            this.privList = null;
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Queue.prototype.dispose = function (reason) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.drainAndDispose(null, reason)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Queue.prototype.drain = function () {
        if (!this.privIsDrainInProgress && !this.privIsDisposing) {
            this.privIsDrainInProgress = true;
            var subs = this.privSubscribers;
            var lists = this.privList;
            if (subs && lists) {
                while (lists.length() > 0 && subs.length() > 0 && !this.privIsDisposing) {
                    var subscriber = subs.removeFirst();
                    if (subscriber.type === SubscriberType.Peek) {
                        subscriber.deferral.resolve(lists.first());
                    }
                    else {
                        var dequeuedItem = lists.removeFirst();
                        subscriber.deferral.resolve(dequeuedItem);
                    }
                }
                // note: this block assumes cooperative multitasking, i.e.,
                // between the if-statement and the assignment there are no
                // thread switches.
                // Reason is that between the initial const = this.; and this
                // point there is the derral.resolve() operation that might have
                // caused recursive calls to the Queue, especially, calling
                // Dispose() on the queue alredy (which would reset the var
                // here to null!).
                // That should generally hold true for javascript...
                if (this.privSubscribers === subs) {
                    this.privSubscribers = subs;
                }
                // note: this block assumes cooperative multitasking, i.e.,
                // between the if-statement and the assignment there are no
                // thread switches.
                // Reason is that between the initial const = this.; and this
                // point there is the derral.resolve() operation that might have
                // caused recursive calls to the Queue, especially, calling
                // Dispose() on the queue alredy (which would reset the var
                // here to null!).
                // That should generally hold true for javascript...
                if (this.privList === lists) {
                    this.privList = lists;
                }
            }
            this.privIsDrainInProgress = false;
        }
    };
    Queue.prototype.throwIfDispose = function () {
        if (this.isDisposed()) {
            if (this.privDisposeReason) {
                throw new Error_1.InvalidOperationError(this.privDisposeReason);
            }
            throw new Error_1.ObjectDisposedError("Queue");
        }
        else if (this.privIsDisposing) {
            throw new Error_1.InvalidOperationError("Queue disposing");
        }
    };
    return Queue;
}());
exports.Queue = Queue;

//# sourceMappingURL=Queue.js.map
