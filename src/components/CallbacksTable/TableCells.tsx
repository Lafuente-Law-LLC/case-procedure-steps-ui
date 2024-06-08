import React from "react";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";

import {
  EditableInput,
  getArgsTypeFormCB,
  createArgsHandler,
  getArgsValidator,
  SelectControl,
} from "./tableRowUtils";
import { FieldValidationObject } from "../../types";

type ArgsCellProps = {
  argName: string;
  value: string;
  editMode: boolean;
  type: string;
  validationObject: FieldValidationObject;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};

type EventNameCellProps = {
  eventNameValue: string;
  editMode: boolean;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  validationObject: FieldValidationObject;
} & React.PropsWithChildren;

const ArgsCell = ({
  argName,
  value,
  type,

  onChangeHandler,

  editMode,
}: ArgsCellProps) => {
  return (
    <EditableInput
      key={argName}
      label={argName}
      value={value}
      type={type}
      onChange={onChangeHandler}
      editMode={editMode}
    />
  );
};

export const ArgsCellGroup = ({
  callback,
  step,
  editMode,
}: {
  callback: Callback;
  step: Step;
  editMode: boolean;
}) => {
  return (
    <td>
      {Object.entries(callback.args).map(([argName, value]) => {
        return (
          <ArgsCell
            key={argName}
            argName={argName}
            value={value}
            type={getArgsTypeFormCB(callback, argName)}
            validationObject={getArgsValidator(callback).validField(argName)}
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
}: EventNameCellProps) => {
  return (
    <td>
      {editMode ? (
        <SelectControl
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
