import React, { useCallback } from "react";
import { Step } from "../../step/step";
import { DragItem } from "../DragItem";
import {
  closestElement,
  compareVerticalPosition,
  removeClassesFromElements,
  addAboveStep,
  addBelowStep,
} from "../dragItemUtil";

type DragItemOptions = {
  step: Step;
};

export const DragItemBody = ({ step }: DragItemOptions) => {
  const onDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      const draggingElement = document.querySelector<HTMLElement>(".dragging");
      const currentTarget = e.currentTarget;
      if (
        !draggingElement ||
        !currentTarget ||
        draggingElement === currentTarget ||
        !currentTarget.classList.contains("drag__item__body")
      )
        return;

      const dragItemHeadChildren = [
        ...currentTarget.querySelectorAll<HTMLElement>(".drag__item__head"),
      ].filter((element) => element !== draggingElement);
      const dragItemHead = closestElement(
        { x: e.clientX, y: e.clientY },
        dragItemHeadChildren
      );
      if (!dragItemHead) return;
      const aboveOrBelow =
        compareVerticalPosition({ x: e.clientX, y: e.clientY }, dragItemHead) ==
        1
          ? "above"
          : "below";

      const draggingElementStepId =
        draggingElement.getAttribute("data-step-id");
      const dragItemHeadStepId = dragItemHead.getAttribute("data-step-id");
      if (!draggingElementStepId || !dragItemHeadStepId) return;
      const draggingStep = step.findStepById(draggingElementStepId);
      const dragItemHeadStep = step.findStepById(dragItemHeadStepId);
      if (!draggingStep || !dragItemHeadStep) return;

      if (aboveOrBelow === "above") {
        addAboveStep(dragItemHeadStep, draggingStep);
      } else {
        addBelowStep(dragItemHeadStep, draggingStep);
      }
    },
    [step]
  );

  const onDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    removeClassesFromElements(["above", "below"]);
    const draggingElement = document.querySelector<HTMLElement>(".dragging");
    if (!draggingElement) return;
    const currentTarget = e.currentTarget;
    if (!currentTarget) return;
    if (draggingElement === currentTarget) return;
    if (!currentTarget.classList.contains("drag__item__body")) return;
    let dragItemHeadChildren = [
      ...currentTarget.querySelectorAll<HTMLElement>(".drag__item__head"),
    ].filter((element) => element !== draggingElement);

    const dragItemHead = closestElement(
      { x: e.clientX, y: e.clientY },
      dragItemHeadChildren
    );
    if (!dragItemHead) return;

    const aboveOrBelow =
      compareVerticalPosition({ x: e.clientX, y: e.clientY }, dragItemHead) == 1
        ? "above"
        : "below";

    if (aboveOrBelow === "above") {
      dragItemHead.classList.add("above");
    } else {
      dragItemHead.classList.add("below");
    }
  }, []);

  const onDragEnd = useCallback((e: React.DragEvent<HTMLElement>) => {
    removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
  }, []);

  return (
    <div
      className="drag__item__body collapse"
      id={`body_${step.id}`}
      data-step-id={step.id}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {step.steps &&
        step.steps.map((step) => {
          return step && <DragItem step={step} key={step.id} />;
        })}
    </div>
  );
};
