import type { CallbackWithId, EventCallback, TaskCallback } from "../../types";
import CallbackManager from "./callbackManager";
import { v4 } from "uuid";


export const EVENTS = ["after_create", "complete"] as const;

export class EventCallbackManager extends CallbackManager<EventCallback> {
  constructor(callbacks: CallbackWithId[]) {
    super(callbacks, () => ({
      id: v4(),
      event: "after_create",
      function: "create_future_event",
      args: {
        title: "",
        summary: "",
        date: new Date().toISOString(),
      },
    }));
  }
}

export class TaskCallbackManager extends CallbackManager<TaskCallback> {
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


export type Managers = typeof EventCallbackManager | typeof TaskCallbackManager;
