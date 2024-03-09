import type { Callback, CallbackWithId } from "../../types";
import CallbackManager from "./callbackManager";
import type { Step } from "../../step/step";
import { v4 } from "uuid";

const EVENTS = ["after_create", "complete"] as const;
const FUNCTIONS = {
  CREATE_FUTURE_EVENT: "create_future_event",
  CREATE_TASK: "create_task",
};

interface EventCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: typeof FUNCTIONS.CREATE_FUTURE_EVENT;
  args: {
    title: string;
    summary: string;
    date: Date;
  };
}

interface TaskCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: typeof FUNCTIONS.CREATE_TASK;
  args: {
    title: string;
    summary: string;
  };
}

class EventCallbackManager extends CallbackManager<EventCallback> {
  constructor(callbacks: CallbackWithId[]) {
    super(callbacks, () => ({
      id: v4(),
      event: "after_create",
      function: "create_future_event",
      args: {
        title: "",
        summary: "",
        date: new Date(),
      },
    }));
  }
}

class TaskCallbackManager extends CallbackManager<TaskCallback> {
  constructor(callbacks: CallbackWithId[]) {
    super(callbacks, () => ({
      id: v4(),
      event: "after_create",
      function: "create_task",
      args: {
        title: "",
        summary: "",
      },
    }));
  }
}

export const processCallbacks = (callbacks: Callback[]): CallbackWithId[] => {
  return callbacks.map((callback) => ({ ...callback, id: v4() }));
};

export const findCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId | undefined => {
  return callbacks.find((callback) => callback.id === id);
};

export const removeCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId[] => {
  return callbacks.filter((callback) => callback.id !== id);
};
