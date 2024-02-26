import { Step } from "./step";
import type { StepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 } from "uuid";

const cleaningFunction = (data: any) => {
  data.title = data.title || "";
  data.id = data.id || v4();
  data.summary = data.summary || "";
  data.callbacks = data.callbacks || [];
  data.children = data.steps || [];
  return data;
};

export default class RootStepConstructor {
  root: TreeModel.Node<StepObj>;
  stepManager = new StepManager();
  constructor(data: any) {
    const parsedData = this.parseData(data);
    this.root = new TreeModel().parse(parsedData);
    this.processStep(this.root);
  }

  parseData(data: any) {
    data = cleaningFunction(data);
    data.children.forEach((child: any) => this.parseData(child));
    return data;
  }

  processStep(node: TreeModel.Node<StepObj>) {
    new Step(node.model as StepObj, new StepNode(node, this.stepManager));
    const children = node.children as TreeModel.Node<StepObj>[];
    if (children) {
      children.forEach((child) => this.processStep(child));
    }
  }

  get rootStep() {
    return this.stepManager.searchById(this.root.model.id);
  }

  registerUpdateCallback(callback: () => void) {
    this.stepManager.registerUpdateCallback(callback);
  }
}
