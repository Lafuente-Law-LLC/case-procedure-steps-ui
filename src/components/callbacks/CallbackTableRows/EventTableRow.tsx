import React from "react";
import { CallbackWithId, Action, EventCallback } from "../../../types";
import { EventCallbackManager } from "../callbackManagers";
import DispatchFunctionFactory from "../dispatchFunctionFactory";
export const EventTableRow = ({
  callbackWithId,
  dispatcher,
}: {
  callbackWithId: CallbackWithId;
  dispatcher: React.Dispatch<Action<EventCallback>>;
}) => {
  const callback = callbackWithId;
  const factory = DispatchFunctionFactory(
    dispatcher,
    EventCallbackManager,
    callbackWithId,
  );
  const factoryCreateArgsUpdater = factory.createArgsUpdater;

  const updateArgsTitleFn = factoryCreateArgsUpdater("title");
  const updateArgsSummaryFn = factoryCreateArgsUpdater("summary");
  const updateArgsDateFn = factoryCreateArgsUpdater("date");
  const updateEventFn = factory.updateEvent;
  const removeFn = factory.remove;
  
  return (
    <tr>
      <td>{callback.event}</td>
      <td>{callback.function}</td>
      <td>
        <input
          type="text"
          value={callback.args.title}
          onChange={(e) => updateArgsTitleFn(e.target.value)}
        />
      </td>
    </tr>
  );
};
