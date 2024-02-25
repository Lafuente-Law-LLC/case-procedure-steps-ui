import StepNode from "./stepNode";
import StepManager from "./stepManager";
import type { CallbackObj, StepObj } from "../types";

class Step {
  title: string;
  summary: string;
  id: string;
  callbacks?: CallbackObj[];
  stepNode: StepNode;
  constructor(dataObj: StepObj, stepNode: StepNode) {
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    this.title = dataObj.title || "";
    this.summary = dataObj.summary || "";
    this.id = dataObj.id;
    this.callbacks = dataObj.callbacks || [];
    this.stepNode = stepNode;
    StepManager.registerInstance(this);
  }

  addNewStep() {
    const step = this.stepNode.addNewChild();
    if (step) {
      this.callupdateCallbacks();
    }
    return step;
  }

  addAsChildStep(step: Step) {
    this.stepNode.addAsChild(step.stepNode.node);
  }

  moveStepAboveSelf(step: Step) {
    this.stepNode.moveNodeAboveSelf(step.stepNode.node);
  }

  moveStepBelowSelf(step: Step) {
    this.stepNode.moveNodeBelowSelf(step.stepNode.node);
  }

  remove() {
    this.stepNode.removeSelf();
    StepManager.unregisterInstance(this);
  }

  get parentStep(): Step | null {
    const parent = this.stepNode.parentNode;
    return StepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.node.getPath().length === 1;
  }

  callupdateCallbacks() {
    StepManager.updateCallbacks.forEach((callback) => callback());
  }
  /**
   * Returns the step's children
   * @returns {Step[]}
   */
  get steps() {
    const stepsArray = this.stepNode.childrenNodes.map((node) =>
      StepManager.searchById(node.model.id)
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
