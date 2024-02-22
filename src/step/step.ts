
import StepNode from "../stepNode/stepNode";
import StepManager from "./stepManager";
import type { CallbackObj, StepObj } from "../types";
import { v4 } from "uuid";

class Step {
  title: string;
  summary: string;
  id: string;
  callbacks?: CallbackObj[];
  stepNode: StepNode;
  constructor(
    stepNode: StepNode,
    title: string,
    summary: string,
    id?: string,
    callbacks?: CallbackObj[]
  ) {
    this.title = title || "";
    this.summary = summary || "";
    this.id = id || v4();
    this.callbacks = callbacks || [];
    this.stepNode = stepNode;
  }

  addStep(stepOrObj: Step | StepObj) {
    if (stepOrObj instanceof Step) {
      this.stepNode.addChild(stepOrObj.stepNode.node);
    } else {
      this.stepNode.addChild(stepOrObj);
    }
  }

  moveStepAbove(step:Step){
    const siblingId = step.stepNode.node.model.id;
    this.stepNode.moveStepAbove(siblingId);
  }

  moveStepBelow(step:Step){
    const siblingId = step.stepNode.node.model.id;
    this.stepNode.moveStepBelow(siblingId);
  }

  remove() {
    this.stepNode.removeChild(this.id);
    StepManager.unregisterInstance(this);
  }

  get parentStep(): Step | null {
    const parent = this.stepNode.parent;
    if (!parent) {
      return null;
    }
    return StepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.node.getPath().length === 1;
  }

  get steps(): any[] {
    const children = this.stepNode.children;
    if (children) {
      return children.map((child) => {
        return StepManager.searchById(child.model.id);
      });
    }else{
      return []
    }
  }
}

export { Step };
