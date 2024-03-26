import { createContext } from "react";
import CallbackManager from "../../callback/callbackManager";

export type DragItemsOptions = {
  callbackManager?: CallbackManager;
}

const defaultOptions = {
  callbackManager:  undefined,
};

export const DragItemsContext = createContext<DragItemsOptions>(defaultOptions);
