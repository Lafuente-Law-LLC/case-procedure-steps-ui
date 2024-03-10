import type { Step } from "../src/Step";
import type { StepManager } from "../src/StepManager";
import type TreeModel from "tree-model";
import type { Node } from "tree-model";
export type Options = { childrenPropertyName: string };
import { EVENTS } from "./components/callbacks/callbackManagers";
import CallbackManager from "./components/callbacks/callbackManager";
import type { Managers } from "./components/callbacks/callbackManagers";

import type {
  Managers,
  PartialCallback,
} from "./components/callbacks/callbackManagers";

/** Represent functions calls at specific points in the lifecycle of the Step */
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

export interface EventCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: "create_future_event";
  args: {
    title: string;
    summary: string;
    date: string;
  };
}

export interface TaskCallback extends CallbackWithId {
  event: (typeof EVENTS)[number];
  function: "create_task";
  args: {
    title: string;
    summary: string;
  };
}
export type ActionType = "add" | "remove" | "update";

type BasicAction = {
  manager: Managers;
  type: ActionType;
};

export type Action<T extends CallbackWithId> = BasicAction &
  (
    | {
        type: "add";
        payload: {
          event: string;
          args: Partial<T["args"]>;
        };
      }
    | { type: "remove"; payload: { id: string } }
    | {
        type: "update";
        payload: { id: string; event: string; args: Partial<T["args"]> };
      }
  );

export type ActionDispatcher<T extends CallbackWithId> = React.Dispatch<
  Action<T>
>;
