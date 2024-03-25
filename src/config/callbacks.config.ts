
import { CallbackObj } from "../types";
import { CallbackConfigObj } from "../callback/callbackManager";

import {
  eventCallbackValidator,
  taskCallbackValidator,
} from "../validator/validators";
import { buildBasicCallback } from "./auxiliaryFunctions";

const possibleEvents = ["after_create", "after_initiate"];
const DEFAULT_EVENT: (typeof possibleEvents)[number] = possibleEvents[0];

const buildTaskCallback = (
  event: string = DEFAULT_EVENT,
  args: { title: string; summary: string; date: number },
): CallbackObj => {
  return buildBasicCallback("create_task", event, args);
};

const buildFutureEventCallback = (
  event: string = DEFAULT_EVENT,
  args: { title: string; summary: string },
): CallbackObj => {
  return buildBasicCallback("create_future_event", event, args);
};

const taskConfig: CallbackConfigObj = {
  defaultFn: buildTaskCallback,
  validator: taskCallbackValidator,
};

const eventConfig: CallbackConfigObj = {
  defaultFn: buildFutureEventCallback,
  validator: eventCallbackValidator,
};

export { taskConfig, eventConfig }