import React from "react";
import type { FunctionArgsPair } from "../../models/callback/funtionArgsPair";
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
}: {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editMode: boolean;
}) => {
  return(<div className="label-row-component">
    <div className="label">{label}</div>
    <div className="value">
      {!editMode ? (
        value
      ) : (
        <Form.Control type={type} value={value} onChange={onChange} />
      )}
    </div>
  </div>);
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
  return (
    <td>
      {Object.entries(args).map(([argName, value]) => {
        const type = getArgsType(funcArgsPair, argName);
        const onChange = createOnChangeHandler({ step, callback, argName });
        return (
          <EditableInput
            key={argName}
            label={argName}
            value={value}
            type={type}
            onChange={onChange}
            editMode={editMode}
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
        <option value="after_create">After Create</option>
        <option value="complete">Complete</option>
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
