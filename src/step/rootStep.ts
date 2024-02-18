import { Step } from "./step";
import type { IdObj } from "../treeModel/stepTree";
import StepTree from "../treeModel/stepTree";

class RootStep extends Step {
  nodeTree: StepTree;
  constructor(data: any) {
    const { title, summary, id, callbacks } = data;
    const rootStepId = id;
    super(title, summary, id, callbacks, rootStepId);
    const parsedData = this.parseData(data);
    this.nodeTree = new StepTree(parsedData);
  }

  parseData(data: any): IdObj {
    const obj = { id: data.id, steps: data.steps || [] };
    if (obj.steps) {
      obj.steps = obj.steps.map((step: any) => {
        return this.parseData(step);
      });
    }
    return obj;
  }
}

export default RootStep;
