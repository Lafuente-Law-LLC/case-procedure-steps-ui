import React from "react";
import type { FunctionArgsPair } from "../../models/callback/utils";
import { Form } from "react-bootstrap";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
import CallbackFactory from "../../models/callback/callbackFactory";
import { ValidationObject } from "../../types";

export const getValidatorFromCallback = (callback: Callback) => {
  const { functionName, eventName } = callback;
  let validator = CallbackFactory.getValidatorFor(eventName, functionName);
  if (!validator) {
    throw new Error("Validator not found");
  }
  const val = validator(callback);
  return val;
};

export const getArgsTypeFormCB = (callback: Callback, argName: string) => {
  const {functionName, eventName} = callback;
  const eventFunctionData = CallbackFactory.getFunctionDataFor(eventName, functionName);
  if (!eventFunctionData) {
    throw new Error("Function not found");
  }
  const {argDescriptors} = eventFunctionData;
  const argDescriptor = argDescriptors.find((arg) => arg.name === argName);
  if (!argDescriptor) {
    throw new Error("Arg descriptor not found");
  }
  return argDescriptor.type;
} ;



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
  validationObject,
}: EditableInputObj & {
  editMode: boolean;
  validationObject: ValidationObject;
}) => {
  const { valid, message } = validationObject;
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
  const val = getValidatorFromCallback(callback);
  return val.argsValidator 
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
  
  const entries = CallbackFactory.getEventLabelPairs();
  console.log(entries);
  return (
    <>
      {entries.map(([eventName, label]) => (
        <option key={eventName} value={eventName}>
          {label}
        </option>
      ))}
    </>
  );
  

};
