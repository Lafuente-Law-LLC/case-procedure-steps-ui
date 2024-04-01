import type { Action } from "./reducerFunction";
import Callback from "../../../../models/callback/callback";
import { merge } from "lodash";
import {CallbackObj} from "../../../../types";
export type ReactDispatcher = React.Dispatch<Action>;

const dispatchFunctionFactory = (dispatch: ReactDispatcher) => {
  const add = <T extends Callback>(partial: Partial<T>, defaultCallbackObj: CallbackObj) => {
    const data = merge(defaultCallbackObj, partial);
    dispatch({ type: "add", data });
  };

  const remove = (id: string) => {
    const data = { id };
    dispatch({ type: "remove", data });
  };
  const update = (id: string, partial: Partial<Callback>) => {
    const data = { id, ...partial };
    dispatch({ type: "update", data });
  };
  return { add, remove, update };
};

export default dispatchFunctionFactory;
