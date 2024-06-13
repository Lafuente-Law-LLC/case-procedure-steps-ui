import GeneralValidator from "./validator";
import type { CallbackConfig, ArgumentSpec } from "../models/callback/callbackController";
declare class ArgumentSpecValidator extends GeneralValidator {
    constructor(argumentSpec: ArgumentSpec[]);
}
export declare class CallbackValidator extends GeneralValidator {
    argsValidator: ArgumentSpecValidator;
    constructor(callbackConfig: CallbackConfig);
    validateArgs(args: any): Record<string, string[]>;
}
export {};
