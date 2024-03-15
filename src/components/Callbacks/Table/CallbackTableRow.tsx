import React, { useContext } from "react";
import { CallbackWithId } from "../../../types";
import { extractKeyValues } from "../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import type { Dispatcher } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import { TableContext } from "./TableContext";
import EventSelect, { Option } from "./EventSelect";

const defaultOptions: Option[] = [
  { text: "After Complete", value: "after_complete" },
  { text: "At initialize", value: "init" },
];

const CallbackTableRow = ({
  callbackWithId: callback,
  dispatcher,
}: {
  callbackWithId: CallbackWithId;
  dispatcher: Dispatcher;
}) => {
  const { editMode } = useContext(TableContext) as { editMode: boolean };

  const update = dispatchFunctionFactory(dispatcher).update;
  const remove = dispatchFunctionFactory(dispatcher).remove;
  
  const returnOnChange = (key: string, value: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      update(callback.id, { args: { [key]: e.target.value } });
    };
  };

  const returnOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update(callback.id, { event: e.target.value });
  };

  return (
    <tr>
      <td>
        {editMode ? (
          <EventSelect
            options={defaultOptions}
            value={callback.event}
            onChange={returnOnSelect}
          ></EventSelect>
        ) : (
          callback.event
        )}
      </td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            editMode={editMode}
            key={index}
            label={keyValue.label}
            value={keyValue.value}
            changeFunction={returnOnChange(keyValue.label, keyValue.value)}
          />
        ))}
        <div>
          <button
            onClick={() => {
              remove(callback.id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CallbackTableRow;
