import { CallbackValidator } from "../../validator/validators";
import Callback from "./callback";
export type EventNameDescriptor = {
  name: string;
  label: string;
};

/** Represents a pair of function name and its arguments. */
export type FunctionArgsPair = {
  name: string;
  args: ArgDescriptor[];
  validator?: (callback: Callback) => CallbackValidator;
};

/** Represents the descriptor of an argument. */
export type ArgDescriptor = {
  name: string;
  type: string;
  default: any;
  required: boolean;
};

/**
 * Creates a default arguments object based on the provided function arguments
 * pair.
 *
 * @param funcArgsPair - The function arguments pair.
 * @returns The default arguments object.
 */
const createDefaultArgs = (
  funcArgsPair: FunctionArgsPair,
): Record<string, any> => {
  const obj: Record<string, any> = {};
  funcArgsPair.args.forEach((arg) => {
    obj[arg.name] = arg.default;
  });
  return obj;
};

/**
 * Returns an object containing the function name and its default arguments.
 *
 * @param funcArgsPair - The function arguments pair.
 * @returns The object containing the function name and its default arguments.
 */
export const returnFuncValueObj = (funcArgsPair: FunctionArgsPair) => {
  return {
    functionName: funcArgsPair.name,
    args: createDefaultArgs(funcArgsPair),
  };
};
