import { CallbackWithId } from "../../../../types";
import {
  processCallbacks,
  findCallback,
  removeCallback,
} from "../callbacksTableUtils";
import { merge } from "lodash";
/**
 * Manages a collection of callbacks, providing functionality to add, update,
 * find, and remove callbacks. This class ensures efficient handling of callback
 * objects throughout their lifecycle within an application, supporting
 * operations such as updating callback details, adding new callbacks based on
 * default configurations, removing callbacks by their unique identifiers, and
 * retrieving specific callbacks for inspection or further operations.
 *
 * @template T - A type extending CallbackWithId, specifying the structure of
 *   the callbacks managed by this class.
 */
class CallbackManager<T extends CallbackWithId> {
  callbacks: CallbackWithId[] = [];
  defaultCallbackFn: () => T;
  constructor(callbacks: CallbackWithId[], defaultCallbackFn: () => T) {
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

export default CallbackManager;
