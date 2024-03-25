import { CallbackConfig } from "./types";
import recursiveDo from "../utils/recursiveDo";
import { BasicValidationConfig } from "./types";
import Joi from "joi";
const isObject = (value: any) => typeof value === "object" && value !== null;
export type Input = { tag: "input"; attributes: { type: string } };
export type CallbackArgs = { title: string; summary: string } & { [key: string]: any };

export const buildBasicCallback = (
  functionName: string,
  event: string,
  args: CallbackArgs,
) => {
  return {
    event: event,
    function: functionName,
    args: args,
  };
};
const setValidatorsOnObj = (callbackConfig: CallbackConfig) => {
  const conditionFn = (value: any) => isObject(value) && value.validations;
  const actionFn = (value: any) => {
    let validator = buildValidationSchemaFromValidationObjs(value.validations);
    value.validator = validator;
  };
  recursiveDo(callbackConfig, conditionFn, actionFn);
};

const buildValidationSchemaFromValidationObjs = (
  validationConfig: BasicValidationConfig[],
) => {
  return validationConfig.reduce((acc, curr) => {
    return acc[curr.name].apply(acc, curr.args);
  }, Joi as any);
};

const setDefaultValueOnHtmlElement = (callbackConfig: CallbackConfig) => {
  const conditionFn = (value: any) =>
    isObject(value) && isObject(value.htmlElement) && value.default !== null;

  const actionFn = (value: any) => {
    if (isObject(value.htmlElement)) value.htmlElement.default = value.default;
  };
  recursiveDo(callbackConfig, conditionFn, actionFn);
};

const buildDefault = (callbackConfig: CallbackConfig) => {
  let defaultTopObject = {};
  const { event, function: func, args } = callbackConfig;
  defaultTopObject = {
    event: event.default,
    function: func.default,
  };

  let argsDefault: any = {};
  for (const key in args.value) {
    argsDefault[key] = args.value[key].default;
  }

  return { ...defaultTopObject, args: argsDefault };
};

 const setUpDefaults = (callbackConfig: CallbackConfig) => {
  setValidatorsOnObj(callbackConfig);
  setDefaultValueOnHtmlElement(callbackConfig);
  return { ...callbackConfig, defaultShape: buildDefault(callbackConfig) };
};

export { setUpDefaults };
