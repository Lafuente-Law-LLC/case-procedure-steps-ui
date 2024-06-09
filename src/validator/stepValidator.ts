import { Step } from "../models/step/step";
import type { ValidationRule } from "model-validations";
import { Validator } from "model-validations";
import CallbackController from "../models/callback/callbackController";
import GeneralValidator from "./validator";

import Callback from "../models/callback/callback";
const validationRules: ValidationRule[] = [
  { attribute: "id", validationType: "presence", options: {} },
  { attribute: "title", validationType: "presence", options: {} },
  { attribute: "summary", validationType: "presence", options: {} },
];

const validateStep = (step: Step) => {
  const validator = new Validator();
  for (const rule of validationRules) {
    validator.registerRule(rule);
  }

  return validator.validate(step);
};

export class StepValidator extends GeneralValidator {
  step: Step;
  constructor(step: Step) {
    super(validateStep);
    this.step = step;
  }

  validateCallback(callback: Callback) {
    const validator = CallbackController.getValidatorFor(callback.functionName);
    if (!validator) {
      return {};
    }
    return validator.validate(callback);
  }

  validate = () => {
    return validateStep(this.step);
  };

  valid = () => {
    return Object.values(this.validate()).flat().length === 0;
  };

  findErrorMessageForField = (fieldName: string) => {
    return this.validate()[fieldName]?.[0];
  };
}
