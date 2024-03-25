import React from "react";
import MenuItem, { onClickFn } from "../CallbackAdditionButton/MenuItem";
import dispatchFunctionFactory from "../../helpers/reducer/dispatchFunctionFactory";
import { getFunctionFromAdminObj } from "../../helpers/callbacksTableUtils";
import type { Action } from "../../helpers/reducer/reducerFunction";

const MenuItemAddFutureEvent = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  const defaultFn = getFunctionFromAdminObj("create_future_event");
  const { add: addFn } = dispatchFunctionFactory(dispatcher);
  const text = "Create Future Event";
  const onClick: onClickFn = (e) => {
    addFn({}, defaultFn());
  };
  return <MenuItem text={text} onClickFn={onClick} />;
};

const MenuItemAddCreateTask = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  const defaultFn = getFunctionFromAdminObj("create_task");
  const { add: addFn } = dispatchFunctionFactory(dispatcher);
  const text = "Create Task";
  const onClick: onClickFn = (e) => {
    addFn({}, defaultFn());
  };
  return <MenuItem text={text} onClickFn={onClick} />;
};

const TableMenuItems = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  return (
    <>
      <MenuItemAddFutureEvent dispatcher={dispatcher} />
      <MenuItemAddCreateTask dispatcher={dispatcher} />
    </>
  );
};

export default TableMenuItems;