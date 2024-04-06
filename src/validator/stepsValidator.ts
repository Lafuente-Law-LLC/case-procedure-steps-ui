import { Step } from "../models/step/step";
import { ValidationObject } from "../types";
import { getValidatorFromCallback } from "../components/CallbacksTable/tableRowUtils";
import { stepValidator } from "./validators";
import StepManager from "../models/step/stepManager";

export type ValidatedStepObj = {
  step: Step;
  validationObject: ValidationObject;
  callbackValidationObjects: ValidationObject[];
  valid: boolean;
};

function validateStep(step: Step): ValidatedStepObj {
  const validationObject = stepValidator(step).validate();
  const callbackValidationObjects: ValidationObject[] = [];

  step.callbacks.forEach((callback) => {
    const validator = getValidatorFromCallback(callback);
    const validationObj = validator.validate();
    callbackValidationObjects.push(validationObj);
  });

  const valid =
    validationObject.valid &&
    callbackValidationObjects.every((validationObj) => validationObj.valid);

  return {
    step: step,
    validationObject: validationObject,
    callbackValidationObjects: callbackValidationObjects,
    valid: valid,
  };
}

class StepsValidator {
  stepManager: StepManager;
  steps: Set<Step> = new Set();

  constructor(stepManager: StepManager) {
    this.stepManager = stepManager;
    this.steps = stepManager.registeredSteps;
  }

  validate = () => {
    const validSteps: ValidatedStepObj[] = [];
    const invalidSteps: ValidatedStepObj[] = [];

    const stepsToValidate = Array.from(this.steps).filter(
      (step) => !step.isRoot(),
    );

    stepsToValidate.forEach((step) => {
      const validatedStep = validateStep(step);
      if (validatedStep.valid) {
        validSteps.push(validatedStep);
      } else {
        invalidSteps.push(validatedStep);
      }
    });

    return { validSteps, invalidSteps };
  };

  getValidSteps = () => {
    return this.validate().validSteps;
  };

  getInvalidSteps = () => {
    return this.validate().invalidSteps;
  };
}

export default StepsValidator;
