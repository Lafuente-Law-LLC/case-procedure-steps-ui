import { v4 } from "uuid";
import Validator from "../validator/validator";
import { CallbackObj } from "../types";
import { merge } from "lodash";

export type CallbackAdminObj = {
  type: string;
  createFn: () => CallbackObj & { id: string };
  validator: Validator;
};

const isValidCallbackManagementObj = (obj: any): obj is CallbackAdminObj => {
  return (
    typeof obj.type === "string" &&
    typeof obj.createFn === "function" &&
    typeof obj.validator === "object" &&
    obj.validator instanceof Validator
  );
};

class Callback {
  static callbackAdminObjs = new Map<string, CallbackAdminObj>();
  static checkIfRegistered(type: string) {
    return this.callbackAdminObjs.has(type);
  }
  static registerCallbackAdminObj(obj: CallbackAdminObj) {
    if (!isValidCallbackManagementObj(obj)) {
      throw new Error("Invalid callback management object");
    }
    if (this.callbackAdminObjs.has(obj.type)) {
      console.warn("Callback type already registered");
      return;
    }
    this.callbackAdminObjs.set(obj.type, obj);
  }

  static getCallbackAdminObj(type: string) {
    return this.callbackAdminObjs.get(type);
  }

  id: string;
  event: string;
  function: string;
  args: Record<string, any>;
  validator: Validator;
  constructor(data: CallbackObj & { id?: string }) {
    const { id, event, function: func, args } = data;
    this.id = id || v4();
    this.event = event;
    this.function = func;
    this.args = args;
    this.validator = this.getValidator();
  }




  private getValidator() {
    const callbackAdminObj = Callback.callbackAdminObjs.get(this.function);
    if (!callbackAdminObj) {
      throw new Error("Callback type not registered");
    }
    return callbackAdminObj.validator;
  }

  update(data: Partial<CallbackObj>) {
    const { event, args } = data;
    this.event = event || this.event;
    if (args) {
      this.args = merge(this.args, args);
    }
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

  toJSON(): CallbackObj {
    return {
      event: this.event,
      function: this.function,
      args: this.args,
    };
  }
}

export default Callback;
