import { Step } from "../models/step/step";
import type { ValidationRule } from "model-validations";
import { Validator } from "model-validations";
import CallbackFactory from "../models/callback/callbackFactory";
import GeneralValidator from "./validator";

const validationRules: ValidationRule[] = [
  { attribute: "id", validationType: "presence", options: {} },
  { attribute: "title", validationType: "presence", options: {} },
  { attribute: "summary", validationType: "presence", options: {} },
];

const validateStep = (step: Step): Record<string, string[]> => {
  let argsErrors: string[] = [];
  let hasCallbacks = step.callbacks.length > 0;
  const validator = new Validator();
  for (const rule of validationRules) {
    validator.registerRule(rule);
  }
  if (hasCallbacks) {
    for (const callback of step.callbacks) {
      let cbValidator = CallbackFactory.getValidatorFor(callback.functionName);
      argsErrors = [
        ...argsErrors,
        ...cbValidator.validate(callback.args).errorMessages,
      ];
    }
  }

  let errors = validator.validate(step);
  if (argsErrors.length > 0) {
    errors.args = argsErrors;
  }
  return errors;
};

export class StepValidator extends GeneralValidator {
  step: Step;
  constructor(step: Step) {
    super(validateStep);
    this.step = step;
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
