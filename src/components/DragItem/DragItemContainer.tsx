import React from "react";
import { Step } from "../../models/step/step";
import { DragItem } from "./DragItem";
import { DragItemsContext } from "./DragItemsContext";
import { DragItemsOptions } from "./DragItemsContext";
import StepItem from "../StepItem/StepItem";

type DragItemProps = {
  steps: Step[];
  options: DragItemsOptions;
  children?: React.ReactNode;
};

const DragItemContainer: React.FC<DragItemProps> = ({
  steps,
  children,
  options,
}: DragItemProps) => {
  return (
    <DragItemsContext.Provider value={options}>
      <div
        className="drag_item_container"
      
      >
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </div>
      {children}
    </DragItemsContext.Provider>
  );
};

export default DragItemContainer;
