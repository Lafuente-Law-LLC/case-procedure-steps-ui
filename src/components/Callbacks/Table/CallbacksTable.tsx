import React, { useReducer, useState } from "react";
import { Step } from "../../../step/step";
import reducer, { Action } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import { TableContext } from "./TableContext";
import MenuItem, { onClickFn } from "./CallbackAdditionButton/MenuItem";
import { getFunctionFromAdminObj } from "../helpers/callbacksTableUtils";
import AboveTable from "./CallbacksTable/AboveTable";
import BelowTable from "./CallbacksTable/BelowTable";
import MainTable from "./CallbacksTable/MainTable";

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

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState(false);
  const [commitable, setCommitChange] = useState(false);
  const [callbacks, callbacksDispatch] = useReducer(reducer, step.callbacks);
  const isValid = callbacks.every((callback) => callback.valid());

  return (
    <TableContext.Provider value={{ editMode, setEditMode }}>
      <div className="callbacks-table-wrapper">
        <AboveTable setEditMode={setEditMode} />
        <MainTable
          headers={["Event", "Function", "Arguments", "Options"]}
          callbacks={callbacks}
          dispatcher={callbacksDispatch}
        />
      </div>
      <BelowTable setChangeCommit={setCommitChange} editMode={editMode}>
        <MenuItemAddFutureEvent dispatcher={callbacksDispatch} />
        <MenuItemAddCreateTask dispatcher={callbacksDispatch} />
      </BelowTable>
    </TableContext.Provider>
  );
};

export default CallbacksTable;
