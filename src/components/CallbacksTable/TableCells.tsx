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
import { ValidationObject } from "../../types";

type ArgsCellProps = {
  argName: string;
  value: string;
  editMode: boolean;
  type: string;
  validationObject: ValidationObject;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};

type EventNameCellProps = {
  eventNameValue: string;
  editMode: boolean;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  validationObject: ValidationObject;
} & React.PropsWithChildren;

const ArgsCell = ({
  argName,
  value,
  type,
  validationObject,
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
      validationObject={validationObject}
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
  validationObject,
}: EventNameCellProps) => {
  const { valid, message } = validationObject;

  return (
    <td>
      {!valid && <div className="error-message">{message}</div>}
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
