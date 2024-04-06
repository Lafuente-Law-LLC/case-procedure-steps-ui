import CallbackFactory from "../models/callback/callbackFactory";
import {
  eventCallbackValidator,
  taskCallbackValidator,
} from "../validator/validators";
import type { FunctionArgsPair } from "../models/callback/utils";

export const runConfig = () => {
  const createFutureEvent: FunctionArgsPair = {
    name: "create_future_event",
    args: [
      { name: "title", type: "string", required: true, default: "New Title" },
      {
        name: "summary",
        type: "string",
        required: true,
        default: "New Summary",
      },
      { name: "days", type: "number", required: true, default: 0 },
    ],
    validator: eventCallbackValidator,
  };

  const createTask: FunctionArgsPair = {
    name: "create_task",
    args: [
      { name: "title", type: "string", required: true, default: "New Title" },
      {
        name: "summary",
        type: "string",
        required: true,
        default: "New Summary",
      },
    ],
    validator: taskCallbackValidator,
  };

  CallbackFactory.registerFunctionArgsPair(createFutureEvent);
  CallbackFactory.registerFunctionArgsPair(createTask);
  CallbackFactory.registerEventName({ name: "complete", label: "Complete" });
  CallbackFactory.registerEventName({
    name: "after_create",
    label: "After Create",
  });
};
