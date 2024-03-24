import Joi from "joi";


const setValidatorOnFieldConfiguration = (field: PropertyConfiguration) => {
  const { validations, type, valueRange: value } = field;
  let validator;
  if (type === "object" && typeof value !== "string" && !Array.isArray(value)) {
    validator = buildValidatorForObject(value);
  } else {
    validator = buildValidator(validations);
  }
  return { ...field, validator };
};

/**
 * Removes duplicate objects from an array based on a specified property.
 *
 * @param {T[]} arr - The array of objects.
 * @param {string} propertyName - The property name based on which duplicates
 *   should be removed.
 * @returns {T[]} - An array of objects with duplicates removed.
 */
function removeDuplicates<T>(arr: T[], propertyName: keyof T): T[] {
  const uniqueNames = new Set();
  return arr.filter((obj) => {
    if (!uniqueNames.has(obj[propertyName])) {
      uniqueNames.add(obj[propertyName]);
      return true;
    }
    return false;
  });
}
export const buildValidatorForObject = (obj: {
  [key: string]: PropertyConfiguration;
}) => {
  const keys = Object.keys(obj);
  const reduced = keys.reduce(
    (acc, key) => {
      return (acc[key] = buildValidator(obj[key].validations));
    },
    {} as Record<string, any>,
  );
  return reduced;
};

const isLast = (index: number, array: any[]) => {
  return index === array.length - 1;
};

export const buildValidator = (objs: ValidationObject[]) => {
  const newObjs = removeDuplicates(objs, "name");
  const reduced = newObjs.reduce((acc, obj) => {
    try {
      return acc[obj.name].apply(acc, obj.args);
    } catch (e) {
      debugger;
      return acc;
    }
  }, Joi);

  return reduced;
};

const buildDefaultObj = (obj: any) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (typeof newObj[key] === "object") {
      newObj[key] = buildDefaultObj(newObj[key]);
    } else {
      newObj[key] = newObj[key].default;
    }
  });
  return newObj;
};

// type Conditional = (obj: FieldConfiguration) => boolean;
// const validationMap = new Map<Conditional, ValidationObject>();
// validationMap.set((obj) => obj.type === "string", { name: "string", args: [] });
// validationMap.set((obj) => obj.required === true, {
//   name: "required",
//   args: [],
// });
// validationMap.set((obj) => obj.type === "number", { name: "number", args: [] });

// const rule1 = (obj: Partial<FieldConfiguration>) => {
//   Array.isArray(obj.value) && obj.required === true;
// };

// Assuming the types and data structures you provided are imported or defined above this function

export function addValidatorsToCallbacks(
  callbacks: CallbackConfig[],
): CallbackConfig[] {
  // Function to process each FieldConfiguration, adding validators accordingly
  const processFieldConfiguration = (
    field: PropertyConfiguration,
  ): PropertyConfiguration => {
    // For objects, recursively process each value
    if (
      field.type === "object" &&
      typeof field.valueRange === "object" &&
      !Array.isArray(field.valueRange)
    ) {
      const updatedValues = {};
      for (const key in field.valueRange) {
        updatedValues[key] = processFieldConfiguration(field.valueRange[key]);
      }
      return {
        ...field,
        valueRange: updatedValues,
        validator: setValidatorOnFieldConfiguration(field).validator,
      };
    } else {
      // For basic fields, directly set the validator
      return setValidatorOnFieldConfiguration(field);
    }
  };

  // Process each callback configuration in the array
  return callbacks.map((callback) => {
    const updatedCallback = { ...callback };
    for (const key in callback) {
      updatedCallback[key] = processFieldConfiguration(callback[key]);
    }
    return updatedCallback;
  });
}

const eventsA = ["after_create", "after_initiate"];

export const callbackRevised: CallbackConfig[] = [
  {
    function: {
      valueRange: "create_future_event",
      type: "string",
      default: "create_future_event",
      required: true,
      validations: [{ name: "valid", args: ["create_future_event"] }],
      htmlElement: null,
    },
    event: {
      valueRange: eventsA,
      type: "string",
      default: "after_create",
      required: true,
      validations: [],
      htmlElement: {
        tag: "select",
        options: [
          { text: "After Create", value: "after_create" },
          { text: "After Initiate", value: "after_initiate" },
        ],
        default: "after_create",
      },
    },
    args: {
      valueRange: {
        id: {
          valueRange: "",
          type: "string",
          required: true,
          default: false,
          validations: [{ name: "guid", args: [{ version: "uuidv4" }] }],
          htmlElement: null,
        },
        title: {
          valueRange: "",
          type: "string",
          required: true,
          default: "",
          validations: [],
          htmlElement: {
            tag: "input",
            attributes: { type: "text" },
            default: "",
          },
        },
        summary: {
          valueRange: "",
          type: "string",
          required: true,
          default: "",
          validations: [],
          htmlElement: {
            tag: "input",
            attributes: { type: "text" },
            default: "",
          },
        },
        days: {
          valueRange: "200",
          type: "number",
          required: true,
          default: 200,
          validations: [
            { name: "integer", args: [] },
            { name: "min", args: [1] },
          ],
          htmlElement: {
            tag: "input",
            attributes: { type: "number" },
            default: "",
          },
        },
      },
      type: "object",
      validations: [],
      required: true,
      default: "",
      htmlElement: null,
    },
  },
];

const callbacks = [
  {
    function: {
      value: "create_future_event",
      type: "string",
      static: true,
      validator: [
        ["string", null],
        ["valid", "create_future_event"],
        ["required", null],
      ],
    },
    event: {
      value: ["after_create", "after_initiate"],
      default: "after_create",
      required: true,
      type: "string",
      htmlElement: {
        tag: "select",
        options: [
          { text: "After Create", value: "after_create" },
          { text: "After Initiate", value: "after_initiate" },
        ],
        default: "after_create",
      },
      validator: [
        ["string", null],
        ["required", null],
      ],
    },
    args: {
      value: {
        id: {
          type: "string",
          required: true,
          default: false,
          uuid: true,
          htmlElement: null,
          validator: [
            ["string", null],
            ["guid", { version: "uuidv4" }],
            ["required", null],
          ],
        },
        title: {
          type: "string",
          required: true,
          default: "",
          htmlElement: { tag: "input", attributes: { type: "text" } },
          validator: [
            ["string", null],
            ["required", null],
          ],
        },
        summary: {
          type: "string",
          required: true,
          default: "",
          htmlElement: { tag: "input", attributes: { type: "text" } },
          validator: [
            ["string", null],
            ["required", null],
          ],
        },
        days: {
          type: "number",
          required: true,
          default: 200,
          htmlElement: { tag: "input", attributes: { type: "number" } },
          validator: [
            ["number", null],
            ["integer", null],
            ["min", 1],
            ["required", null],
          ],
        },
      },
      type: "object",
      required: true,
      inputField: { type: "object" },
    },
  },
];
