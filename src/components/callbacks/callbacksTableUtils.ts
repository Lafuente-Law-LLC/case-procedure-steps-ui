// callbacksTableUtils.ts
import { v4 as uuidv4 } from 'uuid';
import type { Callback, CallbackWithId } from "../../types";

// Ensure callbacks have unique IDs upon processing
export const processCallbacks = (callbacks: Callback[]): CallbackWithId[] => {
  return callbacks.map((callback) => ({ ...callback, id: uuidv4() }));
};

// Find a callback by ID with enhanced type safety
export const findCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId | undefined => {
  return callbacks.find((callback) => callback.id === id);
};

// Remove a callback by ID, ensuring immutability
export const removeCallback = (
  id: string,
  callbacks: CallbackWithId[]
): CallbackWithId[] => {
  return callbacks.filter((callback) => callback.id !== id);
};

// Extract key-value pairs from an object with improved type safety
export const extractKeyValues = <T extends object>(obj: T): { label: keyof T; value: T[keyof T] }[] => {
  return Object.entries(obj).map(([key, value]) => ({ label: key as keyof T, value }));
};
