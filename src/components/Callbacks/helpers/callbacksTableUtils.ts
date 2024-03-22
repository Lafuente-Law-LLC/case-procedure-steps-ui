import Callback from "../../../callback/callback";

export const getCallbackAdminObj = (functionName: string) => {
  const callbackAdminObj = Callback.getCallbackAdminObj(functionName);
  if (callbackAdminObj === undefined) {
    console.error(`CallbackAdminObj for ${functionName} is not defined`);
    throw new Error(`CallbackAdminObj for ${functionName} is not defined`);
  }
  return callbackAdminObj;
};

export const getValidatorFromAdminObj = (functionName: string) => {
  const { validator } = getCallbackAdminObj(functionName);
  if (validator === undefined) {
    throw new Error(`Validator for ${functionName} is not defined`);
  }
  return validator;
};

export const getFunctionFromAdminObj = (functionName: string) => {
  const { createFn } = getCallbackAdminObj(functionName);
  if (createFn === undefined) {
    throw new Error(`Create function for ${functionName} is not defined`);
  }
  return createFn;
};

export const findCallback = (
  id: string,
  callbacks: Callback[],
): Callback | undefined => {
  return callbacks.find((callback) => callback.id === id);
};

export const removeCallback = (
  id: string,
  callbacks: Callback[],
): Callback[] => {
  return callbacks.filter((callback) => callback.id !== id);
};

export const extractKeyValues = <T extends object>(
  obj: T,
): { label: keyof T; value: T[keyof T] }[] => {
  return Object.entries(obj).map(([key, value]) => ({
    label: key as keyof T,
    value,
  }));
};
