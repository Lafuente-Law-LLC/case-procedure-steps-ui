import type { IdObj } from "../treeModel/stepTree";
import StepTree from "../treeModel/stepTree";

export interface CallbackObj {
  on: string;
  run: string;
  with_args: any;
}

interface Step {
  title: string;
  summary: string;
  id: string;
  callbacks?: CallbackObj[];
}

import { v4 } from "uuid";

const REGISTERED_STEPS = new Set<Step>();

abstract class Step {
  title: string;
  summary: string;
  id: string;
  callbacks?: CallbackObj[];
  constructor(
    title: string,
    summary: string,
    id: string,
    callbacks?: CallbackObj[]
  ) {
    this.title = title || "";
    this.summary = summary || "";
    this.id = id || v4();
    this.callbacks = callbacks || [];
    Step.registerInstance(this);
  }

  static registerInstance(instance: Step) {
    REGISTERED_STEPS.add(instance);
  }

  static get registeredSteps() {
    return Array.from(REGISTERED_STEPS);
  }

  static searchById(uuid: string) {
    for (const obj of REGISTERED_STEPS) {
      if (obj.id === uuid) {
        return obj;
      }
    }
    return null;
  }

  abstract children: Step[];
}

class RootStep extends Step {
  stepTree: StepTree;
  constructor(data: any) {
    const { title, summary, id } = data;
    super(title, summary, id);
    const parsedData = this.parseData(data);
    if (!parsedData) {
      throw new Error("Invalid data");
    }
    this.stepTree = new StepTree(parsedData);
  }

  parseData(data: any): IdObj | undefined {
    try {
      if (data.id !== this.id) {
        new ChildStep(data.title, data.summary, data.id, data.callbacks, this);
      }
      const obj = { id: data.id, steps: data.steps || [] };
      if (obj.steps) {
        obj.steps = obj.steps.map((step: any) => {
          return this.parseData(step);
        });
      }
      return obj;
    } catch (e) {
      console.warn(e);
    }
  }

  get children() {
    let idArr = this.stepTree.rootNode.model.steps || [];
    return idArr.map((id: IdObj) => {
      const step = Step.searchById(id.id);
      if (step && step.children) {
        return {...step, children: step.children};
      }
    });
  }
}

class ChildStep extends Step {
  root: RootStep;
  constructor(
    title: string,
    summary: string,
    id: string,
    callbacks: CallbackObj[] = [],
    root: RootStep
  ) {
    super(title, summary, id, callbacks);
    this.root = root;
  }

  #stepTree() {
    return this.root.stepTree;
  }

  get children() {
    const id = this.id;
    let idArr = this.#stepTree().find(id)?.model.steps || [];
    return idArr.map((id: IdObj) => {
      const step = Step.searchById(id.id);
      if (step && step.children) {
        return {...step, children: step.children};
      }
    });
  }
}

export { Step, RootStep, ChildStep };
