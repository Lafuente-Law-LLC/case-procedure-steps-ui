import React, { useEffect, useReducer, useState } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../../step/step";
import { CallbackWithId, Action } from "../../../types";
import { processCallbacks } from "../helpers/callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import GhostAddButton from "../../GhostAddButton";
import { EventCallbackManager } from "../helpers/manager/callbackManagers";
import reducer from "../helpers/reducer/reducerFunction";
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
