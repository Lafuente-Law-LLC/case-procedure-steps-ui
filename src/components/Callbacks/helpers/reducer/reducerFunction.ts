import type { CallbackWithId } from "../../../../types";
import { merge } from "lodash";
export type Action =
  | { type: "add"; data: CallbackWithId }
  | { type: "remove"; data: { id: string } }
  | { type: "update"; data: { id: string } & Partial<CallbackWithId> };

const isACallbackWithId = (data: any): data is CallbackWithId => {
  return (
    data !== undefined &&
    data.id !== undefined &&
    data.event !== undefined &&
    data.function !== undefined &&
    data.args !== undefined
  );
};


const reducer = (state: CallbackWithId[], action: Action) => {
  if (action.data === undefined || action.type === undefined) {
    return state;
  }
  const { type, data } = action;
  switch (type) {
    case "add":
      if (!isACallbackWithId(data)) return state;
      return [...state, data]
    case "remove":
      if (!isACallbackWithId(data)) return state;
      return state.filter((callback) => callback.id !== data.id);
    case "update":
      return state.map((callback) =>
        callback.id === action.data.id
          ? merge({}, callback, action.data)
          : callback,
      );
    default:
      return state;
  }
};

export type Dispatcher = React.Dispatch<Action>;
export default reducer;
