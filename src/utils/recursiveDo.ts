export default function recursiveDo(
  obj: any,
  conditionFn: (value: any) => boolean,
  actionFn: (value: any) => void,
): void {
  _errorCatcher(obj, conditionFn, actionFn);
  if (conditionFn(obj)) {
    actionFn(obj);
  }
  if (Array.isArray(obj)) {
    obj.forEach((value: any) => {
      recursiveDo(value, conditionFn, actionFn);
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value: any = obj[key];
        recursiveDo(value, conditionFn, actionFn);
      }
    }
  }
}

const _errorCatcher = (
  obj: any,
  conditionFn: (value: any) => boolean,
  actionFn: (value: any) => void,
) => {
  if (typeof obj === "undefined" || null) {
    throw new Error("obj is undefined or null");
  }
  if (typeof conditionFn === "undefined") {
    throw new Error("conditionFn is undefined");
  }
  if (typeof actionFn === "undefined") {
    throw new Error("actionFn is undefined");
  }
};
