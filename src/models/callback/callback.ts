import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";
import { CallbackObj } from "../../types";

type CallbackProps = {
  id?: string;
  event: string;
  functionName: string;
  args: Record<string, any>;
};

class Callback {
  id: string;
  event: string;
  functionName: string;
  args: Record<string, any>;

  constructor({ id, event, functionName, args }: CallbackProps) {
    this.id = id || uuidv4();
    this.event = event;
    this.functionName = functionName;
    this.args = args;
  }

  updateEvent(event: string) {
    this.event = event;
  }
  updateArgs(args: Record<string, any>) {
    this.args = args;
  }

  update({ functionName, event, args }: Partial<CallbackObj>) {
    this.functionName = functionName ?? this.functionName;
    this.event = event ?? this.event;
    this.args = args ? merge(this.args, args) : this.args;
  }

  get type() {
    return this.functionName;
  }

  toJSON(): CallbackObj {
    return {
      event: this.event,
      functionName: this.functionName,
      args: this.args,
    };
  }
}

export default Callback;
