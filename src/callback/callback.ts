import { v4 } from "uuid";
import type Validator from "../validator/validator";
import { CallbackObj } from "../types";

export type CallbackManagementObj = {
  type: string;
  createFn: () => CallbackObj & { id: string };
  validator: Validator;
};

class Callback {
  static callbackManagementObjs = new Map<string, CallbackManagementObj>();
  static checkIfRegistered(type: string) {
    return this.callbackManagementObjs.has(type);
  }
  static registerCallbackManagementObj(obj: CallbackManagementObj) {
    if (this.callbackManagementObjs.has(obj.type)) {
      console.warn("Callback type already registered");
      return;
    }
    this.callbackManagementObjs.set(obj.type, obj);
  }

  id: string;
  event: string;
  function: string;
  args: Record<string, any>;
  validator: Validator;
  constructor(data: any) {
    const { id, event, function: func, args } = data;
    this.id = id || v4();
    this.event = event;
    this.function = func;
    this.args = args;
    this.validator = this.getValidator();
  }

  private getValidator() {
    const callbackMngObj = Callback.callbackManagementObjs.get(this.function);
    if (!callbackMngObj) {
      throw new Error("Callback type not registered");
    }
    return callbackMngObj.validator;
  }

  get type() {
    return this.function;
  }

  valid() {
    return this.validator.validate(this)[0];
  }
  validate() {
    return this.validator.validate(this);
  }

  json() {
    return {
      id: this.id,
      event: this.event,
      function: this.function,
      args: this.args,
    };
  }
}

export default Callback;