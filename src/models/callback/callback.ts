import { v4 as uuidv4 } from "uuid";
import { merge } from "lodash";
import { CallbackObj } from "../../types";

export type CallbackProps = {
  id?: string;
  eventName?: string;
  functionName: string;
  args: Record<string, any>;
};
/**
 * Callbacks are objects that related to steps in that they answer the question what should occur after a given event in the lifecycle of a step.
 * For example imagine that after is step is marked as completed the function sendEmail should be called. The callback object would contain the event name and the function name.
 * The object would also contain the description of the acceptable arguments that the function sendEmail should receive. In the context of front end development the callback object would be used to create a button that when clicked would call the function sendEmail.
 * the descriptors help provide context as to how to display certain components related to the callback object. The eventLabelObj is used to associate the event with a label component.
 */
class Callback {
  id: string;
  eventName: string;
  functionName: string;
  args: Record<string, any>;

  constructor({ id, eventName, functionName, args }: CallbackProps) {
    this.id = id || uuidv4();
    this.eventName = eventName || "";
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
      eventName: this.eventName,
      functionName: this.functionName,
      args: this.args,
    };
  }
}

export default Callback;
