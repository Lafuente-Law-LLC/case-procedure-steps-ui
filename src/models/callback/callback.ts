import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";
import { CallbackObj } from "../../types";

export type CallbackProps = {
  id?: string;
  eventName: string;
  functionName: string;
  args: Record<string, any>;
};

class Callback {
  id: string;
  eventName: string;
  functionName: string;
  args: Record<string, any>;

  constructor({ id, eventName, functionName, args }: CallbackProps) {
    this.id = id || uuidv4();
    this.eventName = eventName;
    this.functionName = functionName;
    this.args = args;
  }

  updateEvent(event: string) {
    this.eventName = event;
  }
  updateArgs(args: Record<string, any>) {
    this.args = args;
  }

  update({ functionName, eventName, args }: Partial<Callback>) {
    this.functionName = functionName ?? this.functionName;
    this.eventName = eventName ?? this.eventName;
    this.args = args ? merge(this.args, args) : this.args;
  }

  get type() {
    return this.functionName;
  }

  toJSON(): CallbackObj {
    return {
      event: this.eventName,
      function: this.functionName,
      args: this.args,
    };
  }
}

export default Callback;
