import GeneralValidator from "./validator";
import { Validator } from "model-validations";

import type {
  CallbackConfig,
  ArgumentSpec,
} from "../models/callback/callbackController";
import {
  CallbackTransformer,
  ArgumentSpecTransformer,
} from "../adapters/modelValidationsAdapter";

class ArgumentSpecValidator extends GeneralValidator {
  constructor(argumentSpec: ArgumentSpec[]) {
    const collection: any[] = [];
    argumentSpec.forEach((argSpec) => {
      const argSpecTransformer = new ArgumentSpecTransformer(argSpec);
      collection.push(argSpecTransformer.validationResults);
    });

    const validator = new Validator();
    collection.forEach((obj) => validator.registerRule(obj));

    const getErrors = (subject: any) => {
      return validator.validate(subject);
    };

    super(getErrors);
  }
}

export class CallbackValidator extends GeneralValidator {
  constructor(callbackConfig: CallbackConfig) {
    const convertedValidatorObjs = new CallbackTransformer(callbackConfig)
      .validationResults;
    const validator = new Validator();
    convertedValidatorObjs.forEach((obj) => validator.registerRule(obj));
    const argsValidator = new ArgumentSpecValidator(callbackConfig.args);

    const getErrors = (subject: any) => {
      const errors = validator.validate(subject);
      const argsErrors = argsValidator.validate(subject.args).errorMessages;
      if (argsErrors.length > 0) {
        errors.args = errors.args
          ? [...errors.args, ...argsErrors]
          : argsErrors;
      }

      return errors;
    };
    super(getErrors);
  }
}
