import { CallbackWithId } from "../../types";
import {
    processCallbacks,
    findCallback,
    removeCallback,
} from "./callbacksTableUtils";

class CallbackManager<T extends CallbackWithId> {
    callbacks: CallbackWithId[] = [];
    defaultCallbackFn: () => T;
    constructor(callbacks: CallbackWithId[], defaultCallbackFn: () => T) {
        this.defaultCallbackFn = defaultCallbackFn;
        this.callbacks = processCallbacks(callbacks);
    }

    update(id: string, callback: Partial<T>) {
        const index = this.callbacks.findIndex((c) => c.id === id);
        if (index === -1) {
            throw new Error(`Callback with id ${id} not found`);
        }
        this.callbacks[index] = { ...this.callbacks[index], ...callback };
    }

    add(callback: Partial<T> = {}) {
        const newCallback = { ...this.defaultCallbackFn(), ...callback };
        this.callbacks.push(newCallback);
    }

    remove(id: string) {
        this.callbacks = removeCallback(id, this.callbacks);
    }

    find(id: string) {
        return findCallback(id, this.callbacks);
    }
}

export default CallbackManager;
