import { ValidationObject } from "../types";
export type ValidationLogicFunction = (
  subject: any,
) => Record<string, string[]>;

export default class GeneralValidator {
  errors: Record<string, string[]> = {};
  validationLogicFunction: ValidationLogicFunction;
  constructor(validationLogicFunction: ValidationLogicFunction) {
    this.validationLogicFunction = validationLogicFunction;
    this.errors = {};
  }

  get errorMessages() {
    return Object.values(this.errors)
      .flat()
      .map((error) => error);
  }

  valid() {
    return this.errorMessages.length === 0;
  }

  findErrorMessageForField(fieldName: string) {
    const error = this.findErrorForField(fieldName);
    return error ? error.message : undefined;
  }

  errorInField(fieldName: string) {
    return this.findErrorForField(fieldName) !== undefined;
  }

  findErrorForField(fieldName: string) {
    return this.errors[fieldName]
      ? { message: this.errors[fieldName][0] }
      : undefined;
  }

  validField(fieldName: string): ValidationObject {
    const error = this.findErrorForField(fieldName);
    return {
      valid: error === undefined,
      message: error?.message ?? "",
    };
  }

  validate(subject: any): ValidationObject {
    this.errors = this.validationLogicFunction(subject);
    return {
      valid: this.valid(),
      message: this.errorMessages.join(", "),
    };
  }
}
