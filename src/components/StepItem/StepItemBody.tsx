import React, { useState } from "react";
import { Step } from "../../models/step/step";
import { Collapse } from "react-bootstrap";

const CSS_CLASSES = {
  MAIN: "step-item-body",
};
export type StepItemBodyProps = {
  step: Step;
};

const StepItemBody: React.FC<StepItemBodyProps> = ({ step }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  return (
    <Collapse in={collapseOpen}>
      <div
        className={CSS_CLASSES.MAIN}
        id={`body_${step.id}`}
        data-step-id={step.id}
      >
        {}
      </div>
    </Collapse>
  );
};

export default StepItemBody;
