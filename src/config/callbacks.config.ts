import type { CallbackConfig } from "./types";

import { setUpDefaults } from "./auxiliaryFunctions";

const possibleEvents = ["after_create", "after_initiate"];
const defaultEvent: (typeof possibleEvents)[number] = possibleEvents[0];
const standardValidations = [
  { name: "string", args: [] },
  { name: "required", args: [] },
];
type Input = { tag: "input"; attributes: { type: string } };

const SelectEventElement = {
  tag: "select",
  options: [
    { text: "After Create", value: "after_create" },
    { text: "After Initiate", value: "after_initiate" },
  ],
} as { tag: "select"; options: { text: string; value: string }[] };

const basicCallbackConfig = {
  event: {
    value: possibleEvents,
    type: "string",
    required: true,
    default: defaultEvent,
    validations: [...standardValidations],
    htmlElement: SelectEventElement,
  },
  function: {
    type: "string",
    required: true,
    validations: [...standardValidations],
    htmlElement: {
      tag: "input",
      attributes: { type: "text" },
    } as { tag: "input"; attributes: { type: string } },
  },
  args: {
    value: {
      title: {
        value: "",
        type: "string",
        required: true,
        default: "",
        validations: [],
        htmlElement: {
          tag: "input",
          attributes: { type: "text" },
        } as Input,
      },
      summary: {
        value: "",
        type: "string",
        required: false,
        default: "",
        validations: [],
        htmlElement: { tag: "input", attributes: { type: "text" } } as Input,
      },
    },
    type: "object",
    required: false,
    validations: [],
    default: null,
    htmlElement: null,
  },
};

const taskCallbackConfig: CallbackConfig = {
  event: basicCallbackConfig.event,
  function: {
    ...basicCallbackConfig.function,
    value: "create_task",
    default: "create_task",
  },
  args: {
    ...basicCallbackConfig.args,
  },
};

const futureEventCallbackConfig: CallbackConfig = {
  event: basicCallbackConfig.event,
  function: {
    ...basicCallbackConfig.function,
    value: "create_future_event",
    default: "create_future_event",
    htmlElement: {
      ...basicCallbackConfig.function.htmlElement,
    },
  },
  args: {
    ...basicCallbackConfig.args,
    value: {
      ...basicCallbackConfig.args.value,
      days: {
        value: "",
        type: "number",
        required: true,
        default: "200",
        validations: [
          { name: "number", args: [] },
          { name: "integer", args: [] },
          { name: "min", args: [1] },
          { name: "required", args: [] },
        ],
        htmlElement: {
          tag: "input",
          attributes: { type: "number" },
        } as { tag: "input"; attributes: { type: string } },
      },
    },
  },
};

export { taskCallbackConfig, futureEventCallbackConfig };
