import React from "react";
import type { FunctionArgsPair } from "../../models/callback/utils";
import { Form } from "react-bootstrap";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
import CallbackFactory from "../../models/callback/callbackFactory";

const getArgsType = (funcArgsPair: FunctionArgsPair, argName: string) => {
  const arg = funcArgsPair.args.find((arg) => arg.name === argName);
  return arg ? arg.type : "string";
};

const createOnChangeHandler = ({
  step,
  callback,
  argName,
}: {
  step: Step;
  callback: Callback;
  argName: string;
}) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    step.updateCallback(callback, {
      args: { ...callback.args, [argName]: value },
    });
  };
};

const EditableInput = ({
  label,
  value,
  type,
  onChange,
  editMode,
  valid,
}: {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editMode: boolean;
  valid?: boolean;
}) => {
  return (
    <div className={`label-row-component ${valid === false ? "invalid" : ""}`}>
      {valid === false && <div className="error">Invalid</div>}
      <div className="label">{label}</div>
      <div className="value">
        {!editMode ? (
          value
        ) : (
          <Form.Control type={type} value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

export const ArgsCell = ({
  callback,
  step,
  editMode,
}: {
  callback: Callback;
  step: Step;
  editMode: boolean;
}) => {
  const { args } = callback;
  const { functionName } = callback;
  const funcArgsPair = CallbackFactory.getFunctionArgsPair(functionName);
  if (!funcArgsPair) {
    return null;
  }
  const validator = funcArgsPair.validator
    ? funcArgsPair.validator(callback)
    : null;

  return (
    <td>
      {Object.entries(args).map(([argName, value]) => {
        const type = getArgsType(funcArgsPair, argName);
        let valid = undefined;
        if (validator && validator.argsValidator.errorInField(argName)) {
          console.log(
            validator.argsValidator.findErrorMessageForField(argName),
            valid = false
          );
        }
        const onChange = createOnChangeHandler({ step, callback, argName });
        return (
          <EditableInput
            key={argName}
            label={argName}
            value={value}
            type={type}
            onChange={onChange}
            editMode={editMode}
            valid={valid}
          />
        );
      })}
    </td>
  );
};

export const EventNameCell = ({
  callback,
  editMode,
  onChangeHandler,
}: {
  callback: Callback;
  editMode: boolean;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  const SelectControl = ({
    onChangeHandler,
    value,
  }: {
    onChangeHandler: any;
    value?: string;
  }) => {
    return (
      <Form.Control as="select" onChange={onChangeHandler} value={value}>
        {CallbackFactory.getEventNameDescriptors().map((eventName) => {
          return (
            <option key={eventName.name} value={eventName.name}>
              {eventName.label}
            </option>
          );
        })}
      </Form.Control>
    );
  };

  return (
    <td>
      {editMode ? (
        <SelectControl
          onChangeHandler={onChangeHandler}
          value={callback.eventName}
        />
      ) : (
        callback.eventName
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
