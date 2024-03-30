import React, { useRef } from "react";
import { Step } from "../../models/step/step";
import { Collapse } from "react-bootstrap";
import StepItem from "./StepItem";
import { StepItemBodyDragProps } from "../features/dragging";
const CSS_CLASSES = {
  MAIN: "step-item-body",
};
export type StepItemBodyProps = {
  step: Step;
  collapseOpen: boolean;
};

const StepItemBody: React.FC<StepItemBodyProps> = ({ step, collapseOpen }) => {
  const refElement = useRef<HTMLDivElement>(null);
  const steps = step.steps;
  return (
    <Collapse in={collapseOpen}>
      <div
        ref={refElement}
        className={CSS_CLASSES.MAIN}
        id={`body_${step.id}`}
        data-step-id={step.id}
   

        {...StepItemBodyDragProps(refElement)}
      >
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </div>
    </Collapse>
  );
};

export default StepItemBody;
