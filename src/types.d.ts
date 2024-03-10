import type { Step } from "../src/Step";
export type Options = { childrenPropertyName: string };
import type {
  Managers,
  PartialCallback
} from "./components/callbacks/callbackManagers";

export interface Callback {
  event: string;
  function: string;
  args: any;
}

export interface CallbackWithId extends Callback {
  id: string;
}

interface AddAction {
  manager: Managers;
  type: "add";
  payload: {
    callback: PartialCallback
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
