import React, { useContext } from "react";
import Callback from "../../../../callback/callback";
import { extractKeyValues } from "../../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import type { ReactDispatcher } from "../../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../../helpers/reducer/dispatchFunctionFactory";
import { TableContext } from "../TableContext";
import EventSelect from "./EventSelect";
import { CiTrash } from "react-icons/ci";


const defaultOptions = [
{text: "onCreate", value: "onCreate"},
{text: "onUpdate", value: "onUpdate"}]


const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="delete-button" onClick={onClick}>
      <CiTrash> delete </CiTrash>
      delete
    </div>
  );
};

const CallbackTableRow = ({
  callback: callback,
  dispatcher,
}: {
  callback: Callback;
  dispatcher: ReactDispatcher;
}) => {
  const { editMode } = useContext(TableContext) as { editMode: boolean };

  const update = dispatchFunctionFactory(dispatcher).update;
  const remove = dispatchFunctionFactory(dispatcher).remove;

  const returnOnChange = (key: string, value: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      update(callback.id, { args: { [key]: e.target.value } });
    };
  };

  const returnOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    update(callback.id, { event: e.target.value });
  };

  return (
    <tr>
      <td>
        {editMode ? (
          <EventSelect
            options={defaultOptions}
            value={callback.event}
            onChange={returnOnSelect}
          ></EventSelect>
        ) : (
          callback.event
        )}
      </td>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            editMode={editMode}
            key={index}
            label={keyValue.label.toString()}
            value={keyValue.value}
            changeFunction={returnOnChange(keyValue.label.toString(), keyValue.value)}
          />
        ))}
      </td>
      <td>
        {editMode && <DeleteButton onClick={() => remove(callback.id)} />}
      </td>
    </tr>
  );
};

export default CallbackTableRow;
