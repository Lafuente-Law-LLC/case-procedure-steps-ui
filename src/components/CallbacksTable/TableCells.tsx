import React from "react";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";

import {
  EditableInput,
  createArgsHandler,
  SelectControl,
} from "./tableRowUtils";


type ArgsCellProps = {
  argName: string;
  value: string;
  editMode: boolean;
  argType: string; 
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};

type EventNameCellProps = {
  eventNameValue: string;
  editMode: boolean;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  
  selectOptions: [string, string][];
} & React.PropsWithChildren;

const ArgsCell = ({
  argName,
  value,
  argType,
  onChangeHandler,
  editMode,
}: ArgsCellProps) => {
  return (
    <EditableInput
      key={argName}
      label={argName}
      value={value}
      type={argType}
      onChange={onChangeHandler}
      editMode={editMode}
    />
  );
};

export const ArgsCellGroup = ({
  callback,
  step,
  editMode,
  argTypes,
}: {
  callback: Callback;
  step: Step;
  editMode: boolean;
  argTypes: {[key: string]: string};  
}) => {
  return (
    <td>
      {Object.entries(callback.args).map(([argName, value]) => {
        return (
          <ArgsCell
            key={argName}
            argName={argName}
            value={value}
            argType={argTypes[argName] || "text"} 
            onChangeHandler={createArgsHandler({ step, callback, argName })}
            editMode={editMode}
          />
        );
      })}
    </td>
  );
};
export const EventNameCell = ({
  eventNameValue,
  editMode,
  onChangeHandler,
  selectOptions, 
}: EventNameCellProps) => {
  return (
    <td>
      {editMode ? (
        <SelectControl
          options={selectOptions}
          onChangeHandler={onChangeHandler}
          value={eventNameValue}
        />
      ) : (
        eventNameValue
      )}
    </td>
  );
};

export const FunctionNameCell = ({
  functionName,
}: {
  functionName: string;
}) => {
  return <td>{functionName}</td>;
};
