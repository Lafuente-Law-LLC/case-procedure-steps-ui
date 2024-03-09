import type { Step } from "../src/Step";

export type Options = { childrenPropertyName: string };

export interface CallbackManager {
  update: (id: string, callback: Partial<CallbackWithId>) => void;
  add: (callback: Partial<CallbackWithId>) => void;
  remove: (id: string) => void;
  find: (id: string) => CallbackWithId | undefined;
}

export interface Callback {
  event: string;
  function: string;
  args: any;
}

export interface CallbackWithId extends Callback {
  id: string;
}
