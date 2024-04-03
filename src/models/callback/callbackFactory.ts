import Callback from "./callback";
import type { FunctionArgsPair } from "./funtionArgsPair";
import { returnFuncValueObj } from "./funtionArgsPair";

export default class CallbackFactory {
  static functionNames = new Set<string>();
  static registeredEventNames = new Set<string>();
  static functionArgsPairs = new Map<string, FunctionArgsPair>();

  static registerEventName(eventName: string) {
    this.registeredEventNames.add(eventName);
  }

  static isInEventNames(eventName: string) {
    return this.registeredEventNames.has(eventName);
  }

  static registerFunctionArgsPair(funcArgsPair: FunctionArgsPair) {
    this.functionNames.add(funcArgsPair.name);
    this.functionArgsPairs.set(funcArgsPair.name, funcArgsPair);
  }

  static getFunctionArgsPair(functionName: string) {
    return this.functionArgsPairs.get(functionName);
  }
  static isFunctionName(functionName: string) {
    return this.functionNames.has(functionName);
  }

  static createCallback(
    functionName: string,
    eventName?: string,
    args?: Record<string, any>,
  ) {
    if (eventName && !this.isInEventNames(eventName)) {
      throw new Error("Invalid event name");
    }
    if (!this.isFunctionName(functionName)) {
      throw new Error("Invalid function name");
    }
    const funcArgsPair = this.getFunctionArgsPair(functionName);
    if (!funcArgsPair) {
      throw new Error("Invalid function name");
    }

    args = !args ? returnFuncValueObj(funcArgsPair).args : args;
    return new Callback({ eventName: eventName || "", functionName, args });
  }
}
