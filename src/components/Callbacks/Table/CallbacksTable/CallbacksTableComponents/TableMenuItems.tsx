import React, { useContext } from "react";
import MenuItem, { onClickFn } from "../CallbackAdditionButton/MenuItem";
import dispatchFunctionFactory from "../../../helpers/reducer/dispatchFunctionFactory";
import type { Action } from "../../../helpers/reducer/reducerFunction";
import { DragItemsContext } from "../../../../DragItem/DragItemsContext";

const MenuItemAddFutureEvent = ({
  dispatcher,
}: {
  dispatcher: React.Dispatch<Action>;
}) => {
  const context = useContext(DragItemsContext);
  const manager = context?.callbackManager;
  const defaultFn = manager?.getDefaultCallback("create_future_event");
  if (!defaultFn) {
    throw new Error("Default function create_future_event not found");
  }
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
  const context = useContext(DragItemsContext);
  const manager = context.callbackManager;
  const defaultFn = manager?.getDefaultCallback("create_task");
  if (!defaultFn) {
    throw new Error("Default function create_task not found");
  }
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
