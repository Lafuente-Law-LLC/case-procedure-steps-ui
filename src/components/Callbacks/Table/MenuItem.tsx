import React from "react";
import type { EventCallback, TaskCallback } from "../types";
import { v4 } from "uuid";
import { CallbackWithId } from "../../../types";
type MenuItemProps = {
  text: string;
  defaultFn: <T extends CallbackWithId>(
    defaultFn: () => T,
    partial: Partial<T>
  ) => void;
  type: "event" | "task";
};


//TODO
const eventCreationFn = (): EventCallback => {
  return {
    id: v4(),
    event: "",
    function: "create_future_event",
    args: {
      title: "",
      summary: "",
      days: 0,
    },
  };
};

const taskCreationFn = (): TaskCallback => {
  return {
    id: v4(),
    event: "",
    function: "create_task",
    args: {
      title: "",
      summary: "",
    },
  };
};

const MenuItem = ({ text, defaultFn, type }: MenuItemProps) => {
  if (type !== "event" && type !== "task") {
    throw new Error("Invalid type");
  }
  const fn = type === "event" ? eventCreationFn : taskCreationFn;
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
