type Point = { x: number; y: number };
import { Step } from "../../../step/step";

export function removeClassesFromElements(classes: string[]) {
  classes.forEach((className) => {
    const elements = document.querySelectorAll<HTMLElement>(`.${className}`);
    elements.forEach((element) => element.classList.remove(className));
  });
}

export const addAboveStep = (step: Step, stepToAdd: Step) => {
  if (step.isAncestorOf(stepToAdd)) return;
  step.moveStepAboveSelf(stepToAdd);
};

export const addBelowStep = (step: Step, stepToAdd: Step) => {
  if (step.isAncestorOf(stepToAdd)) return;
  step.moveStepBelowSelf(stepToAdd);
};

export const aboveOrBelowFromPoint = (point: Point, element: HTMLElement) => {
  return compareVerticalPosition(point, element) == 1 ? "above" : "below";
};

export function closestElement(
  target: HTMLElement | Point,
  elements: HTMLElement[]
): HTMLElement | null {
  if (!elements || !elements.length) return null;

  let targetRect: any;
  if ("x" in target && "y" in target) {
    targetRect = {
      left: target.x,
      top: target.y,
      right: target.x,
      bottom: target.y,
    };
  } else {
    targetRect = (target as HTMLElement).getBoundingClientRect();
  }

  let closestElement: HTMLElement | null = null;
  let closestDistance: number = Infinity;

  elements.forEach((element) => {
    const distance = getDistance(targetRect, element);
    if (distance < closestDistance) {
      closestElement = element;
      closestDistance = distance;
    }
  });

  return closestElement;
}

function isClientRect(obj: any): obj is ClientRect {
  return (
    typeof obj === "object" &&
    "top" in obj &&
    "right" in obj &&
    "bottom" in obj &&
    "left" in obj
  );
}

function getDistance(
  targetRect: ClientRect | Point,
  element: HTMLElement
): number {
  const rect = element.getBoundingClientRect();
  let targetX: number;
  let targetY: number;

  if ("x" in targetRect && "y" in targetRect && !isClientRect(targetRect)) {
    targetX = targetRect.x;
    targetY = targetRect.y;
  } else {
    targetX = (targetRect.left + targetRect.right) / 2;
    targetY = (targetRect.top + targetRect.bottom) / 2;
  }

  const dx = targetX - (rect.left + rect.right) / 2;
  const dy = targetY - (rect.top + rect.bottom) / 2;
  return Math.sqrt(dx * dx + dy * dy);
}

export function compareVerticalPosition(
  element1: HTMLElement | Point,
  element2: HTMLElement | Point
): number {
  let rect1, rect2;

  if ("x" in element1 && "y" in element1) {
    // If element1 is a point, create a virtual rectangle around it
    rect1 = {
      left: element1.x,
      top: element1.y,
      right: element1.x,
      bottom: element1.y,
    };
  } else {
    rect1 = (element1 as HTMLElement).getBoundingClientRect();
  }

  if ("x" in element2 && "y" in element2) {
    // If element2 is a point, create a virtual rectangle around it
    rect2 = {
      left: element2.x,
      top: element2.y,
      right: element2.x,
      bottom: element2.y,
    };
  } else {
    rect2 = (element2 as HTMLElement).getBoundingClientRect();
  }

  if (rect1.bottom < rect2.top) {
    // element1 is above element2
    return 1;
  } else if (rect1.top > rect2.bottom) {
    // element1 is below element2
    return -1;
  } else {
    // element1 and element2 overlap vertically
    return 0;
  }
}

export const returnDraggingElementAndCurrentTarget = (
  e: React.DragEvent<HTMLElement>
) => {
  const draggingElement = document.querySelector<HTMLElement>(".dragging");
  throwErrorIfNoElement(draggingElement);
  const currentTarget = e.currentTarget;
  throwErrorIfNoElement(currentTarget);
  throwIfCondition(
    currentTarget === draggingElement,
    "Current target is dragging element"
  );
  return { draggingElement, currentTarget };
};

export function throwErrorIfNoElement<T>(
  element: T | null
): asserts element is NonNullable<T> {
  if (!element) {
    throw new Error("No element found");
  }
}

export function throwIfCondition(condition: boolean, message: string) {
  if (condition) {
    throw new Error(message);
  }
}

/**
 * Return the step that corresponds to the element
 *
 * @param element
 * @param step
 * @returns
 */
export const returnStepFromElement = (element: HTMLElement, step: Step) => {
  const elementStepId = element.getAttribute("data-step-id");
  if (!elementStepId) throw new Error("No step id found");
  const step1 = step.findStepById(elementStepId);
  if (!step1) throw new Error("No step found");
  return step1;
};

/**
 * Get all children of parentElement that match the selector, except for the
 * filterElement
 *
 * @param parentElement - The parent element to search for children
 * @param selector - The selector to match children
 * @param filterElement - The element to filter out of the results
 * @returns
 */
export function getFilteredChildren<T extends HTMLElement>(
  parentElement: HTMLElement,
  selector: string,
  filterElement: HTMLElement
): T[] {
  return Array.from(parentElement.querySelectorAll<T>(selector)).filter(
    (element) => element !== filterElement
  );
}
/**
 * Merges two arrays while preserving unique elements based on a mapping condition.
 * If duplicate keys are found, elements from array2 override elements from array1.
 * @param {T[]} array1 - The first array to merge.
 * @param {T[]} array2 - The second array to merge. Elements from this array override array1 if duplicate keys are encountered.
 * @param {(item: T) => [string, T]} mappingCondition - A mapping condition function that takes an element of type T and returns a tuple [string, T] where the string represents the key.
 * @returns {T[]} The merged array containing unique elements based on the mapping condition.
 * @template T
 */
export function mergeArraysWithOverride<T>(
  array1: T[],
  array2: T[],
  mappingCondition: (item: T) => [string, T]
): T[] {
  const mergedMap = new Map([...array1, ...array2].map(mappingCondition));
  return Array.from(mergedMap.values());
}

