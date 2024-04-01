import React, { useContext } from "react";
import Callback from "../../../../../../../models/callback/callback";
import { extractKeyValues } from "../../../../../helpers/callbacksTableUtils";
import LabelRow from "./LabelRow";
import type { ReactDispatcher } from "../../../../../helpers/reducer/reducerFunction";
import dispatchFunctionFactory from "../../../../../helpers/reducer/dispatchFunctionFactory";
import { TableContext } from "../../../../TableContext";
import EventSelect from "./EventSelect";
import { CiTrash } from "react-icons/ci";
import CallbackManager from "../../../../../../../models/callback/callbackManager";
import { DragItemsContext } from "../../../../../../DragItem/DragItemsContext";
const defaultOptions = [
  { text: "onCreate", value: "onCreate" },
  { text: "onUpdate", value: "onUpdate" },
];

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="delete-button" onClick={onClick}>
      <CiTrash> delete </CiTrash>
      delete
    </div>
  );
};

const getUpdateAndRemoveFns = (dispatcher: ReactDispatcher) => {
  const update = dispatchFunctionFactory(dispatcher).update;
  const remove = dispatchFunctionFactory(dispatcher).remove;
  return { update, remove };
};

const SelectEventColumn = ({
  callback,
  editMode,
  onChange,
  options,
}: {
  callback: Callback;
  dispatcher: ReactDispatcher;
  editMode: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { text: string; value: string }[];
}) => {
  <td>
    {editMode ? (
      <EventSelect
        options={options}
        value={callback.event}
        onChange={onChange}
      ></EventSelect>
    ) : (
      callback.event
    )}
  </td>;
};

const ArgsColumn = ({
  callback,
  editMode,
  returnOnChange,
}: {
  callback: Callback;
  editMode: boolean;
  returnOnChange: (
    key: string,
    value: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <td>
      {extractKeyValues(callback.args).map((keyValue, index) => (
        <LabelRow
          editMode={editMode}
          key={index}
          label={keyValue.label.toString()}
          value={keyValue.value}
          changeFunction={returnOnChange(
            keyValue.label.toString(),
            keyValue.value,
          )}
        />
      ))}
    </td>
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
  const { update, remove } = getUpdateAndRemoveFns(dispatcher);
  const { callbackManager } = useContext(DragItemsContext);
  if (callbackManager === undefined) {
    throw new Error("callbackManager is undefined");
  }
  const obj = callbackManager.callbackConfigObjs.get(callback.function);
  if (obj === undefined) {
    throw new Error(`callbackConfigObj not found for ${callback.function}`);
  }

  const selectOptions = obj.selectEventOptions;

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
      <SelectEventColumn
        callback={callback}
        editMode={editMode}
        dispatcher={dispatcher}

      ></SelectEventColumn>
      <td>{callback.function}</td>
      <td>
        {extractKeyValues(callback.args).map((keyValue, index) => (
          <LabelRow
            editMode={editMode}
            key={index}
            label={keyValue.label.toString()}
            value={keyValue.value}
            changeFunction={returnOnChange(
              keyValue.label.toString(),
              keyValue.value,
            )}
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
