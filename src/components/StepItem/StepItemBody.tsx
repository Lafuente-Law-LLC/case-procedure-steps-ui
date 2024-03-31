import React, { useRef, useState } from "react";
import { Step } from "../../models/step/step";
import { Collapse } from "react-bootstrap";
import StepItem from "./StepItem";
import StepItemDivider from "./StepItemDivider";

const CSS_CLASSES = {
  MAIN: "step-item-body",
};

export type StepItemBodyProps = {
  step: Step;
  collapseOpen: boolean;
};

const StepItemBody: React.FC<StepItemBodyProps> = ({
  step: parentStep,
  collapseOpen,
}) => {
  const refElement = useRef<HTMLDivElement>(null);
  const steps = parentStep.steps;
  return (
    <Collapse in={collapseOpen}>
      <div
        ref={refElement}
        className={CSS_CLASSES.MAIN}
        id={`body_${parentStep.id}`}
        data-step-id={parentStep.id}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <StepItemDivider step={step} />
            <StepItem step={step} />
            {index + 1 == steps.length && <StepItemDivider step={step} />}
          </React.Fragment>
        ))}
      </div>
    </Collapse>
  );
};

export default StepItemBody;
