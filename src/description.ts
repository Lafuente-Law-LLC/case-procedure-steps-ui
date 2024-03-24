const callbacks = new Map<string, any>();
import Joi from "joi";

const injectDefaultsIntoTableRowRepresentation = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (typeof newObj[key] === "object") {
      newObj[key] = injectDefaultsIntoTableRowRepresentation(newObj[key]);
    } else {
      newObj[key] = newObj[key].default;
    }
  });
  return newObj;
};

const validationConfig = [
  {
    type: "string",
    required: true,
    static: true,
  },
  {
    type: "number",
    required: true,
    static: true,
    integer: true,
    min: 1,
  },
];


const JoiMap = new Map<string, typeof valueToValObj>();
const valueToValObj = new Map<string, { name: string; args: any[] }>();
const when = (name: string) => {
    return {
        is: (value: any) => {
            return {
                validateObj: (obj: {name: string, args: any}) => {
                    const s = valueToValObj.set(value, obj);
                    JoiMap.set(name, s);
                },
            };

    }
}



when("require").is(true).validateObj({name: "required", args: []})  

const anotherWay = {
  event: {
    default: "after_initiate",
    validate: {
      type: "string",
      required: true,
    },
    tableRowRepresentation: {
      tag: "select",
      options: [
        { value: "after_create", text: "After Create" },
        { value: "after_initiate", text: "After Initiate" },
      ],
    },
  },
  function: {
    default: "create_future_event",
    validator: Joi.string().valid("create_future_event").required(),
    tableRowRepresentation: {
      tag: "input",
      type: "text",
    },
  },
  args: {
    title: {
      default: "",
      validator: Joi.string().required(),
      tableRowRepresentation: {
        tag: "input",
        type: "text",
      },
    },
    summary: {
      default: "",
      validator: Joi.string().required(),
      tableRowRepresentation: {
        tag: "input",
        type: "text",
      },
    },
    days: {
      default: "",
      validator: Joi.number().integer().min(1).required(),
      tableRowRepresentation: {
        tag: "input",
        type: "number",
      },
    },
  },
};

const createFutureEvent = {
  defaults: {
    event: "after_initiate",
    function: "create_future_event",
    args: {
      title: "",
      summary: "",
      days: 200,
    },
  },
  validator: {
    event: Joi.string().required(),
    function: Joi.string().valid("create_future_event").required(),
    args: {
      title: Joi.string().required(),
      summary: Joi.string().required(),
      days: Joi.number().integer().min(1).required(),
    },
  },
  tableRowRepresentation: {
    event: {
      tag: "select",
      options: [
        { value: "after_create", text: "After Create" },
        { value: "after_initiate", text: "After Initiate" },
      ],
    },
    function: {
      tag: "input",
      type: "text",
    },
    args: {
      title: {
        tag: "input",
        type: "text",
      },
      summary: {
        tag: "input",
        type: "text",
      },
      days: {
        tag: "input",
        type: "number",
      },
    },
  },
};
