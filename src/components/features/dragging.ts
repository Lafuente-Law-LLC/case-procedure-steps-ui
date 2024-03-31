import { useCallback } from "react";
import { Step } from "../../models/step/step";

type DragEvent = React.DragEvent<HTMLElement>;
type ReactDataRef = React.RefObject<HTMLElement>;
const CSS_CLASSES = {
  dragging: "dragging",
  dragOver: "drag-over",
  above: "above",
  below: "below",
  itemHead: "drag__item__head",
};

export function removeClassesFromElements(classes: string[]) {
  classes.forEach((className) => {
    const elements = document.querySelectorAll<HTMLElement>(`.${className}`);
    elements.forEach((element) => element.classList.remove(className));
  });
}

const addDraggingElement = (e: DragEvent) => {
  e.currentTarget.classList.add(CSS_CLASSES.dragging);
};

const removeDraggingElement = (e: DragEvent) => {
  e.currentTarget.classList.remove(CSS_CLASSES.dragging);
};
const addDataTransferEffectAllowed = (
  e: DragEvent,
  effect: DataTransfer["effectAllowed"],
) => {
  e.dataTransfer.effectAllowed = effect;
};

const ePreventDefault = (e: DragEvent) => {
  e.preventDefault();
};

const currentTargetContainsClasses = (e: DragEvent, classes: string[]) => {
  const currentTarget = e.currentTarget;
  return classes.every((className) =>
    currentTarget.classList.contains(className),
  );
};

export const StepItemHeadDragProps = (refElement: ReactDataRef) => {
  return {
    draggable: true,
    onDragStart: (e: DragEvent) => {
      addDraggingElement(e);
      addDataTransferEffectAllowed(e, "move");
      e.dataTransfer.setData("text", refElement.current!.dataset.stepId!);
    },
    onDragOver: (e: DragEvent) => {
      ePreventDefault(e);
      refElement.current!.classList.add(CSS_CLASSES.dragOver);
    },
    onDragEnter: (e: DragEvent) => {
      if (currentTargetContainsClasses(e, [CSS_CLASSES.itemHead])) return;
    },
    onDragLeave: (e: DragEvent) => {
      refElement.current!.classList.remove(CSS_CLASSES.dragOver);
      refElement.current!.classList.remove(CSS_CLASSES.above);
      refElement.current!.classList.remove(CSS_CLASSES.below);
    },
    onDragEnd: (e: DragEvent) => {
      refElement.current!.classList.remove(CSS_CLASSES.dragOver);
      removeDraggingElement(e);
    },
  };
};

export const StepItemDividerDragProps = (
  refElement: ReactDataRef,
  step: Step,
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const parentStep = step.parentStep;
  if (!parentStep) throw new Error("Parent step is not defined");
  const childIndex = step.stepNode.indexAmongSiblings;
  return {
    onDragOver: useCallback((e: DragEvent) => {
      e.preventDefault();
    }, []),
    onDragEnter: useCallback(
      (e: DragEvent) => {
        setDragOver(true);
      },
      [setDragOver],
    ),
    onDragLeave: useCallback(
      (e: DragEvent) => {
        if (refElement.current == e.currentTarget) {
          setDragOver(false);
        }
      },
      [setDragOver, refElement],
    ),
    onDrop: useCallback(
      (e: DragEvent) => {
        e.preventDefault();
        const stepId = e.dataTransfer.getData("text");
        if (stepId === "") return;
        const step = parentStep.stepManager.searchById(stepId);
        if (!step) return;
        parentStep.addStepToIndex(step, childIndex);
        const draggingSelector = `.${CSS_CLASSES.dragging}`;
        const draggingElement = document.querySelector(draggingSelector);
        if (draggingElement) {
          draggingElement.classList.remove(draggingSelector);
          draggingElement.classList.add("flash");
          setTimeout(() => {
            draggingElement.classList.remove("flash");
          }, 1000);
        }
        setDragOver(false);
      },
      [parentStep, childIndex, setDragOver],
    ),
    onDragEnd: useCallback(
      (e: DragEvent) => {
        setDragOver(false);
      },
      [setDragOver],
    ),
  };
};
