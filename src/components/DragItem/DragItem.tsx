import React, { useEffect } from "react";
import { Step } from "../../step/step";
import { DragItemHead } from "./DragItemHead";
import { DragItemBody } from "./DragItemBody";

import { removeClassesFromElements } from "./helpers/dragItemUtil";
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
