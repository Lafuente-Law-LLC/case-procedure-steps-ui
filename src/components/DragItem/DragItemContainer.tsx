import React from "react";
import { Step } from "../../step/step";
import { DragItem } from "./DragItem";
import { DragItemsContext } from "./DragItemsContext";
import { DragItemsOptions } from "./DragItemsContext";



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
      <div className="drag_item_container">
        {steps.map((step) => (
          <DragItem step={step} key={step.id}></DragItem>
        ))}
      </div>
      {children}
    </DragItemsContext.Provider>
  );
};

export default DragItemContainer;
