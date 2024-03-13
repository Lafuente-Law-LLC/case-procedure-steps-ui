import React from "react";
import { CallbackWithId } from "../../../types";
import { extractKeyValues } from "../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import {
  TaskCallbackManager,
  EventCallbackManager,
} from "../helpers/manager/callbackManagers";

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
  return (
    <tr>
      <td>{callback.event}</td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            key={index}
            label={keyValue.label}
            value={keyValue.value}
            update={updateFn}
          />
        ))}
      </td>
    </tr>
  );
};

export default CallbackTableRow;
