
import { CallbackObj } from "../types";
import Validator from "../validator/validator";


export type CallbackConfigObj = {
  defaultFn: (...args: any[]) => CallbackObj;
  validator: Validator;
}
class CallbackManager { 
  static callbackConfigObjs = new Map<string, CallbackConfigObj>(); 
  static registerCallbackConfig(name: string, config: CallbackConfigObj) {
    this.callbackConfigObjs.set(name, config);
  }

  static getValidator(name: string) {
    const val = this.callbackConfigObjs.get(name)?.validator;
    if (!val) {
      throw new Error(`Validator ${name} not found`);
    }
    return val;
  }

  static getDefaultCallback(name: string) {
    const defaultFn = this.callbackConfigObjs.get(name)?.defaultFn;
    if (!defaultFn) {
      throw new Error(`Default function ${name} not found`);
    }
    return defaultFn();
  }
}

export default CallbackManager;
