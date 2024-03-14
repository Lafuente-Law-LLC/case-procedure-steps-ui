import React from "react";
import { CallbackWithId } from "../../../types";
import { extractKeyValues } from "../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import type { Dispatcher } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";

const CallbackTableRow = ({
  callbackWithId: callback,
  dispatcher,
}: {
  callbackWithId: CallbackWithId;
  dispatcher: Dispatcher;
}) => {
  const {
    add: addFn,
    remove,
    update: updateFn,
  } = dispatchFunctionFactory(callback, dispatcher);

  const onChange = (label: string, value: string) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = callback.id; 
      updateFn({ args: { [label]: event.target.value } });
    };
  };

  return (
    <tr>
      <td>{callback.event}</td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            editMode={true}
            key={index}
            label={keyValue.label}
            value={keyValue.value}
            changeFunction={onChange(keyValue.label, keyValue.value)}
          />
        ))}
      </td>
      <div>{callback.id}</div>
    </tr>
  );
};

export default CallbackTableRow;
