import type { Node } from "tree-model";
import type Callback from "./callback/callback";
export type CallbackObj = { 
  event: string;
  functionName: string;
  args: Record<string, any>;
};

/** A pre-initialized Step which can contain steps as children */
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

/** A node containing all functions from the tree-model library */
export type Node = Node<FormattedStepObj>;
