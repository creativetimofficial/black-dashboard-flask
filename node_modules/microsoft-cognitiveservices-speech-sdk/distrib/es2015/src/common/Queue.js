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
import { InvalidOperationError, ObjectDisposedError } from "./Error";
import { List } from "./List";
import { Deferred, } from "./Promise";
var SubscriberType;
(function (SubscriberType) {
    SubscriberType[SubscriberType["Dequeue"] = 0] = "Dequeue";
    SubscriberType[SubscriberType["Peek"] = 1] = "Peek";
})(SubscriberType || (SubscriberType = {}));
export class Queue {
    constructor(list) {
        this.privPromiseStore = new List();
        this.privIsDrainInProgress = false;
        this.privIsDisposing = false;
        this.privDisposeReason = null;
        this.privList = list ? list : new List();
        this.privDetachables = [];
        this.privSubscribers = new List();
        this.privDetachables.push(this.privList.onAdded(() => this.drain()));
    }
    enqueue(item) {
        this.throwIfDispose();
        this.enqueueFromPromise(new Promise((resolve) => resolve(item)));
    }
    enqueueFromPromise(promise) {
        this.throwIfDispose();
        promise.then((val) => {
            this.privList.add(val);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        }, () => { });
    }
    dequeue() {
        this.throwIfDispose();
        const deferredSubscriber = new Deferred();
        if (this.privSubscribers) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Dequeue });
            this.drain();
        }
        return deferredSubscriber.promise;
    }
    peek() {
        this.throwIfDispose();
        const deferredSubscriber = new Deferred();
        const subs = this.privSubscribers;
        if (subs) {
            this.privSubscribers.add({ deferral: deferredSubscriber, type: SubscriberType.Peek });
            this.drain();
        }
        return deferredSubscriber.promise;
    }
    length() {
        this.throwIfDispose();
        return this.privList.length();
    }
    isDisposed() {
        return this.privSubscribers == null;
    }
    drainAndDispose(pendingItemProcessor, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isDisposed() && !this.privIsDisposing) {
                this.privDisposeReason = reason;
                this.privIsDisposing = true;
                const subs = this.privSubscribers;
                if (subs) {
                    while (subs.length() > 0) {
                        const subscriber = subs.removeFirst();
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
                for (const detachable of this.privDetachables) {
                    yield detachable.detach();
                }
                if (this.privPromiseStore.length() > 0 && pendingItemProcessor) {
                    const promiseArray = [];
                    this.privPromiseStore.toArray().forEach((wrapper) => {
                        promiseArray.push(wrapper);
                    });
                    return Promise.all(promiseArray).finally(() => {
                        this.privSubscribers = null;
                        this.privList.forEach((item) => {
                            pendingItemProcessor(item);
                        });
                        this.privList = null;
                        return;
                    }).then();
                }
                else {
                    this.privSubscribers = null;
                    this.privList = null;
                }
            }
        });
    }
    dispose(reason) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.drainAndDispose(null, reason);
        });
    }
    drain() {
        if (!this.privIsDrainInProgress && !this.privIsDisposing) {
            this.privIsDrainInProgress = true;
            const subs = this.privSubscribers;
            const lists = this.privList;
            if (subs && lists) {
                while (lists.length() > 0 && subs.length() > 0 && !this.privIsDisposing) {
                    const subscriber = subs.removeFirst();
                    if (subscriber.type === SubscriberType.Peek) {
                        subscriber.deferral.resolve(lists.first());
                    }
                    else {
                        const dequeuedItem = lists.removeFirst();
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
    }
    throwIfDispose() {
        if (this.isDisposed()) {
            if (this.privDisposeReason) {
                throw new InvalidOperationError(this.privDisposeReason);
            }
            throw new ObjectDisposedError("Queue");
        }
        else if (this.privIsDisposing) {
            throw new InvalidOperationError("Queue disposing");
        }
    }
}

//# sourceMappingURL=Queue.js.map
