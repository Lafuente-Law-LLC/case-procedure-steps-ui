import type { CallbackWithId, ActionDispatcher } from "../../../../types";
import type { Managers } from "../manager/callbackManagers";
import { EVENTS } from "../manager/callbackManagers";

function isEvent(input: string): input is (typeof EVENTS)[number] {
  return EVENTS.includes(input as any);
}

const DispatchFunctionFactory = <T extends CallbackWithId>(
  dispatcher: ActionDispatcher<T>,
  manager: Managers,
  callbackWithId: T,
) => {
  const updateEvent = (event: string) => {
    if (!isEvent(event)) return;
    dispatcher({
      type: "update",
      manager: manager,
      payload: {
        id: callbackWithId.id,
        event: event,
        args: { ...callbackWithId.args },
      },
    });
  };

  const createArgsUpdater = (x: string) => {
    return (value: string) => {
      if (!isEvent(callbackWithId.event)) return;
      dispatcher({
        type: "update",
        manager: manager,
        payload: {
          id: callbackWithId.id,
          event: callbackWithId.event,
          args: { ...callbackWithId.args, [x]: value },
        },
      });
    };
  };

  const remove = () => {
    dispatcher({
      type: "remove",
      manager: manager,
      payload: { 
        id: callbackWithId.id,
      },
    });
  };

  return {
    updateEvent,
    createArgsUpdater,
    remove,
  };
};

export default DispatchFunctionFactory;
