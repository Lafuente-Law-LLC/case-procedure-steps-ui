import Joi, { ObjectSchema } from "joi";

const convertJoiResultToBoolean = (result: Joi.ValidationResult) => {
  return result.error === null;
};
const extractMessagesFromJoiResult = (result: Joi.ValidationResult) => {
  return result.error?.details.map((detail) => detail.message) ?? [];
};

export default class Validator {
  schema: ObjectSchema;
  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  validate(data: any) {
    return convertJoiResultToBoolean(this.schema.validate(data));
  }

  messages(data: any) {
    return extractMessagesFromJoiResult(this.schema.validate(data));
  }
}
