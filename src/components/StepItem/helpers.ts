import type { DragItemHeadOptions } from "../DragItem/DragItemHead";
import { removeClassesFromElements } from "../DragItem/helpers/dragItemUtil";

export const stepItemHeadDragging = ({}: DragItemHeadOptions) => {
  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
    removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
  };

  const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      removeClassesFromElements(["drag-over"]);
      const currentTarget = e.currentTarget;
      if (currentTarget.classList.contains("drag__item__head"))
        e.stopPropagation();
      currentTarget.classList.add("drag-over");
    } catch (e) {
      return;
    }
  };

  const draggable = true;

  const draggingOptions = {
    onDragEnd,
    onDragOver,
    onDragStart,
    onDragEnter,
    draggable,
  };

  return { draggingOptions };
};
