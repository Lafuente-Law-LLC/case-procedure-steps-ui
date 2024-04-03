import React from "react";
import { Step } from "../../models/step/step";
import StepItem from "./StepItem";

type StepItemContainerProps = {
  steps: Step[];

  children?: React.ReactNode;
};

const StepItemContainer: React.FC<StepItemContainerProps> = ({
  steps,
  children,
}: StepItemContainerProps) => {
  return (
    <>
      <div className="drag_item_container">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </div>
      {children}
    </>
  );
};

export default StepItemContainer;
