import {
  closestElement,
  aboveOrBelowFromPoint,
  getFilteredChildren,
} from "../utils/domTools";
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

const getCurrentTarget = (e: DragEvent) => {
  if (!e.currentTarget) throw new Error("No current target found");
  if (!(e.currentTarget instanceof HTMLElement))
    throw new Error("Current target is not an HTMLElement");
  return e.currentTarget as HTMLElement;
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
const returnDraggingElement = (e: DragEvent) => {
  const draggingElement = document.querySelector<HTMLElement>(".dragging");
  if (!draggingElement) throw new Error("No dragging element found");
  return draggingElement;
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

const StepItemHeadDragProps = (refElement: ReactDataRef) => {
  return {
    draggable: true,
    onDragOver: (e: DragEvent) => {
      ePreventDefault(e);
    },
    onDragStart: (e: DragEvent) => {
      addDraggingElement(e);
      addDataTransferEffectAllowed(e, "move");
    },
    onDragEnd: (e: DragEvent) => {
      removeDraggingElement(e);
      removeClassesFromElements([
        CSS_CLASSES.dragOver,
        CSS_CLASSES.above,
        CSS_CLASSES.below,
      ]);
    },
    onDragLeave: (e: DragEvent) => {
      try {
        ePreventDefault(e);
        const currentTarget = getCurrentTarget(e);
        if (currentTarget.classList.contains(CSS_CLASSES.itemHead))
          e.stopPropagation();
        currentTarget.classList.remove(CSS_CLASSES.dragOver);
      } catch (e) {
        return;
      }
    },
    onDragEnter: (e: DragEvent) => {
      try {
        ePreventDefault(e);
        removeClassesFromElements([CSS_CLASSES.dragOver]);
        const currentTarget = getCurrentTarget(e);
        if (currentTarget.classList.contains(CSS_CLASSES.itemHead))
          e.stopPropagation();
        currentTarget.classList.add(CSS_CLASSES.dragOver);
      } catch (e) {
        return;
      }
    },
  };
};

const test = (e: DragEvent) => {
  try {
    ePreventDefault(e);
    removeClassesFromElements([CSS_CLASSES.above, CSS_CLASSES.below]);
    const draggingElement = returnDraggingElement(e);
    const currentTarget = getCurrentTarget(e);

    const dragItemHeadChildren = getFilteredChildren<HTMLElement>(
      currentTarget,
      `.${CSS_CLASSES.itemHead}`,
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
};

export const StepItemBodyDragProps = (refElement: ReactDataRef) => {
  return {
    onDragEnter: (e: DragEvent) => {
      const dragging = document.querySelector<HTMLElement>(".dragging");
      const point = { x: e.clientX, y: e.clientY };
      refElement.current?.classList.add(CSS_CLASSES.dragOver);
      const aboveOrBelow = aboveOrBelowFromPoint(point, refElement.current);
      
    },
    onDragOver: (e: DragEvent) => {
      ePreventDefault(e);
    },
    onDrop: (e: DragEvent) => {
      const dataObj = e.dataTransfer.getData("text");
      
    },
  };
};
