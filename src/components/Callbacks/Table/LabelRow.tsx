import React from "react";
import type { Dispatcher } from "../helpers/reducer/reducerFunction";
import {
  TaskCallbackManager,
  EventCallbackManager,
} from "../helpers/manager/callbackManagers";
import { EditText } from "react-edit-text";
const LabelRow = ({
  label,
  value,
  update,
}: {
  label: string;
  value: string;
  update: (data: any) => void;
}) => {
  const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ [label.toLowerCase()]: e.target.value });
  };

  return (
    <div className="row">
      <div className="col-4 fw-semibold text-secondary">{label}</div>
      <div className="col-8">
        <EditText defaultValue={value} onChange={update}></EditText>
      </div>
    </div>
  );
};

export default LabelRow;
