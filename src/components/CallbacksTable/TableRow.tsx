import React from "react";
import Callback from "../../models/callback/callback";
import { Step } from "../../models/step/step";
import { EventNameCell, FunctionNameCell, ArgsCellGroup } from "./TableCells";
import {
  createEventNameCellHandler,
  getValidatorFromCallback,
} from "./tableRowUtils";

const TableRow = ({
  callback,
  editMode,
  step
}: {
  callback: Callback;
  editMode: boolean;
  step: Step;
}) => {
  

  return (
    <tr>
      <EventNameCell
        onChangeHandler={createEventNameCellHandler(step, callback)}
        editMode={editMode}
        eventNameValue={callback.eventName}
        validationObject={getValidatorFromCallback(callback).validField(
          "eventName",
        )}
      />
      <FunctionNameCell functionName={callback.functionName} />
      <ArgsCellGroup callback={callback} step={step} editMode={editMode} />
    </tr>
  );
};

export default TableRow;
