import React, { useReducer, useState } from "react";
import { Step } from "../../../models/step/step";
import reducer from "../helpers/reducer/reducerFunction";
import { TableContext } from "./TableContext";
import CallbackFactory from "../../../models/callback/callbackFactory";
import {
  AboveTable,
  BelowTable,
  MainTable,
  
} from "./CallbacksTableComponents";

const CallbacksTable = ({ step }: { step: Step }) => {
  const [editMode, setEditMode] = useState(false);
  const [commitChange, setCommitChange] = useState(false);
  const [callbacks, callbacksDispatch] = useReducer(reducer, step.callbacks);
  

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
      <button onClick={(e)=>{
        const callback = CallbackFactory.createCallback("create_task");
        step.addCallback(callback);
        console.log(step);

      }}>Create New Task</button> 
      </BelowTable>
    </TableContext.Provider>
  );
};

export default CallbacksTable;
