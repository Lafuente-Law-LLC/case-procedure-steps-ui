import React from "react";
import { Step } from "../step/step";
import { DragItemHead } from "./dragItem/DragItemHead";
import { DragItemBody } from "./dragItem/DragItemBody";
import "../css/styles.scss";
type DragItemOptions = {
  step: Step;
};

export const DragItem = ({step}:DragItemOptions)=> {
  return (
    <div className="drag__item" >
      <DragItemHead step={step} />
      <DragItemBody step={step} />
    </div>
  );
};
