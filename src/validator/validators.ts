import GeneralValidator from "./validator";
import { ValidationLogicFunction } from "./validator";
import type {
  CallbackConfig,
  ArgumentSpec,
} from "../models/callback/callbackFactory";
import {
  CallbackConfigAdapter,
  ArgumentSpecAdapter,
} from "../adapters/configToValidator";



const argsLogicFunction: ValidationLogicFunction = function (
  this: ArgsValidator,
  subject: any,
) {
  const validator = new ArgumentSpecAdapter(this.argsConfig).validator;
  validator.runValidations(subject);
  return validator.getErrors();
};

const callbackLogicFunction: ValidationLogicFunction = function (
  this: CallbackValidator,
  subject: any,
) {
  const validator = new CallbackConfigAdapter(this.callbackConfig).validator;
  validator.runValidations(subject);
  return validator.getErrors();
};

export class ArgsValidator extends GeneralValidator {
  argsConfig: ArgumentSpec[];
  constructor(argsConfig: ArgumentSpec[]) {
    super(argsLogicFunction);
    this.argsConfig = argsConfig;
  }
}

export class CallbackValidator extends GeneralValidator {
  callbackConfig: CallbackConfig;
  constructor(callbackConfig: CallbackConfig) {
    super(callbackLogicFunction);
    this.callbackConfig = callbackConfig;
  }
}
