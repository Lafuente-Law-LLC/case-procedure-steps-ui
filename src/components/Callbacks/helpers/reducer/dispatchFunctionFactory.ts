import type { Dispatcher } from "./reducerFunction";
import type { EventCallback, TaskCallback } from "../../types";
import type { CallbackWithId } from "../../../../types";
import {
  TaskCallbackManager,
  EventCallbackManager,
} from "../manager/callbackManagers";

const dispatchFunctionFactory = (
  callback: CallbackWithId,
  dispatcher: Dispatcher
) => {
  const manager =
    callback.function == "create_future_event"
      ? EventCallbackManager
      : TaskCallbackManager;

  const add = (data: any) => {
    dispatcher({
      manager: manager,
      type: "add",
      data: data,
    });
  };

  const remove = () => {
    dispatcher({
      manager: manager,
      type: "remove",
      data: { id: callback.id },
    });
  };

  const update = (data: any) => {
    dispatcher({
      manager: manager,
      type: "update",
      data: { id: callback.id, ...data },
    });
  };

  return { add, remove, update };
};

export default dispatchFunctionFactory;
