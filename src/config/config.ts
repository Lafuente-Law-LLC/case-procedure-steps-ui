import CallbackFactory from "../models/callback/callbackFactory";
import {
  eventCallbackValidator,
  taskCallbackValidator,
} from "../validator/validators";
import type { CallbackRegistrationObject } from "../models/callback/callbackFactory";

type PartialCallbackRegObj = Pick<
  CallbackRegistrationObject,
  "functionName" | "argDescriptors" | "validator"
>;

const createFutureEventFn: PartialCallbackRegObj = {
  functionName: "create_future_event",
  argDescriptors: [
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

const createTaskFn: PartialCallbackRegObj = {
  functionName: "create_task",
  argDescriptors: [
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

export const runConfig = () => {
  const createFutureEventOnComplete: CallbackRegistrationObject = {
    eventName: "complete",
    ...createFutureEventFn,
  };

  const createFutureEventOnAfterCreate: CallbackRegistrationObject = {
    eventName: "after_create",
    ...createFutureEventFn,
  };

  const createTaskOnAfterCreate: CallbackRegistrationObject = {
    eventName: "after_create",
    ...createTaskFn,
  };

  const createTaskOnComplete: CallbackRegistrationObject = {
    eventName: "complete",
    ...createTaskFn,
  };

  CallbackFactory.registerCallbackType(createFutureEventOnComplete);
  CallbackFactory.registerCallbackType(createFutureEventOnAfterCreate);
  CallbackFactory.registerCallbackType(createTaskOnAfterCreate);
  CallbackFactory.registerCallbackType(createTaskOnComplete);
};
