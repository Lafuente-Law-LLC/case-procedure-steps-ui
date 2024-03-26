import StepNode from "./stepNode";
import StepManager from "./stepManager";
import type Callback  from "../callback/callback";
import { stepValidator } from "../validator/validators";

class Step {
  title: string;
  summary: string;
  id: string;
  callbacks: Callback[];
  stepNode: StepNode;
  stepManager: StepManager;
  stepValidator: typeof stepValidator;
  constructor(stepNode: StepNode) {
    const dataObj = stepNode.node.model;
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    this.title = dataObj.title || "";
    this.summary = dataObj.summary || "";
    this.id = dataObj.id;
    this.callbacks = dataObj.callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = this.stepNode.stepManager;
    this.stepValidator = this.stepManager.stepValidator;
    this.stepManager.registerInstance(this);
  }

  validate() {
    return this.stepValidator.validate(this);
  }

  valid(): boolean {
   return  this.validate(); 
  }

  updateTitle(title: string) {
    this.title = title;
    this.informStepManager();
  }

  updateCallbacks(callbacks: Callback[]) {
    this.callbacks = callbacks;
    this.informStepManager();
  }
  updateSummary(summary: string) {
    this.summary = summary;
    this.informStepManager();
  }

  addNewStep() {
    const step = this.stepNode.addNewChild();
    this.informStepManager();
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
    this.informStepManager();
  }

  moveStepBelowSelf(step: Step) {
    this.stepNode.moveNodeBelowSelf(step.stepNode.node);
    this.informStepManager();
  }

  remove() {
    this.stepNode.removeSelf();
    this.stepManager.unregisterInstance(this);
    this.informStepManager();
  }

  get parentStep(): Step | null {
    const parent = this.stepNode.parentNode;
    return this.stepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.node.getPath().length === 1;
  }

  informStepManager() {
    this.stepManager.callbackFunctions.forEach((callback) => callback());
  }

  get steps() {
    const stepsArray = this.stepNode.childrenNodes.map((node) =>
      this.stepManager.searchById(node.model.id),
    );

    return stepsArray.filter((step) => step !== undefined) as Step[];
  }

  toJSON(): any {
    return {
      title: this.title,
      summary: this.summary,
      id: this.id,
      callbacks: this.callbacks.map((callback) => callback.toJSON()),
      steps: this.steps.map((step) => step && step.toJSON()),
    };
  }
}

export { Step };
