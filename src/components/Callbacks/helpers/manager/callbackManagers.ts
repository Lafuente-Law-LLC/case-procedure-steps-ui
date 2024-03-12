import type { CallbackWithId } from "../../../../types";
import type { EventCallback, TaskCallback } from "../../types";
import CallbackManager from "./callbackManager";
import { v4 } from "uuid";

export class EventCallbackManager extends CallbackManager<EventCallback> {
  constructor(callbacks: CallbackWithId[]) {
    super(callbacks, () => ({
      id: v4(),
      event: "",
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
      event: "",
      function: "create_task",
      args: {
        title: "",
        summary: "",
      },
    }));
  }
}


