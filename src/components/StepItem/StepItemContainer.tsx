import React from "react";
import { Step } from "../../models/step/step";
import StepItem from "./StepItem";

type StepItemContainerProps = {
  steps: Step[];

  children?: React.ReactNode;
};

const CSS_CLASS = "step-item-container";

const StepItemContainer: React.FC<StepItemContainerProps> = ({
  steps,
  children,
}: StepItemContainerProps) => {
  return (
    <>
      <div className={CSS_CLASS}>
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </div>
      {children}
    </>
  );
};

export default StepItemContainer;
