import { v4 } from "uuid";
import { CallbackObj } from "../types";
import { merge } from "lodash";
import Validator from "../validator/validator";
import CallbackManager from "./callbackManager";
type CallbackWithId = CallbackObj & { id?: string };

class Callback {
  id: string;
  event: string;
  function: string;
  args: { [key: string]: any };
  validator: Validator;
  constructor(data: CallbackWithId) {
    const { id, event, function: func, args } = data;
    this.id = id || v4();
    this.event = event;
    this.function = func;
    this.validator = CallbackManager.getValidator(this.function);
    this.args = args;
  }

  validate() {
    return this.validator.validate(this);
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

  toJSON(): CallbackObj {
    return {
      event: this.event,
      function: this.function,
      args: this.args,
    };
  }
}

export default Callback;
