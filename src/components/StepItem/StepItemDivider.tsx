import React, { useState, useRef } from "react";
import { Step } from "../../models/step/step";
import { StepItemDividerDragProps } from "../features/dragging";
import { DRAGGING_CSS_CLASSES } from "../features/dragging";
const CSS_CLASSES = {
  MAIN: "step-item-divider",
};

const StepItemDivider = ({ step }: { step: Step }) => {
  const [dragOver, setDragOver] = useState(false);
  const refElement = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={refElement}
      className={CSS_CLASSES.MAIN + (dragOver ? ` ${DRAGGING_CSS_CLASSES.dragOver}` : "")}
      {...StepItemDividerDragProps(refElement, step, setDragOver)}
    />
  );
};

export default StepItemDivider;
