import { v4 as uuidv4 } from "uuid";
import type { Callback, CallbackWithId } from "../../types";

export const processCallbacks = (callbacks: Callback[]): CallbackWithId[] => {
  return callbacks.map((callback) => ({ ...callback, id: uuidv4() }));
};

export const findCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId | undefined => {
  return callbacks.find((callback) => callback.id === id);
};

export const removeCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId[] => {
  return callbacks.filter((callback) => callback.id !== id);
};

export const extractKeyValues = <T extends object>(
  obj: T
): { label: keyof T; value: T[keyof T] }[] => {
  return Object.entries(obj).map(([key, value]) => ({
    label: key as keyof T,
    value,
  }));
};
