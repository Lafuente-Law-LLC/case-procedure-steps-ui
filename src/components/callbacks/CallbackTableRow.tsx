import React from "react";
import { CallbackWithId } from "../../types";
import { extractKeyValues } from "./callbacksTableUtils";
import LabelRow from "./LabelRow";



const CallbackTableRow = ({
  callbackWithId: callback,
}: {
  callbackWithId: CallbackWithId;
}) => {
  return (
    <tr>
      <td>{callback.event}</td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow key={index} label={keyValue.label} value={keyValue.value} />
        ))}
      </td>
    </tr>
  );
};

export default CallbackTableRow;
