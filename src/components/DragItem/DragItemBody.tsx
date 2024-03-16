import React, { useCallback } from "react";
import { Step } from "../../step/step";
import { DragItem } from "./DragItem";
import {
  closestElement,
  removeClassesFromElements,
  addAboveStep,
  addBelowStep,
  returnDraggingElementAndCurrentTarget,
  aboveOrBelowFromPoint,
  getFilteredChildren,
  returnStepFromElement,
  throwIfCondition,
} from "./helpers/dragItemUtil";

type DragItemOptions = {
  step: Step;
};

export const DragItemBody = ({ step }: DragItemOptions) => {
  const onDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      try {
        e.preventDefault();
        const { draggingElement, currentTarget } =
          returnDraggingElementAndCurrentTarget(e);
        throwIfCondition(
          !currentTarget.classList.contains("drag__item__body"),
          "Current target is not a drag item body",
        );
        const dragItemHeadChildren = getFilteredChildren<HTMLElement>(
          currentTarget,
          ".drag__item__head",
          draggingElement,
        );

        const currentPoint = { x: e.clientX, y: e.clientY };
        const closestDragItemHead = closestElement(
          currentPoint,
          dragItemHeadChildren,
        );
        if (!closestDragItemHead) return;

        const aboveOrBelow = aboveOrBelowFromPoint(
          currentPoint,
          closestDragItemHead,
        );
        const draggingElementStep = returnStepFromElement(
          draggingElement,
          step,
        );
        const dragItemHeadStep = returnStepFromElement(
          closestDragItemHead,
          step,
        );

        aboveOrBelow === "above"
          ? addAboveStep(dragItemHeadStep, draggingElementStep)
          : addBelowStep(dragItemHeadStep, draggingElementStep);

        draggingElement.classList.add("flash");
        setTimeout(() => {
          draggingElement.classList.remove("flash");
        }, 1000);
      } catch (e) {
        return;
      }
    },
    [step],
  );

  const onDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      removeClassesFromElements(["above", "below"]);
      const { draggingElement, currentTarget } =
        returnDraggingElementAndCurrentTarget(e);

      const dragItemHeadChildren = getFilteredChildren<HTMLElement>(
        currentTarget,
        ".drag__item__head",
        draggingElement,
      );

      const currentPoint = { x: e.clientX, y: e.clientY };
      const dragItemHead = closestElement(currentPoint, dragItemHeadChildren);
      if (!dragItemHead) return;

      const aboveOrBelow = aboveOrBelowFromPoint(currentPoint, dragItemHead);
      dragItemHead.classList.add(aboveOrBelow);
    } catch (e) {
      return;
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
