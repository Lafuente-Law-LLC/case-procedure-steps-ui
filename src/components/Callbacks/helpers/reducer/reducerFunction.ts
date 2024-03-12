import type { CallbackWithId } from "../../../../types";
import type { Reducer } from "react";
import { EventCallback, TaskCallback } from "../../types";

import type {
  EventCallbackManager,
  TaskCallbackManager,
} from "../manager/callbackManagers";
export type ActionType = "add" | "remove" | "update";

export type BaseAction<T extends CallbackWithId> = {
  manager: T extends EventCallback
    ? typeof EventCallbackManager
    : T extends TaskCallback
      ? typeof TaskCallbackManager
      : never;
  type: ActionType;
};

export type Action<T extends CallbackWithId> = BaseAction<T> &
  (
    | {
        type: "add";
        data: {
          event: string;
          args: Partial<T["args"]>;
        };
      }
    | { type: "remove"; data: { id: string } }
    | {
        type: "update";
        data: { id: string; event: string; args: Partial<T["args"]> };
      }
  );

export type ActionDispatcher<T extends CallbackWithId> = React.Dispatch<
  Action<T>
>;

type TReducer<T extends CallbackWithId> = Reducer<CallbackWithId[], Action<T>>;

const reducer: TReducer<EventCallback | TaskCallback> = (state, action) => {
  if (
    action.data === undefined ||
    action.type === undefined ||
    action.manager === undefined
  ) {
    return state;
  }

  const manager = new action.manager(state);
  const { type, data } = action;
  switch (type) {
    case "add":
      if (data === undefined) return state;
      manager.add(data);
      return manager.callbacks;
    case "remove":
      if (data.id === undefined) return state;
      manager.remove(data.id);
      return manager.callbacks;
    case "update":
      if (data === undefined || data.id === undefined) return state;
      manager.update(data.id, { event: data.event, args: data.args });
      return manager.callbacks;
    default:
      return state;
  }
};

export default reducer;