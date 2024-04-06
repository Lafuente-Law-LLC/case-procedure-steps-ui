import Joi, { ObjectSchema } from "joi";
import { ValidationObject } from "../types";

export default class Validator {
  schema: ObjectSchema;
  subject: any;
  validationObject: Joi.ValidationResult;
  constructor(schema: ObjectSchema, subject: any) {
    this.subject = subject;
    this.schema = schema;
    this.validationObject = this.schema.validate(this.subject, {
      abortEarly: false,
    });
  }

  get errorMessages() {
    return (
      this.validationObject.error?.details.map((detail) => detail.message) ?? []
    );
  }

  findErrorMessageForField(fieldName: string) {
    const error = this.findErrorForField(fieldName);
    return error ? error.message : undefined;
  }

  errorInField(fieldName: string) {
    return this.findErrorForField(fieldName) !== undefined;
  }

  findErrorForField(fieldName: string) {
    return this.validationObject.error?.details.find(
      (detail) => detail.context?.key === fieldName,
    );
  }

  validField(fieldName: string):ValidationObject {
    const error = this.findErrorForField(fieldName);
    return {
      valid: error === undefined,
      message: error?.message ?? "",
    };
  }


  validate():ValidationObject {
    return {
      valid: this.validationObject.error === undefined,
      message: this.errorMessages.join(", "),
    };
  }
}
