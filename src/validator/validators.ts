import Joi from "joi";
import Validator from "./validator";

const baseArgsSchema = Joi.object({ 
  title: Joi.string().required(),
  summary: Joi.string().required(),
}).unknown(true);

const eventCallbackSchema = Joi.object({
  event: Joi.string().required(),
  function: Joi.string().valid("create_future_event").required(),
  args: Joi.object({
    days: Joi.number().integer().min(0),
    ...baseArgsSchema.extract(["title", "summary"]),
  }).unknown(true),
});

const taskCallbackSchema = Joi.object({
  event: Joi.string().required(),
  function: Joi.string().valid("create_task").required(),
  args: Joi.object({
    ...baseArgsSchema.extract(["title", "summary"]),
  }).unknown(true),
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
