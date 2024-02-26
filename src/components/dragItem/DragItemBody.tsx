import React from "react";
import { Step } from "../../step/step";
import { DragItem } from "../DragItem";

type DragItemOptions = {
  step: Step;
};

export const DragItemBody = ({ step }: DragItemOptions) => {
  
  return (
    <div className="drag__item__body collapse" id={`body_${step.id}`}>
      {step.steps &&
        step.steps.map((step) => {
          return step && <DragItem step={step} key={step.id} />;
        })}
    </div>
  );
};
