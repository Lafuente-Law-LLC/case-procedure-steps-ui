import Callback from "./callback";
import type { CallbackValidator } from "../../validator/validators";

function formatString(input: string): string { 
  const words = input.split("_");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedString;
}
type eventName = string;
type functionName = string;
/**
 * Describes an argument related to a function. It contains the name of the
 * argument, the type of the argument, the default value of the argument, and
 * whether the argument is required.
 *
 * @note
 *  default is the default value of the argument
 */
export type ArgDescriptor = {
  name: string;
  type: string;
  default: any;
  required: boolean;
};

/**
 * Represents a map of registered event names to their corresponding function
 * names.
 */
type RegisteredEventNamesMap = Map<eventName, eventNameData>;
type eventNameData = {
  functionNames: RegisteredFunctionNamesMap;
};
/**
 * Represents a map of registered function names to their corresponding
 * EventFunctionData.
 */
type RegisteredFunctionNamesMap = Map<functionName, EventFunctionData>;
/**
 * Represents the data related to an event and function pair. It contains the
 * arguments that the function will receive and an optional validator function.
 * This information is mapped as such because events can have multiple functions
 * registered to them. The validator function is optional because not all
 * functions require validation.
 */
type EventFunctionData = {
  argDescriptors: ArgDescriptor[];
  validator?: (callback: Callback) => CallbackValidator;
};

/**
 * Represents a callback registration object. It contains the event name, the
 * function name, the arguments that the function will receive, and an optional
 * validator function. This object is used to register callbacks to events.
 */
export type CallbackRegistrationObject = {
  eventName: string;
  functionName: string;
  argDescriptors: ArgDescriptor[];
  validator?: (callback: Callback) => CallbackValidator;
};
export default class CallbackFactory {
  static registeredFunctionNames: RegisteredFunctionNamesMap = new Map();
  static registeredEventNames: RegisteredEventNamesMap = new Map();

  static registerCallbackType(
    callbackRegistrationObject: CallbackRegistrationObject,
  ) {
    const { eventName, functionName, argDescriptors, validator } =
      callbackRegistrationObject;
    let eventMap = this.registeredEventNames.get(eventName);
    if (!eventMap) {
      this.registeredEventNames.set(eventName, {
        functionNames: new Map(),
      });
      eventMap = this.registeredEventNames.get(eventName);
    }
    if (!eventMap) {
      throw new Error("Event map not found");
    }
    eventMap.functionNames.set(functionName, { argDescriptors, validator });
  }

  static getLabelDataForEvent(eventName: string) {
    const evtNameStr = this.registeredEventNames.get(eventName);
    if (!evtNameStr) {
      throw new Error("Event not found");
    }
    return formatString(eventName);
  }

  static getValidatorFor(eventName: string, functionName: string) {
    const { validator } = this.getFunctionDataFor(eventName, functionName);
    return validator;
  }

  static buildDefaultArgs = (argDescriptors: ArgDescriptor[]) => {
    const obj: Record<string, any> = {};
    argDescriptors.forEach((arg) => {
      obj[arg.name] = arg.default;
    });
    return obj;
  };

  static getFunctionDataFor(eventName: string, functionName: string) {
    const event = this.registeredEventNames.get(eventName);
    if (!event) {
      throw new Error("Event not found");
    }
    const functionData = event.functionNames.get(functionName);
    if (!functionData) {
      throw new Error("Function not found");
    }
    return functionData;
  }

  static isInEventNames(eventName: string) {
    return this.registeredEventNames.has(eventName);
  }

  static getArgDescriptorsFor(eventName: string, functionName: string) {
    const functionData = this.getFunctionDataFor(eventName, functionName);
    return functionData.argDescriptors;
  }

  static isFunctionNameFor(eventName: string, functionName: string) {
    const event = this.registeredEventNames.get(eventName);
    if (!event) {
      return false;
    }
    return event.functionNames.has(functionName);
  }

  static getEventLabelPairs() {
    
    const allEventNames = Array.from(this.registeredEventNames.keys());
    return allEventNames.map((eventName) => {
      return [eventName, this.getLabelDataForEvent(eventName)];
    });
  }

  static createCallbackInstance(
    functionName: string,
    eventName: string,
    args?: Record<string, any>,
  ) {
    const event = this.registeredEventNames.get(eventName);
    if (!event) {
      throw new Error("Event not found");
    }
    const functionData = event.functionNames.get(functionName);
    if (!functionData) {
      throw new Error("Function not found");
    }
    const argDescriptors = functionData.argDescriptors;
    return new Callback({
      eventName,
      functionName,
      args: args || this.buildDefaultArgs(argDescriptors),
    });
  }


  static getEventNames(functionName: string) {
    const eventNames = Array.from(this.registeredEventNames.keys());
    return eventNames.filter((eventName) =>
      this.isFunctionNameFor(eventName, functionName),
    );
  }
}
