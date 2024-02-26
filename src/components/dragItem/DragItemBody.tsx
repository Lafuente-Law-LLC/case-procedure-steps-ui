import React from "react";
import { Step } from "../../step/step";
import { DragItem } from "../DragItem";
import {closestElementFromCoordinate, aboveOrBelowElement} from "dometrics"
type DragItemOptions = {
  step: Step;
};

export const DragItemBody = ({ step }: DragItemOptions) => {
  const dragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();

  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const elementTarget = e.currentTarget as HTMLElement;
    if(!elementTarget) return;

    const draggingElement = document.querySelector(".dragging") as HTMLElement;
    if(!draggingElement) return;
    const itemHeads = elementTarget.querySelectorAll<HTMLElement>(".drag__item__head")
    if(!itemHeads) return;
    const currentCoordinate = {x: e.clientX, y: e.clientY}
    const closestElement = closestElementFromCoordinate(currentCoordinate, itemHeads, "centerMiddle" )
    if(!closestElement) return;
    const aboveOrBelow = aboveOrBelowElement(currentCoordinate, closestElement, "centerMiddle")
    if(!aboveOrBelow) return;
    const stepForDragging = step.findStepById(draggingElement.dataset.stepId);
    if(!stepForDragging) return;
    const stepForTarget = step.findStepById(closestElement.dataset.stepId);
    if(!stepForTarget) return; 
    if (stepForDragging && stepForTarget) {
      if (aboveOrBelow === "above") {
        stepForTarget.moveStepAboveSelf(stepForDragging)
      } else {
        stepForTarget.moveStepBelowSelf(stepForDragging)
      }
    }
  }

  return (
    <div
      className="drag__item__body collapse"
      id={`body_${step.id}`}
      data-step-id={step.id}
      onDragOver={dragOver}
      onDrop={onDrop}
    >
      {step.steps &&
        step.steps.map((step) => {
          return step && <DragItem step={step} key={step.id} />;
        })}
    </div>
  );
};
