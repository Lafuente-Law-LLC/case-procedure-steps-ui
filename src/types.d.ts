import type { Step } from "../src/Step";
import type { StepManager } from "../src/StepManager";
import type TreeModel from "tree-model";
import type { Node } from "tree-model";
export type Options = { childrenPropertyName: string };

import type {
  Managers,
  PartialCallback,
} from "./components/callbacks/callbackManagers";



export interface Callback {
  event: string;
  function: string;
  args: any;
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

export interface CallbackWithId extends Callback {
  id: string;
}

interface AddAction {
  manager: Managers;
  type: "add";
  payload: {
    callback: PartialCallback;
  };
}

interface RemoveAction {
  manager: Managers;
  type: "remove";
  payload: {
    id: string;
  };
}

interface UpdateAction {
  manager: Managers;
  type: "update";
  payload: {
    id: string;
    callback: PartialCallback;
  };
}

export type Action = AddAction | RemoveAction | UpdateAction;
