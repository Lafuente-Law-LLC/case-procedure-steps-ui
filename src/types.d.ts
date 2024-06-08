import type { Node } from "tree-model";
import Callback from "./models/callback/callback";

export type ReactClickHandler = React.MouseEventHandler<
  HTMLDivElement | SVGElement
>;
export type ReactDragEventHandler = React.DragEventHandler<
  HTMLDivElement | SVGElement
>;

/**
 * Each StepObject will have 0 to many CallbackObjs which contain information
 * about functions to be called during a particular event. The CallbackObj also
 * contains information about the args that the function will receive.
 */
export type CallbackObj = {
  eventName: string;
  functionName: string;
  args: Record<string, any>;
};

/**
 * This is a foundational object as it contains the properties which will
 * eventually yield a valid Step. This object is precusor see the
 * FormattedStepObj. From the outside the StepObj is coming with steps which are
 * children.
 */
export type StepObj = {
  id: string;
  title: string;
  summary: string;
  callbacks?: CallbackObj[];
  steps?: StepObj[];
};

/** A pre-initialized Step with children instead of steps */
export interface FormattedStepObj extends StepObj {
  callbacks: Callback[];
  children: FormattedStepObj[];
}

/**
 * A node containing all functions from the tree-model library. It is called a
 * treeNode because it is meant to encompass
 */
export type TreeNode = Node<FormattedStepObj>;

export type FieldValidationObject = {
  valid: boolean;
  message: string;
};
