import Callback from "../../../callback/callback";

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
