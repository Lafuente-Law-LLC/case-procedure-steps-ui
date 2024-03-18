import React from "react";
import type { EventCallback, TaskCallback } from "../../../callback/types";
import { v4 } from "uuid";
import { CallbackWithId } from "../../../types";
import CallbackManager from "../../../callback/callbackManager";
type MenuItemProps = {
  text: string;
  defaultFn: <T extends CallbackWithId>(
    defaultFn: () => T,
    partial: Partial<T>,
  ) => void;
  type: string;
};

const MenuItem = ({ text, defaultFn, type }: MenuItemProps) => {
  const fn = CallbackManager.getCallbackManagementObj(type)?.createFn;
  if (!fn) {
    throw new Error("Callback type not registered");
  }
  const addFn = (e: React.MouseEvent<HTMLElement>) => {
    defaultFn<CallbackWithId>(fn, {});
  };
  return (
    <div className={"menu-item"} onClick={addFn}>
      {text}
    </div>
  );
};

export default MenuItem;
