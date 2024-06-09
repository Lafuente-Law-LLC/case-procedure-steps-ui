import Callback from "./callback";
import { CallbackValidator } from "../../validator/validators";

type EventConfig = {
  in: string[];
  default: string;
};

export type ArgumentSpec = {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array" | "function";
  default: any;
  required: boolean;
};

export type CallbackConfig = {
  functionName: string;
  eventName: EventConfig;
  args: ArgumentSpec[];
};

function formatString(input: string): string {
  const words = input.split("_");
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedString;
}

export default class CallbackFactory {
  static callbackConfigs: Map<string, CallbackConfig> = new Map();

  static availableEvents(functionName: string) {
    const callbackConfig = this.getCallbackConfig(functionName);
    if (!callbackConfig) {
      throw new Error("Callback not found");
    }
    return callbackConfig.eventName.in;
  }
  static registerCallbackConfig(config: CallbackConfig) {
    this.callbackConfigs.set(config.functionName, config);
  }

  static getCallbackConfig(functionName: string) {
    return this.callbackConfigs.get(functionName);
  }

  static getLabelDataForEvent(eventName: string) {
    return formatString(eventName);
  }

  static getValidatorFor(functionName: string) {
    const callbackConfig = this.getCallbackConfig(functionName);
    if (!callbackConfig) {
      throw new Error("Callback not found");
    }

    return new CallbackValidator(callbackConfig);
  }

  static buildDefaultArgs = (argDescriptors: ArgumentSpec[]) => {
    const obj: Record<string, any> = {};
    argDescriptors.forEach((arg) => {
      obj[arg.name] = arg.default;
    });
    return obj;
  };

  static createPartialCallbackInstance(
    functionName: string,
    eventName?: string,
    args?: Record<string, any>,
  ) {
    const callbackConfig = this.getCallbackConfig(functionName);
    if (!callbackConfig) {
      throw new Error("Callback not found");
    }
    eventName = eventName ? eventName : callbackConfig.eventName.default;
    const events = callbackConfig.eventName.in;
    if (!events.includes(eventName)) {
      throw new Error("Event not allowed for this callback");
    }
    return this.createCallbackInstance(functionName, eventName, args);
  }

  static createCallbackInstance(
    functionName: string,
    eventName: string,
    args?: Record<string, any>,
  ) {
    const callbackConfig = this.getCallbackConfig(functionName);
    if (!callbackConfig) {
      throw new Error("Callback not found");
    }
    const events = callbackConfig.eventName.in;
    if (!events.includes(eventName)) {
      throw new Error("Event not allowed for this callback");
    }

    const eventDefault = callbackConfig.eventName.default;

    if (eventName !== eventDefault) {
      throw new Error("Event not allowed for this callback");
    }

    args = args ? args : this.buildDefaultArgs(callbackConfig.args);

    return new Callback({
      functionName,
      eventName,
      args,
    });
  }
}
