import type { Node } from "tree-model";

/** Represent functions calls at specific points in the lifecycle of the Step */
export interface Callback {
  event: string;
  function: string;
  args: Record<string, any>;
}



export interface CallbackWithId extends Callback{
  id: string;
}
/** A pre-initialized Step which can contain steps as children */
export type StepObj = {
  id: string;
  title: string;
  summary: string;
  callbacks?: Callback[];
  steps?: StepObj[];
};

/** A pre-initialized Step with children instead of steps */
export interface FormattedStepObj extends StepObj {
  callbacks: Callback[];
  children: FormattedStepObj[];
}

/** A node containing all functions from the tree-model library */
export type Node = Node<FormattedStepObj>;
