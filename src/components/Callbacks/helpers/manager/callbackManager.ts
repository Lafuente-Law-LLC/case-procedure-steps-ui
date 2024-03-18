import { CallbackWithId } from "../../../../types";
import {
  processCallbacks,
  findCallback,
  removeCallback,
} from "../callbacksTableUtils";
import { merge } from "lodash";

class CallbackManager {
  callbacks: CallbackWithId[] = [];
  defaultCallbackFn: () => CallbackWithId;
  constructor(
    callbacks: CallbackWithId[],
    defaultCallbackFn: <T extends CallbackWithId>() => T
  ) {
    this.defaultCallbackFn = defaultCallbackFn;
    this.callbacks = processCallbacks(callbacks);
  }

  update(id: string, data: any = {}) {
    const index = this.callbacks.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Callback with id ${id} not found`);
    }
    this.callbacks[index] = merge(this.callbacks[index], data);
  }

  add(data: any = {}) {
    const newCallback = merge(this.defaultCallbackFn(), data);
    this.callbacks.push(newCallback);
  }

  remove(id: string) {
    this.callbacks = removeCallback(id, this.callbacks);
  }

  find(id: string) {
    return findCallback(id, this.callbacks);
  }
}


