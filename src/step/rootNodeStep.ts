import { Step } from "./step";
import type { StepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "../stepNode/stepNode";

export default class RootNodeStep {
  root: TreeModel.Node<StepObj>;
  constructor(data: any) {
    const parseData = this.parseData(data);
    this.root = new TreeModel().parse(parseData);
    this.processStep(this.root);
  }

  parseData(data: any) {
    return {
      ...data,
      children: data.steps.map((step: any) => {
        if (step.steps && step.steps.length > 0) {
          return this.parseData(step);
        } else {
          return { ...step, children: [] };
        }
      }),
    };
  }

  processStep(node: TreeModel.Node<StepObj>) {
    const step = new Step(
      new StepNode(node),
      node.model.title,
      node.model.summary,
      node.model.id,
      node.model.callbacks || []
    );
    StepManager.registerInstance(step);
    const children = node.children as TreeModel.Node<StepObj>[];
    if (children) {
      children.forEach((child) => this.processStep(child));
    }
  }

  get rootStep() { 
    return StepManager.searchById(this.root.model.id);
  }
}
