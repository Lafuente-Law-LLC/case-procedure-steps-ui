import React, { useContext } from "react";
import Callback from "../../models/callback/callback";
import CallbacksTableContext from "./CallbacksTableContext";
import { Step } from "../../models/step/step";
import { EventNameCell, FunctionNameCell, ArgsCell } from "./TableCells";


const TableRow = ({
  callback,
  editMode,
}: {
  callback: Callback;
  editMode: boolean;
}) => {
  const { step } = useContext(CallbacksTableContext) as { step: Step };
  const EventNameChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    step.updateCallback(callback, { eventName: e.target.value });
  }; 
  return (
    <tr>
      <EventNameCell
        onChangeHandler={EventNameChangeHandler}
        editMode={editMode}
        callback={callback}
      />
      <FunctionNameCell functionName={callback.functionName} />
      <ArgsCell callback={callback} step={step} editMode={editMode} />
    </tr>
  );
};

export default TableRow;
