import React, { useReducer, useState } from "react";
import { Step } from "../../../step/step";
import reducer from "../helpers/reducer/reducerFunction";
import { TableContext } from "./TableContext";
import {
  AboveTable,
  BelowTable,
  MainTable,
  TableMenuItems,
} from "./CallbacksTable/CallbacksTableComponents";

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
        <TableMenuItems dispatcher={callbacksDispatch} />
      </BelowTable>
    </TableContext.Provider>
  );
};

export default CallbacksTable;
