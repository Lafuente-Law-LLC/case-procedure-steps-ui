import React, { useEffect, useReducer } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../../step/step";
import { processCallbacks } from "../helpers/callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import reducer from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import AddCallbacksMenu from "../../AddCallbacksMenu";
import type { EventCallback, TaskCallback } from "../types";
import { CallbackWithId } from "../../../types";

type MenuItemProps = {
  text: string;
  defaultFn: <T extends CallbackWithId>(
    defaultFn: () => T,
    partial: Partial<T>
  ) => void;
  type: "event" | "task";
};

const MenuItem = ({ text, defaultFn, type }: MenuItemProps) => {

  const addFn = (e: React.MouseEvent<HTMLElement>) => {};
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

  const addCallbackFn = dispatchFunctionFactory(callbacksDispatch).add;

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
        <AddCallbacksMenu>
          <button>Hello</button>
        </AddCallbacksMenu>
      </Table>
    </>
  );
};

export default CallbacksTable;
