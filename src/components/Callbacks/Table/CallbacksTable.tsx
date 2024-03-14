import React, { useEffect, useReducer, useState } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../../step/step";
import { processCallbacks } from "../helpers/callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import GhostAddButton from "../../GhostAddButton";
import { EventCallbackManager } from "../helpers/manager/callbackManagers";
import reducer from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
const Item = ({ add }: { add: (data: any) => void }) => {
  const addFn = (e: React.MouseEvent<HTMLElement> | undefined) => {
    add({});
  };
  return (
    <div role="button" className="btn btn-sm btn-primary" onClick={addFn}>
      Add Event
    </div>
  );
};

const CallbacksTable = ({ step }: { step: Step }) => {
  
  const [callbacks, callbacksDispatch] = useReducer(
    reducer,
    processCallbacks(step.callbacks)
  );

  const addFunction = (data: any) =>
    callbacksDispatch({
      type: "add",
      manager: EventCallbackManager,
      data: data,
    });

  useEffect(() => {
    step.updateCallbacks(callbacks);
  }, [callbacks]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Function</th>
            <th>Args</th>
          </tr>
        </thead>
        <tbody>
          {callbacks.map((callback) => (
            <CallbackTableRow
              key={callback.id}
              callbackWithId={callback}
              dispatcher={callbacksDispatch}
            />
          ))}
        </tbody>
      </Table>
      <GhostAddButton items={[<Item add={addFunction}></Item>]} />
    </>
  );
};

export default CallbacksTable;
