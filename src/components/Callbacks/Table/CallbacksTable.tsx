import React, { useEffect, useReducer, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Step } from "../../../step/step";
import CallbackTableRow from "./CallbackTableRow";
import reducer, { Action } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import CallbackAdditionButton from "./CallbackAdditionButton";
import { TableContext } from "./TableContext";
import MenuItem from "./CallbackAdditionButton/MenuItem";

import {
  getValidatorFromAdminObj,
  getFunctionFromAdminObj,
} from "../helpers/callbacksTableUtils";

const AboveTable = ({
  setEditMode,
}: {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="above-table">
      <Form.Check
        type="switch"
        label="Edit Mode"
        onChange={(e) => setEditMode(e.target.checked)}
      />
    </div>
  );
};

const MenuItemAddFutureEventCallback = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {

  const fn = getFunctionFromAdminObj("create_future_event"); 
  const validator = getValidatorFromAdminObj("create_future_event");


  const { add: addFn } = dispatchFunctionFactory(dispatcher);
  const defaultFn = eventCallbackAdminObj.createFn;
  const text = "Add Future Event Callback";
  const onClick = (e) => {
    addFn({}, eventCallbackAdminObj.createFn());
  };
  return <MenuItem text={text} onClickFn={onClick} />;
};

const BelowTable = ({
  editMode,
  children,
}: { editMode: boolean } & React.PropsWithChildren) => {
  return (
    editMode && <CallbackAdditionButton>{children}</CallbackAdditionButton>
  );
};

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState(false);
  const [commitChange, setCommitChange] = useState(false);
  const [callbacks, callbacksDispatch] = useReducer(reducer, step.callbacks);

  useEffect(() => {
    step.updateCallbacks(callbacks);
  }, [callbacks]);

  const {} = dispatchFunctionFactory(callbacksDispatch);

  return (
    <TableContext.Provider value={{ editMode, setEditMode }}>
      <div className="callbacks-table-wrapper">
        <AboveTable setEditMode={setEditMode} />
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
                callback={callback}
                dispatcher={callbacksDispatch}
              />
            ))}
          </tbody>
        </Table>
        <BelowTable editMode={editMode}></BelowTable>
      </div>
    </TableContext.Provider>
  );
};

export default CallbacksTable;
