import Joi, { ObjectSchema } from "joi";
import Validator from "./validator";
import { Step } from "../models/step/step";
import Callback from "../models/callback/callback";

export class CallbackValidator extends Validator {
  argsValidator: Validator;
  constructor(schema: Joi.ObjectSchema, subject: any) {
    super(schema, subject);
    this.argsValidator = new Validator(
      this.schema.extract("args") as ObjectSchema,
      this.subject.args,
    );
  }
}

const baseArgsSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
});

const eventCallbackSchema = Joi.object({
  eventName: Joi.string().required(),
  functionName: Joi.string().valid("create_future_event").required(),
  args: baseArgsSchema
    .keys({
      days: Joi.number().integer().min(0),
    })
    .unknown(true),
}).unknown(true);

const taskCallbackSchema = Joi.object({
  eventName: Joi.string().required(),
  functionName: Joi.string().valid("create_task").required(),
  args: baseArgsSchema.unknown(true),
}).unknown(true);

const StepSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  title: Joi.string().required(),
  summary: Joi.string().required(),
}).unknown(true);

const stepValidator = (step: Step) => {
  return new Validator(StepSchema, step);
};
const eventCallbackValidator = (callback: Callback) => {
  return new CallbackValidator(eventCallbackSchema, callback);
};
const taskCallbackValidator = (callback: Callback) => {
  return new CallbackValidator(taskCallbackSchema, callback);
};

export { stepValidator, eventCallbackValidator, taskCallbackValidator };
