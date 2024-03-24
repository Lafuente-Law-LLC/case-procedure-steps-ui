import Joi from "joi";
import type { ValidationError } from "joi";

class Validator {
  mainSchema: Joi.AnySchema;
  constructor(schema: Joi.AnySchema) {
    this.mainSchema = schema;
  }
  validate(obj: any): [boolean, ValidationError | undefined] {
    const validationObj = this.mainSchema.validate(obj);
    if (validationObj.error) {
      return [false, validationObj.error];
    } else {
      return [true, undefined];
    }
  }
}

export default Validator;
