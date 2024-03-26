import Joi from "joi";
import Validator from "./validator";

const baseArgsSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
});

const eventCallbackSchema = Joi.object({
  event: Joi.string().required(),
  function: Joi.string().valid("create_future_event").required(),
  args: baseArgsSchema
    .keys({
      days: Joi.number().integer().min(0),
    })
    .unknown(true),
});

const taskCallbackSchema = Joi.object({
  event: Joi.string().required(),
  function: Joi.string().valid("create_task").required(),
  args: baseArgsSchema,
});

const StepSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  title: Joi.string().required(),
  summary: Joi.string().required(),
}).unknown(true);

const stepValidator = new Validator(StepSchema);
const eventCallbackValidator = new Validator(eventCallbackSchema);
const taskCallbackValidator = new Validator(taskCallbackSchema);

export { stepValidator, eventCallbackValidator, taskCallbackValidator };
