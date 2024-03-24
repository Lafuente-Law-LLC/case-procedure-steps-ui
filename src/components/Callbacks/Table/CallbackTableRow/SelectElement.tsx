import React from "react";
import Callback from "../../../../callback/callback";
import dispatchFunctionFactory from "../../helpers/reducer/dispatchFunctionFactory";

import type { ReactDispatcher } from "../../helpers/reducer/reducerFunction";

export type SelectOption = {
  text: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  callback: Callback;
  dispatcher: ReactDispatcher;
  value: string;
  defaultValue?: string;
};

const SelectElement = ({
  options,
  callback,
  dispatcher,
  value,
  defaultValue,
}: SelectProps) => {
  const defaultOption = defaultValue ? defaultValue : options[0].value;
  const pickedValue = value ? value : defaultOption;
  const update = dispatchFunctionFactory(dispatcher).update;
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update(callback.id, { event: e.target.value });
  };

  return (
    <select className="form-select" value={pickedValue} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default SelectElement;
