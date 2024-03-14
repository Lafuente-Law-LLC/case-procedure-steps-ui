import type { Dispatcher } from "./reducerFunction";
import type { CallbackWithId } from "../../../../types";
import { merge } from "lodash";

const dispatchFunctionFactory = (dispatch: Dispatcher) => {
  const add = <T extends CallbackWithId>(
    defaultFn: () => T,
    partial: Partial<T>,
  ) => {
    const data = merge({}, defaultFn(), partial);
    dispatch({ type: "add", data });
  };
  const remove = (id: string) => {
    const data = { id };
    dispatch({ type: "remove", data });
  };
  const update = (id: string, partial: Partial<CallbackWithId>) => {
    const data = { id, ...partial };
    dispatch({ type: "update", data });
  };
  return { add, remove, update };
};


export default dispatchFunctionFactory;
