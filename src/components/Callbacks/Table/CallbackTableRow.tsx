import React from "react";

import { CallbackWithId } from "../../../types";
import { extractKeyValues } from "../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import type { Dispatcher } from "../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../helpers/reducer/dispatchFunctionFactory";
import { Form } from "react-bootstrap";

type Option = {
  text: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </Form.Control>
  );
};

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
  const update = dispatchFunctionFactory(dispatcher).update;
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
        <Select
          options={defaultOptions}
          value={callback.event}
          onChange={returnOnSelect}
        ></Select>
      </td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            editMode={true}
            key={index}
            label={keyValue.label}
            value={keyValue.value}
            changeFunction={returnOnChange(keyValue.label, keyValue.value)}
          />
        ))}
      </td>
    </tr>
  );
};

export default CallbackTableRow;
