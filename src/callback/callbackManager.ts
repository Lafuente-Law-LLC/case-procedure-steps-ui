import Validator from "../validator/validator";
import { CallbackWithId } from "../types";
import type { EventCallback, TaskCallback } from "./types";
import {
  eventCallbackValidator,
  taskCallbackValidator,
} from "../validator/validators";
import { v4 } from "uuid";
export interface CallbackManagementObj<T extends CallbackWithId> {
  createFn: () => T;
  type: T["function"];
  validator: Validator;
}

class CallbackManager {
  private static instance: CallbackManager | null = null;
  private constructor() {}

  private static callbackManagementObjs = new Map<
    string,
    CallbackManagementObj<any>
  >();
  static checkIfRegistered<T extends CallbackWithId>(type: T["function"]) {
    return CallbackManager.callbackManagementObjs.has(type);
  }

  static registerCallbackManagementObj<T extends CallbackWithId>(
    obj: CallbackManagementObj<T>,
  ) {
    if (CallbackManager.callbackManagementObjs.has(obj.type)) {
      console.warn("Callback type already registered");
      return;
    }
    CallbackManager.callbackManagementObjs.set(obj.type, obj);
  }

  static getCallbackManagementObj<T extends CallbackWithId>(
    type: T["function"],
  ) {
    const callback = CallbackManager.callbackManagementObjs.get(type);
    if (!callback) {
      console.warn("Callback type not registered");
      return null;
    }
    return callback;
  }
}

const eventCallbackManagementObj: CallbackManagementObj<EventCallback> = {
  createFn: () => ({
    id: v4(),
    event: "",
    function: "create_future_event",
    args: {
      title: "",
      summary: "",
      days: 0,
    },
  }),
  type: "create_future_event",
  validator: eventCallbackValidator,
};

const taskCallbackManagementObj: CallbackManagementObj<TaskCallback> = {
  createFn: () => ({
    id: v4(),
    event: "",
    function: "create_task",
    args: {
      title: "",
      summary: "",
    },
  }),
  type: "create_task",
  validator: taskCallbackValidator,
};

export {
  CallbackManager,
  eventCallbackManagementObj,
  taskCallbackManagementObj,
};
export default CallbackManager;
