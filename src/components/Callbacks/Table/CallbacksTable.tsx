import React, { useEffect, useReducer } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../../step/step";
import { processCallbacks } from "../helpers/callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import reducer from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import AddCallbacksMenu from "../../AddCallbacksMenu";
import type { EventCallback, TaskCallback } from "../types";
import { v4 } from "uuid";
import { CallbackWithId } from "../../../types";

type MenuItemProps = {
  text: string;
  defaultFn: <T extends CallbackWithId>(
    defaultFn: () => T,
    partial: Partial<T>
  ) => void;
  type: "event" | "task";
};

const eventCreationFn = (): EventCallback => {
  return {
    id: v4(),
    event: "",
    function: "create_future_event",
    args: {
      title: "",
      summary: "",
      date: "",
    },
  };
};

const taskCreationFn = (): TaskCallback => {
  return {
    id: v4(),
    event: "",
    function: "create_task",
    args: {
      title: "",
      summary: "",
    },
  };
};

const MenuItem = ({ text, defaultFn, type }: MenuItemProps) => {
  if (type !== "event" && type !== "task") {
    throw new Error("Invalid type");
  }
  const fn = type === "event" ? eventCreationFn : taskCreationFn;

  const addFn = (e: React.MouseEvent<HTMLElement>) => {
    defaultFn<CallbackWithId>(fn, {});
  };
  return (
    <div className={'menu-item'}>
    <div className="btn btn-sm btn-primary" onClick={addFn}>
      {text}
    </div>
      
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
      </Table>
      <AddCallbacksMenu>
        <MenuItem text="Add Event" defaultFn={addCallbackFn} type="event" />
        <MenuItem text="Add Task" defaultFn={addCallbackFn} type="task" />
        <div role="menuitem" tabindex="-1" id=":r2i:" class="menu-item">
  <div class="menu-item-content">
    <div class="menu-item-icon">
      <img src="/images/blocks/text/en-US.png" referrerpolicy="same-origin" class="icon-image">
    </div>
    <div class="menu-item-text">
      <div class="text-container">
        <div class="text">Text</div>
      </div>
      <div class="description">Just start writing with plain text.</div>
    </div>
  </div>
</div>

      </AddCallbacksMenu>
    </>
  );
};

export default CallbacksTable;
