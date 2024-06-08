import { ValidationRule } from "model-validations"

interface Transformer<S, T> {
  transform(source: S): T[];
}

type TransformationLogicFn = (
  this: GeneralValidatorTransformer,
  source: any,
) => ValidationRule[];

class GeneralValidatorTransformer
  implements Transformer<Record<string, any>, ValidationRule>
{
  validationResults: ValidationRule[];
  transformationLogic: TransformationLogicFn;

  constructor(
    input: Record<string, any>,
    transformationLogic: TransformationLogicFn,
  ) {
    this.transformationLogic = transformationLogic;
    this.validationResults = this.transform(input);
  }

  transform(source: Record<string, any>): ValidationRule[] {
    return this.transformationLogic(source);
  }

  createValidationRule(
    attribute: string,
    validationType: string,
    options: Record<string, any> = {},
  ): ValidationRule {
    return { attribute, validationType, options };
  }

  createPresenceRule(attribute: string): ValidationRule {
    return this.createValidationRule(attribute, "presence");
  }

  createInclusionRule(attribute: string, allowedValues: any[]): ValidationRule {
    return this.createValidationRule(attribute, "inclusion", { in: allowedValues });
  }

  createConfirmationRule(attribute: string, confirmationAttribute: string): ValidationRule {
    return this.createValidationRule(attribute, "confirmation", { with: confirmationAttribute });
  }

  createNumericalityRule(attribute: string, options = {}): ValidationRule {
    return this.createValidationRule(attribute, "numericality", options);
  }
}

const argumentSpecValidationLogic: TransformationLogicFn = function (source) {
  const { name, type, default: defaultValue, required } = source;
  const validations: ValidationRule[] = [];

  if (required) validations.push(this.createPresenceRule(name));
  if (defaultValue) validations.push(this.createConfirmationRule(name, defaultValue));
  if (type === "number") validations.push(this.createNumericalityRule(name));

  return validations;
};

const callbackConfigValidationLogic: TransformationLogicFn = function (source) {
  const { eventName, functionName, args } = source;

  const validations: ValidationRule[] = [
    this.createPresenceRule("functionName"),
    this.createPresenceRule("eventName"),
    this.createPresenceRule("args"),
    this.createConfirmationRule("functionName", functionName),
    this.createInclusionRule("eventName", eventName.in),
  ];

  return validations;
};

export class CallbackTransformer extends GeneralValidatorTransformer {
  constructor(input: Record<string, any>) {
    super(input, callbackConfigValidationLogic);
  }
}

export class ArgumentSpecTransformer extends GeneralValidatorTransformer {
  constructor(input: Record<string, any>) {
    super(input, argumentSpecValidationLogic);
  }
}
