import type { CallbackWithId } from "../../types";
import CallbackManager from "./callbackManager";
import { v4 } from "uuid";
import {format} from "date-fns";

const EVENTS = ["after_create", "complete"] as const;

interface EventCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: "create_future_event";
  args: {
    title: string;
    summary: string;
    date: string;
  };
}

interface TaskCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: "create_task";
  args: {
    title: string;
    summary: string;
  };
}

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

export type PartialCallback = Partial<EventCallback> & Partial<TaskCallback>;
export type Managers = typeof EventCallbackManager | typeof TaskCallbackManager;