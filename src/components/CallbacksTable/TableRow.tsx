import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Callback from "../../models/callback/callback";
import CallbackFactory from "../../models/callback/callbackFactory";
import CallbacksTableContext from "./CallbacksTableContext";
import { Step } from "../../models/step/step";

const EventNameCell = ({
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

const FunctionNameCell = ({ functionName }: { functionName: string }) => {
  return <td>{functionName}</td>;
};

const TableRow = ({
  callback,
  editMode,
}: {
  callback: Callback;
  editMode: boolean;
}) => {
  const { step } = useContext(CallbacksTableContext) as { step: Step };
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    step.updateCallback(callback, { eventName: e.target.value });
  };

  return (
    <tr>
      <EventNameCell
        onChangeHandler={onChangeHandler}
        editMode={editMode}
        callback={callback}
      />
      <FunctionNameCell functionName={callback.functionName} />
    </tr>
  );
};

export default TableRow;
