import CallbackController from "../models/callback/callbackController";
import { CallbackConfig } from "../models/callback/callbackController";

const createEvent: CallbackConfig = {
  functionName: "create_event",
  eventName: {
    in: ["complete", "after_create"],
    default: "after_create",
  },
  args: [
    {
      name: "title",
      type: "string",
      default: "",
      required: true,
    },
    {
      name: "summary",
      type: "string",
      default: "",
      required: true,
    },
  ],
};

const createTask: CallbackConfig = {
  functionName: "create_task",
  eventName: {
    in: ["complete", "after_create"],
    default: "after_create",
  },
  args: [
    {
      name: "title",
      type: "string",
      default: "",
      required: true,
    },
    {
      name: "summary",
      type: "string",
      default: "",
      required: true,
    },
  ],
};

const createFutureEvent: CallbackConfig = {
  functionName: "create_future_event",
  eventName: {
    in: ["complete", "after_create"],
    default: "after_create",
  },
  args: [
    {
      name: "title",
      type: "string",
      default: "",
      required: true,
    },
    {
      name: "summary",
      type: "string",
      default: "",
      required: true,
    },
    {
      name: "date",
      type: "number",
      default: 10,
      required: true,
    },
  ],
};



CallbackController.registerCallbackConfig(createEvent);
CallbackController.registerCallbackConfig(createTask);
CallbackController.registerCallbackConfig(createFutureEvent);

const runConfig = () => {
  console.log("Config has been run");
}
export { runConfig };
