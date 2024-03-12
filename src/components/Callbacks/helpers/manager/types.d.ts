import type {
  EventCallbackManager,
  TaskCallbackManager,
} from "./callbackManagers";

export type Managers = typeof EventCallbackManager | typeof TaskCallbackManager;
