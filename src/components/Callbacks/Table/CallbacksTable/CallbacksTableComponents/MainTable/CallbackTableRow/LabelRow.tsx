import React from "react";
type ChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

const EditableInput = ({
  label,
  value,
  changeFunction,
}: {
  label: string;
  value: string;
  changeFunction: ChangeFunction;
}) => {
  const type = label === "days" ? "number" : "text";
  return (

      <input type={type} value={value} onChange={changeFunction} />

  );
};

const LabelRow = ({
  editMode,
  label,
  value,
  changeFunction,
}: {
  editMode: boolean;
  label: string;
  value: string;
  changeFunction: ChangeFunction;
}) => {
  return (
    <div className="label-row-component">
      <div className="label">{label}</div>
      <div className="value">
        {!editMode ? (
          value
        ) : (
          <EditableInput
            label={label}
            value={value}
            changeFunction={changeFunction}
          ></EditableInput>
        )}
      </div>
    </div>
  );
};

export default LabelRow;
