import React, { useState, useRef } from "react";
import { Step } from "../../models/step/step";
import { StepItemDividerDragProps } from "../features/dragging";
const CSS_CLASSES = {
  MAIN: "step-item-divider",
};

const StepItemDivider = ({ step }: { step: Step }) => {
  const [dragOver, setDragOver] = useState(false);
  const refElement = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={refElement}
      className={CSS_CLASSES.MAIN + (dragOver ? " drag-over" : "")}
      {...StepItemDividerDragProps(refElement, step, setDragOver)}
    />
  );
};

export default StepItemDivider;
