export type FunctionArgsPair = {
  name: string;
  args: Arg[];
};

type Arg = {
  name: string;
  type: string;
  default: any;
  required: boolean;
};


 const createArgsValueObj = (funcArgsPair: FunctionArgsPair) => {
  const obj: Record<string, any> = {};
  funcArgsPair.args.forEach((arg) => {
    obj[arg.name] = arg.default;
  });
  return obj;
};

export const returnFuncValueObj = (funcArgsPair: FunctionArgsPair) => {
  return {
    functionName: funcArgsPair.name,
    args: createArgsValueObj(funcArgsPair),
  };
};
