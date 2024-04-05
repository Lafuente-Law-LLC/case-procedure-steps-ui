import React from "react";
import type { FunctionArgsPair } from "../../models/callback/utils";
import { Form } from "react-bootstrap";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
import CallbackFactory from "../../models/callback/callbackFactory";
import { ValidationObject } from "../../types";

export const getValidatorFromCallback = (callback: Callback) => {
  const functionName = callback.functionName;
  const functionArgsPair = CallbackFactory.getFunctionArgsPair(functionName);
  let val = functionArgsPair?.validator || false;
  if (!val) {
    throw new Error("Error with FunctionArgsPair");
  }
  return val(callback);
};

export const getArgsTypeFormCB = (callback: Callback, argName: string) => {
  const { functionName } = callback;
  const functionArgsPair = getFunctionArgsPair(functionName);
  return getArgsType(functionArgsPair, argName);
};

const getFunctionArgsPair = (functionName: string) => {
  let functionArgsPair = CallbackFactory.getFunctionArgsPair(functionName);
  if (!functionArgsPair) {
    throw new Error("Function not found");
  }
  return functionArgsPair;
};

export const createArgsHandler = ({
  step,
  callback,
  argName,
}: {
  step: Step;
  callback: Callback;
  argName: string;
}) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    step.updateCallback(callback, {
      args: { ...callback.args, [argName]: e.target.value },
    });
  };
};

export const createEventNameCellHandler = (step: Step, callback: Callback) => {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    step.updateCallback(callback, {
      eventName: value,
    });
  };
};

const getArgsType = (funcArgsPair: FunctionArgsPair, argName: string) => {
  const arg = funcArgsPair.args.find((arg) => arg.name === argName);
  return arg ? arg.type : "string";
};

type EditableInputObj = {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditableInput = ({
  label,
  value,
  type,
  onChange,
  editMode,
  validObj,
}: EditableInputObj & {
  editMode: boolean;
  validObj: ValidationObject;
}) => {
  const { valid, message } = validObj;
  return (
    <div className={`label-row-component ${valid === false ? "invalid" : ""}`}>
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


export const getArgsValidator = (callback: Callback) => {
  return getValidatorFromCallback(callback).argsValidator;
};

export const SelectControl = ({
  onChangeHandler,
  value,
}: {
  onChangeHandler: any;
  value?: string;
}) => {
  return (
    <Form.Control as="select" onChange={onChangeHandler} value={value}>
      <EventNameSelectOptions />
    </Form.Control>
  );
};
export const EventNameSelectOptions = () => {
  return CallbackFactory.getEventNameDescriptors().map((eventName) => {
    return (
      <option key={eventName.name} value={eventName.name}>
        {eventName.label}
      </option>
    );
  });
};