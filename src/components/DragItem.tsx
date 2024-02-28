import React, { useEffect } from "react";
import { Step } from "../step/step";
import { DragItemHead } from "./dragItem/DragItemHead";
import { DragItemBody } from "./dragItem/DragItemBody";
import "../css/styles.scss";
import { removeClassesFromElements } from "./dragItemUtil";
type DragItemOptions = {
  step: Step;
};

export const DragItem = ({step}:DragItemOptions)=> {
  useEffect(() => {
    removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
  });
  return (
    <div className="drag__item" >
      <DragItemHead step={step} />
      <DragItemBody step={step} />
    </div>
  );
};
