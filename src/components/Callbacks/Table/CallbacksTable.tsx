import React, { useEffect, useReducer, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Step } from "../../../step/step";
import { processCallbacks } from "../helpers/callbacksTableUtils";
import CallbackTableRow from "./CallbackTableRow";
import reducer from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import CallbackAdditionButton from "../../CallbackAdditionButton";
import { TableContext } from "./TableContext";
import MenuItem from "./MenuItem";

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState(false);
  const [callbacks, callbacksDispatch] = useReducer(
    reducer,
    processCallbacks(step.callbacks)
  );

  const addCallbackFn = dispatchFunctionFactory(callbacksDispatch).add;

  useEffect(() => {
    step.updateCallbacks(callbacks);
    console.log(step);
  }, [callbacks]);

  return (
    <TableContext.Provider value={{ editMode, setEditMode }}>
      <div className="callbacks-table-wrapper">
        <div className="top-options">
          <Form.Check
            type="switch"
            label="Edit Mode"
            onChange={(e) => setEditMode(e.target.checked)}
          />
        </div>
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
      </div>
      {editMode && (
        <CallbackAdditionButton>
          <MenuItem text="Add Event" defaultFn={addCallbackFn} type="event" />
          <MenuItem text="Add Task" defaultFn={addCallbackFn} type="task" />
        </CallbackAdditionButton>
      )}
    </TableContext.Provider>
  );
};

export default CallbacksTable;
