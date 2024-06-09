import React from "react";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
import { CallbackValidator } from "../../validator/validators";
import {
  EditableInput,
  createArgsHandler,
  SelectControl,
} from "./tableRowUtils";
import CallbackController from "../../models/callback/callbackController";

type ArgsCellProps = {
  argName: string;
  value: string;
  editMode: boolean;
  argType: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
};

type EventNameCellProps = {
  eventNameValue: string;
  editMode: boolean;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  selectOptions: [string, string][];
  errorMessage?: string;
} & React.PropsWithChildren;

const ArgsCell = ({
  argName,
  value,
  argType,
  onChangeHandler,
  editMode,
  errorMessage,
}: ArgsCellProps) => {
  return (
    <EditableInput
      key={argName}
      label={argName}
      value={value}
      type={argType}
      onChange={onChangeHandler}
      editMode={editMode}
      errorMessage={errorMessage}
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
  argTypes: { [key: string]: string };
}) => {
  let argsValidator: Record<string, any> = {};
  const callbackValidator = CallbackController.getValidatorFor(
    callback.functionName,
  );
  if (callbackValidator) {
    argsValidator = callbackValidator.validateArgs(callback.args);
  }

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
            errorMessage={argsValidator[argName] || undefined}
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
