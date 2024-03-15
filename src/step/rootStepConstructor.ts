import { Step } from "./step";
import type { FormattedStepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 } from "uuid";

const defaultSetupFunction = (data: any): FormattedStepObj => {
  data.title = data.title || "";
  data.id = data.id || v4();
  data.summary = data.summary || "";
  data.callbacks = data.callbacks || [];
  data.children = data.steps || [];
  return data;
};

const validateData = (data: any) => {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.id) {
    throw new Error("Id is required");
  }
  if (!data.summary) {
    throw new Error("Summary is required");
  }
};

export default class RootStepConstructor {
  rootNode: TreeModel.Node<FormattedStepObj>;
  stepManager = new StepManager();
  constructor(data: any) {
    const parsedData = this.parseData(data);
    validateData(parsedData);
    this.rootNode = new TreeModel().parse<FormattedStepObj>(parsedData);
    this.processStep(this.rootNode);
  }

  parseData(data: any) {
    data = defaultSetupFunction(data);
    data.children.forEach((child: any) => this.parseData(child));
    return data as FormattedStepObj;
  }

  processStep(node: TreeModel.Node<FormattedStepObj>) {
    new Step(new StepNode(node, this.stepManager));
    const children = node.children as TreeModel.Node<FormattedStepObj>[];
    if (children) {
      children.forEach((child) => this.processStep(child));
    }
  }

  get rootStep() {
    return this.stepManager.searchById(this.rootNode.model.id);
  }

  registerUpdateCallback(callback: () => void) {
    this.stepManager.registerUpdateCallback(callback);
  }
}
