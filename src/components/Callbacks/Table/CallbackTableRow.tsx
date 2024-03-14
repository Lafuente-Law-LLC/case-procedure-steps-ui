import React from "react";
import { CallbackWithId } from "../../../types";
import { extractKeyValues } from "../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import Form from "react-bootstrap/Form";
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
      <td>
        <Form.Select value={callback.event}>
          <option></option>
          <option value="on_complete"> On Complete</option>
          <option value="after_create">After Create</option>
        </Form.Select>
      </td>
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
