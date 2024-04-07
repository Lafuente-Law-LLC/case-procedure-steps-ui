import type { Node } from "tree-model";
import Callback from "./models/callback/callback";


export type CallbackObj = {
  event: string;
  function: string;
  args: Record<string, any>;
};
export type ReactClickHandler = React.MouseEventHandler<
  HTMLDivElement | SVGElement
>;
export type ReactDragEventHandler = React.DragEventHandler<
  HTMLDivElement | SVGElement
>;

export type StepObj = {
  id: string;
  title: string;
  summary: string;
  callbacks?: CallbackObj[];
  steps?: StepObj[];
};

export type ValidationObject = {
  valid: boolean;
  message: string;
};

/** A pre-initialized Step with children instead of steps */
export interface FormattedStepObj extends StepObj {
  callbacks: Callback[];
  children: FormattedStepObj[];
}

/** A node containing all functions from the tree-model library */
export type TreeNode = Node<FormattedStepObj>;
