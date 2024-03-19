import Validator from "../validator/validator";
import { CallbackWithId } from "../types";

export interface CallbackManagementObj<T extends CallbackWithId> {
  createFn: () => T;
  type: T["function"];
  validator: Validator;
}

class CallbackManager {
  callbackManagementObjs = new Map<string, CallbackManagementObj<any>>();
  constructor() {}

  checkIfRegistered<T extends CallbackWithId>(type: T["function"]) {
    return this.callbackManagementObjs.has(type);
  }

  registerCallbackManagementObj<T extends CallbackWithId>(
    obj: CallbackManagementObj<T>,
  ) {
    if (this.callbackManagementObjs.has(obj.type)) {
      console.warn("Callback type already registered");
      return;
    }
    this.callbackManagementObjs.set(obj.type, obj);
  }

  getCallbackManagementObj<T extends CallbackWithId>(type: T["function"]) {
    const callback = this.callbackManagementObjs.get(type);
    if (!callback) {
      console.warn("Callback type not registered");
      return null;
    }
    return callback;
  }
}


export default CallbackManager;
