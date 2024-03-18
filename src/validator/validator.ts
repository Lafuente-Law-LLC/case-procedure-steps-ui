import Joi from "joi";
import type { ObjectSchema, ValidationError } from "joi";

class Validator<T extends ObjectSchema = any> {
  objectSchema: Joi.ObjectSchema<T>;
  constructor(schema: Joi.ObjectSchema<T>) {
    this.objectSchema = schema;
  }
  validate(obj: any): [boolean, ValidationError | undefined] {
    const validationObj = this.objectSchema.validate(obj);
    if (validationObj.error) {
      return [false, validationObj.error];
    } else {
      return [true, undefined];
    }
  }
}

export default Validator;
