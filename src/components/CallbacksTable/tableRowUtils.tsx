import React from "react";
import { Form } from "react-bootstrap";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
import CallbackFactory from "../../models/callback/callbackFactory";
import { FieldValidationObject } from "../../types";

type EditableInputObj = {
  label: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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



export const EditableInput = ({
  label,
  value,
  type,
  onChange,
  editMode,
  validationObject,
}: EditableInputObj & {
  editMode: boolean;
  validationObject?: FieldValidationObject;
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

export const SelectControl = ({
  onChangeHandler,
  value,
}: {
  onChangeHandler: any;
  value?: string;
}) => {
  return (
    <Form.Control
      as="select"
      onChange={onChangeHandler}
      value={value}
    ></Form.Control>
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
