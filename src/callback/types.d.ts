import type { CallbackWithId } from "../types";
import { CallbackObj } from "../types";
type SelectOption = {
  text: string;
  value: string;
};
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
export type CallbackConfigObj = {
  defaultFn: (...args: any[]) => CallbackObj;
  validator: Validator;
  selectEventOptions: SelectOption[];
};