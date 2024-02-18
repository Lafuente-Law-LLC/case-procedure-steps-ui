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

  static unregisterInstance(instance: Step) {
    REGISTERED_STEPS.delete(instance);
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

  //TODO: This is a bit of a mess. I think we need to refactor this to be more
  get steps() {
    const id = this.id;
    let idArr = this.stepTree.find(id)?.model.steps || [];
    return idArr.map((id: IdObj) => {
      const step = Step.searchById(id.id);
      if (step && step.steps) {
        return { step: step, steps: step.steps };
      }
    });
  }

  abstract stepTree: StepTree;
  abstract addStep(dataOrStep: any): void;
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

  addStep(dataOrStep: any): void {
    try {
      if (dataOrStep instanceof Step) {
        this.stepTree.addStep(this, dataOrStep);
      } else {
        const newChild = new ChildStep(
          dataOrStep.title,
          dataOrStep.summary,
          dataOrStep.id,
          dataOrStep.callbacks,
          this
        );
        this.stepTree.addStep(this, newChild);
      }
    } catch (e) {
      console.warn(e);
    }
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

  get stepTree() {
    return this.root.stepTree;
  }

  addStep(dataOrStep: any) {
    try {
      if (dataOrStep instanceof Step) {
        this.stepTree.addStep(this, dataOrStep);
      } else {
        const child = new ChildStep(
          dataOrStep.title,
          dataOrStep.summary,
          dataOrStep.id,
          dataOrStep.callbacks,
          this.root
        );
        this.stepTree.addStep(this, child);
      }
    } catch (e) {
      console.warn(e);
    }
  }
}

export { Step, RootStep, ChildStep };
