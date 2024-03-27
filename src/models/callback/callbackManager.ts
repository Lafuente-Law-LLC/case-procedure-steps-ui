import { CallbackObj } from "../types";
import Validator from "../validator/validator";
import type { CallbackConfigObj } from "./types";

class CallbackManager {
  callbackConfigObjs = new Map<string, CallbackConfigObj>();

  registerCallbackConfig(name: string, config: CallbackConfigObj) {
    this.callbackConfigObjs.set(name, config);
  }

  getValidator(name: string) {
    const val = this.callbackConfigObjs.get(name)?.validator;
    if (!val) {
      throw new Error(`Validator ${name} not found`);
    }
    return val;
  }

  getDefaultCallback(name: string) {
    const defaultFn = this.callbackConfigObjs.get(name)?.defaultFn;
    if (!defaultFn) {
      throw new Error(`Default function ${name} not found`);
    }
    return defaultFn;
  }
}

export default CallbackManager;
