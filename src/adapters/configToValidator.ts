import { validatesOptions } from "model-validations/dist/validator";
import { Validator } from "model-validations";
import {
  CallbackConfig,
  ArgumentSpec,
} from "../models/callback/callbackFactory";

type ValidationFunction = <A extends Adapter>(
  this: A,
  key: keyof Record<string, any>,
  value: any,
) => void;

const validationRulesForArgs: ValidationFunction = function (key, value) {
  for (const arg of value) {
    switch (arg) {
      case "type":
        this.createPresence("type");
        switch (value) {
          case "number":
            this.validations.push({
              attribute: key,
              validationType: "numericality",
            });
        }
        break;
      case "required":
        if (value === true) {
          this.createPresence("required");
        }
        break;
    }
  }
};

const validationRulesForCallback: ValidationFunction = function (
  this,
  key,
  value,
) {
  switch (key) {
    case "functionName":
      this.createPresence("functionName"); 
      this.createConfirmation("functionName", value);
      break;
    case "eventName":
      this.createPresence("eventName");
      this.createInclusion("eventName", value.in);
      break;
    case "args":
      this.createPresence("args");
      break;
  }
};

export class Adapter {
  objToConvert: Record<string, any>;
  validationFunction: ValidationFunction;

  validations: validatesOptions[];
  validator: Validator;
  constructor(
    objToConvert: Record<string, any>,
    validationFunction: ValidationFunction,
  ) {
    this.validationFunction = validationFunction;
    this.objToConvert = objToConvert;
    this.validations = [];
    this.validator = new Validator();
    this.#convert();
  }

  #convert() {
    Object.entries(this.objToConvert).forEach(([key, value]) => {
      this.validationFunction(key as keyof typeof this.objToConvert, value);
    });
    this.validations.forEach((validation) => {
      this.validator.validates(validation);
    });
  }

  createPresence(attribute: string) {
    this.createValidationObject(attribute, "presence");
  }

  createInclusion(attribute: string, inArray: any[]) {
    this.createValidationObject(attribute, "inclusion", { in: inArray });
  }

  createConfirmation(attribute: string, confirmationAttribute: string) {
    this.createValidationObject(attribute, "confirmation", {
      with: confirmationAttribute,
    });
  }

  createValidationObject(
    attribute: string,
    validationType: string,
    options: Record<string, any> = {},
  ) {
    this.validations.push({
      attribute: attribute,
      validationType: validationType,
      options: options,
    });
  }
}

export class CallbackConfigAdapter extends Adapter {
  constructor(callbackConfig: CallbackConfig) {
    super(callbackConfig, validationRulesForCallback);
  }
}

export class ArgumentSpecAdapter extends Adapter {
  constructor(argSpec: ArgumentSpec[]) {
    const mergeObj: Record<string, any> = {};
    argSpec.forEach((arg) => {
      mergeObj[arg.name] = {
        type: arg.type,
        required: arg.required,
        default: arg.default,
      };
    });
    super(mergeObj, validationRulesForArgs);
  }
}
