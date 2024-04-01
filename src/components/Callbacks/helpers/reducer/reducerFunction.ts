import Callback from "../../../../models/callback/callback";
import type { CallbackObj } from "../../../../types";


export type Action =
  | { type: "add"; data: CallbackObj & { id: string }}
  | { type: "remove"; data: { id: string } }
  | { type: "update"; data: { id: string } & Partial<CallbackObj> };

const isACallbackWithId = (data: any): data is Callback=> {
  return (
    data !== undefined &&
    data.id !== undefined &&
    data.event !== undefined &&
    data.function !== undefined &&
    data.args !== undefined
  );
};


const reducer = (state: Callback[], action: Action) => {
  if (action.data === undefined || action.type === undefined) {
    return state;
  }
  const { type, data } = action;
  switch (type) {
    case "add":
      if (!isACallbackWithId(data)) return [...state];
      const newCallback = new Callback(data); 
      if(newCallback === undefined) return [...state];
      return [...state, newCallback]
    case "remove":
      if (data.id === undefined) return [...state];  
      return state.filter((callback) => callback.id !== data.id);
    case "update":
      const callbackToUpdate = state.find((callback) => callback.id === data.id);
      if (callbackToUpdate === undefined) return state;
       callbackToUpdate.update(data);
      return [...state]
    default:
      return state;
  }
};

export type ReactDispatcher = React.Dispatch<Action>;
export default reducer;
