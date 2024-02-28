import StepNode from "./stepNode";
import StepManager from "./stepManager";
import type { CallbackObj, StepObj } from "../types";

class Step {
  title: string;
  summary: string;
  id: string;
  callbacks?: CallbackObj[];
  stepNode: StepNode;
  stepManager: StepManager;
  constructor(dataObj: StepObj, stepNode: StepNode) {
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    this.title = dataObj.title || "";
    this.summary = dataObj.summary || "";
    this.id = dataObj.id;
    this.callbacks = dataObj.callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = this.stepNode.stepManager;
    this.stepManager.registerInstance(this);
  }

  addNewStep() {
    const step = this.stepNode.addNewChild();
    this.callupdateCallbacks();
    return step;
  }

  addAsChildStep(step: Step) {
    this.stepNode.addAsChild(step.stepNode.node);
  }

  isAncestorOf(step: Step) {
    return this.stepNode.isAncestorOf(step.stepNode.node);
  }

  findStepById(id: string) {
    return this.stepManager.searchById(id);
  }


  moveStepAboveSelf(step: Step) {
    this.stepNode.moveNodeAboveSelf(step.stepNode.node);
    this.callupdateCallbacks();
  }

  moveStepBelowSelf(step: Step) {
    this.stepNode.moveNodeBelowSelf(step.stepNode.node);
    this.callupdateCallbacks();
  }

  remove() {
    this.stepNode.removeSelf();
    this.stepManager.unregisterInstance(this);
    this.callupdateCallbacks();
  }

  get parentStep(): Step | null {
    const parent = this.stepNode.parentNode;
    return this.stepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.node.getPath().length === 1;
  }

  callupdateCallbacks() {
    this.stepManager.updateCallbacks.forEach((callback) => callback());
  }

  get steps() {
    const stepsArray = this.stepNode.childrenNodes.map((node) =>
      this.stepManager.searchById(node.model.id)
    );

    return stepsArray.filter((step) => step !== undefined);
  }

  toJSON(): any {
    return {
      title: this.title,
      summary: this.summary,
      id: this.id,
      callbacks: this.callbacks,
      steps: this.steps.map((step) => step && step.toJSON()),
    };
  }
}

export { Step };
