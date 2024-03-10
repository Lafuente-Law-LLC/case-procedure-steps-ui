import React, { useEffect, useReducer, useState } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../step/step";
import { CallbackWithId, Action } from "../../types";
import { processCallbacks } from "./callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import GhostAddButton from "../GhostAddButton";
import { EventCallbackManager } from "./callbackManagers";
const reducer = (state: CallbackWithId[], action: Action) => {
  if (
    action.payload === undefined ||
    action.type === undefined ||
    action.manager === undefined
  ) {
    return state;
  }

  const manager = new action.manager(state);
  const { type, payload } = action;
  switch (type) {
    case "add":
      if (payload === undefined) return state;
      payload.id ? delete payload.id : null;
      manager.add(...payload);
      return manager.callbacks;
    case "remove":
      if (payload.id === undefined) return state;
      manager.remove(payload.id);
      return manager.callbacks;
    case "update":
      if (payload.id === undefined || payload.callback === undefined)
        return state;
      manager.update(payload.id, payload.callback);
      return manager.callbacks;
    default:
      return state;
  }
};

const Item = ({
  callbacksDispatch,
}: {
  callbacksDispatch: React.Dispatch<Action>;
}) => {
  const add = () => {
    callbacksDispatch({
      type: "add",
      manager: EventCallbackManager,
      payload: { callback: { event: "after_create" } },
    });
  };
  return (
    <div role="button" className="btn btn-sm btn-primary" onClick={add}>
      Add Event
    </div>
  );
};

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [callbacks, callbacksDispatch] = useReducer<typeof reducer>(
    reducer,
    processCallbacks(step.callbacks)
  );

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
            <CallbackTableRow key={callback.id} callbackWithId={callback} />
          ))}
        </tbody>
      </Table>
      <GhostAddButton
        items={[<Item callbacksDispatch={callbacksDispatch}></Item>]}
      />
    </>

  );
};

export default CallbacksTable;
