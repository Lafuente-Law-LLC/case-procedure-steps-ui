import StepNode from "./stepNode";
import StepManager from "./stepManager";
import Callback from "../callback/callback";

class Step {
  title: string;
  summary: string;
  id: string;
  callbacks: Callback[];
  stepNode: StepNode;
  stepManager: StepManager;

  constructor(stepNode: StepNode, stepManager: StepManager) {
    const dataObj = stepNode.basicStepObject();
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    const { id, title, summary, callbacks } = dataObj;
    this.id = id;
    this.title = title || "";
    this.summary = summary || "";
    this.callbacks = callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = stepManager;
    this.stepManager.registerInstance(this);
  }

  get treeNode() {
    return this.stepNode.treeNode;
  }

  get steps() {
    const stepsArray = this.stepNode.childrenTreeNodes.map((node) =>
      this.stepManager.searchById(node.model.id),
    );

    return stepsArray.filter((step) => step !== undefined) as Step[];
  }
  get parentStep(): Step | null {
    const parent = this.stepNode.parentTreeNode;
    return this.stepManager.searchById(parent.model.id) || null;
  }

  updateTitle(title: string) {
    this.title = title;
    this.informStepManager();
  }

  updateSummary(summary: string) {
    this.summary = summary;
    this.informStepManager();
  }

  addCallback(callback: Callback) {
    if (!(callback instanceof Callback)) {
      throw new Error("Callback must be an instance of Callback");
    }
    this.callbacks.push(callback);
    this.informStepManager();
  }

  removeCallback(callback: Callback) {
    const index = this.callbacks.indexOf(callback);
    if (index === -1) {
      return false;
    }
    this.callbacks.splice(index, 1);
    this.informStepManager();
    return true;
  }

  updateCallback(callback: Callback, partial: Partial<Callback>) {
    if (!this.callbacks.includes(callback)) {
      return false;
    }
    callback.update(partial);
    this.informStepManager();
    return true;
  }

  replaceCallbacks(callbacks: Callback[]) {
    this.callbacks = callbacks;
    this.informStepManager();
    return true;
  }

  addNewStep() {
    this.stepManager.makeNewChildForStep(this);
    this.informStepManager();
  }

  addAsChildStep(step: Step) {
    this.stepNode.addNodeToTree(step.treeNode);
  }

  isAncestorOf(step: Step) {
    return this.stepNode.isAncestorOf(step.treeNode);
  }

  findStepById(id: string) {
    return this.stepManager.searchById(id);
  }

  addStepToIndex(step: Step, index: number) {
    this.stepNode.addTreeNodeAtIndex(step.treeNode, index);
    this.informStepManager();
  }

  moveStepAboveSelf(step: Step) {
    this.stepNode.moveNodeAboveSelf(step.treeNode);
    this.informStepManager();
  }

  moveStepBelowSelf(step: Step) {
    this.stepNode.moveNodeBelowSelf(step.treeNode);
    this.informStepManager();
  }

  remove() {
    this.stepNode.disconnectSelfFromTree();
    this.stepManager.unregisterInstance(this);
    this.informStepManager();
  }

  isRoot() {
    return this.stepNode.treeNode.getPath().length === 1;
  }

  informStepManager() {
    this.stepManager.updateFunctions.forEach((updateFn) => updateFn());
  }

  toJSON(): any {
    let { title, summary, id } = this;
    const steps = this.steps.map((step) => step && step.toJSON());
    const callbacks = this.callbacks.map((callback) => callback.toJSON());
    return {
      id,
      title,
      summary,
      steps,
      callbacks,
    };
  }
}

export { Step };
