import StepNode from "./stepNode";
import StepManager from "./stepManager";
import type Callback from "../callback/callback";


class Step {
  title: string;
  summary: string;
  id: string;
  callbacks: Callback[];
  stepNode: StepNode;
  stepManager: StepManager;

  constructor(stepNode: StepNode, stepManager: StepManager) {
    const dataObj = stepNode.treeNode.model;
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    this.title = dataObj.title || "";
    this.summary = dataObj.summary || "";
    this.id = dataObj.id;
    this.callbacks = dataObj.callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = stepManager;
    this.stepManager.registerInstance(this);
  }

  updateTitle(title: string) {
    this.title = title;
    this.informStepManager();
  }

  addCallback(callback: Callback) {
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
  }

  updateCallback(callback: Callback, partial: Partial<Callback>) {
    if (!this.callbacks.includes(callback)) {
      return false;
    }
    callback.update(partial);
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
  
  get treeNode () {
    return this.stepNode.treeNode;
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

  get parentStep(): Step | null {
    const parent = this.stepNode.parentTreeNode;
    return this.stepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.treeNode.getPath().length === 1;
  }

  informStepManager() {
    this.stepManager.callbackFunctions.forEach((callback) => callback());
  }

  get steps() {
    const stepsArray = this.stepNode.childrenTreeNodes.map((node) =>
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
