import React from "react";
import type { EventCallback, TaskCallback } from "../../../callback/types";
import { v4 } from "uuid";
import { CallbackWithId } from "../../../types";
import CallbackManager from "../../../callback/callbackManager";
type MenuItemProps = {
  text: string;
  addFn: any;
  defaultFn: any;
  type: string;
};

const MenuItem = ({ text,type, addFn, defaultFn}: MenuItemProps) => {
  const cddFn = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    defaultFn(addFn, {})
  }
  return (
    <div className={"menu-item"} onClick={cddFn}>
      {text}
    </div>
  );

};

export default MenuItem;
