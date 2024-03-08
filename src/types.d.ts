export type Options = { childrenPropertyName: string };
export type IdObj = {
  id: string;
  steps: IdObj[];
};



export interface CreateTaskCallback extends CallbackObj {
  with_args: {
    title: string;
    summary: string;
  };
}


export interface FutureEventCallback extends CallbackObj {
  with_args: {
    title: string;
    date: string;
    summary: string;
  };
}

export interface CallbackObj {
  on: string;
  run: string;
  with_args: any;
}

interface StepObj {
  title?: string;
  summary?: string;
  id: string;
  callbacks?: CallbackObj[];
}
