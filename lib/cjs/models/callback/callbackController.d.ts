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
export default class CallbackController {
    static callbackConfigs: Map<string, CallbackConfig>;
    static availableEvents(functionName: string): string[];
    static registerCallbackConfig(config: CallbackConfig): void;
    static getCallbackConfig(functionName: string): CallbackConfig | undefined;
    static getLabelDataForEvent(eventName: string): string;
    static getValidatorFor(functionName: string): CallbackValidator;
    static buildDefaultArgs(argDescriptors: ArgumentSpec[]): Record<string, any>;
    static createPartialCallbackInstance(functionName: string, eventName?: string, args?: Record<string, any>): Callback;
    static createCallbackInstance(functionName: string, eventName: string, args?: Record<string, any>): Callback;
}
export {};
