import type { CallbackWithId } from "../../types";


export interface EventCallback extends CallbackWithId {
  event: string;
  function: "create_future_event";
  args: {
    title: string;
    summary: string;
    days: number;
  };
}

export interface TaskCallback extends CallbackWithId {
  event: string;
  function: "create_task";
  args: {
    title: string;
    summary: string;
  };
}
