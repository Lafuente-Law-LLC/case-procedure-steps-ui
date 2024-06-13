/// <reference types="react" />
import { Step } from "../../models/step/step";
type DragEvent = React.DragEvent<HTMLElement>;
type ReactDataRef = React.RefObject<HTMLElement>;
export declare const DRAGGING_CSS_CLASSES: {
    dragging: string;
    dragOver: string;
    above: string;
    below: string;
};
export declare const StepItemHeadDragProps: (refElement: ReactDataRef) => {
    draggable: boolean;
    onDragStart: (e: DragEvent) => void;
    onDragOver: (e: DragEvent) => void;
    onDragEnter: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
};
export declare const StepItemDividerDragProps: (refElement: ReactDataRef, step: Step, setDragOver: React.Dispatch<React.SetStateAction<boolean>>) => {
    onDragOver: (e: DragEvent) => void;
    onDragEnter: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
};
export {};
