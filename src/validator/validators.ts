import Validator from "./validator";
import Joi from "joi";

const stepSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  title: Joi.string().required(),
  summary: Joi.string().required(),
}).unknown(true);

const eventCallbackSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  event: Joi.string().required(),
  function: Joi.string().valid("create_future_event").required(),
  args: Joi.object({
    title: Joi.string().required(),
    summary: Joi.string().required(),
    days: Joi.number().integer().min(0),
  }),
});

const taskCallbackSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  event: Joi.string().required(),
  function: Joi.string().valid("create_task").required(),
  args: Joi.object({
    title: Joi.string().required(),
    summary: Joi.string().required(),
  }),
});

const stepValidator = new Validator(stepSchema);
const eventCallbackValidator = new Validator(eventCallbackSchema);
const taskCallbackValidator = new Validator(taskCallbackSchema);

export { stepValidator, eventCallbackValidator, taskCallbackValidator };

