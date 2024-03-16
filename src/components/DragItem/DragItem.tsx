import React, { useEffect, useState, memo } from "react";
import { Step } from "../../step/step";
import { DragItemHead } from "./DragItemHead";
import { DragItemBody } from "./DragItemBody";


type DragItemOptions = {
  step: Step;
};

export const DragItem = ({ step }: DragItemOptions) => {
  const [collapseOpen, setCollapseOpen] = useState(false); 
  return (
    <div className="drag__item">
      <DragItemHead
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        step={step}
      />
      <DragItemBody collapseOpen={collapseOpen} step={step} />
    </div>
  );
};
