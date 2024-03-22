import React, { useEffect, useReducer, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Step } from "../../../step/step";
import CallbackTableRow from "./CallbackTableRow";
import reducer, { Action } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import CallbackAdditionButton from "./CallbackAdditionButton";
import { TableContext } from "./TableContext";
import MenuItem, { onClickFn } from "./CallbackAdditionButton/MenuItem";
import { getFunctionFromAdminObj } from "../helpers/callbacksTableUtils";

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

const MenuItemAddFutureEvent = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  const defaultFn = getFunctionFromAdminObj("create_future_event");
  const { add: addFn } = dispatchFunctionFactory(dispatcher);
  const text = "Create Future Event";
  const onClick: onClickFn = (e) => {
    addFn({}, defaultFn());
  };
  return <MenuItem text={text} onClickFn={onClick} />;
};

const MenuItemAddCreateTask = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  const defaultFn = getFunctionFromAdminObj("create_task");
  const { add: addFn } = dispatchFunctionFactory(dispatcher);
  const text = "Create Task";
  const onClick: onClickFn = (e) => {
    addFn({}, defaultFn());
  };
  return <MenuItem text={text} onClickFn={onClick} />;
};

const BelowTable = ({
  editMode,
  children,
  setChangeCommit,
  isValid,
}: {
  editMode: boolean;
  setChangeCommit: React.Dispatch<React.SetStateAction<boolean>>;
  isValid?: boolean;
} & React.PropsWithChildren) => {
  return (
    <>
      {editMode && <CallbackAdditionButton>{children}</CallbackAdditionButton>}
    </>
  );
};

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState(false);
  const [commitable, setCommitChange] = useState(false);
  const [callbacks, callbacksDispatch] = useReducer(reducer, step.callbacks);
  const isValid = callbacks.every((callback) => callback.valid());

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
              <th>Options</th>
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
      </div>
      <BelowTable setChangeCommit={setCommitChange} editMode={editMode}>
        <MenuItemAddFutureEvent dispatcher={callbacksDispatch} />
        <MenuItemAddCreateTask dispatcher={callbacksDispatch} />
      </BelowTable>
    </TableContext.Provider>
  );
};

export default CallbacksTable;
