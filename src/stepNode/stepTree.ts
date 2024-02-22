import type { Options } from "./types";
import TreeModel from "tree-model";
import { Step } from "../step/step";
const options: Options = { childrenPropertyName: "steps" };

export type IdObj = {
  id: string;
  steps: IdObj[];
};

class StepTree {
  rootNode: TreeModel.Node<IdObj>;
  constructor(root: IdObj) {
    this.rootNode = new TreeModel(options).parse(root);
  }

  find(stepId: string) {
    return this.rootNode.first((node) => node.model.id === stepId);
  }

  /**
   *
   * @param parentStep
   * @param newStep  - could be another Step
   */
  addStep(parentStep: Step, newStep: Step) {
    const parentId = parentStep.id;
    const childId = newStep.id;
    const parent = this.find(parentId);
    const node = this.find(newStep.id)
      ? this.find(newStep.id)?.drop()
      : new TreeModel(options).parse({ id: childId, steps: [] });
    if (parent && node) {
      parent.addChild(node);
    }
  }

  removeStep(step: Step) {
    const id = step.id;
    const node = this.find(id);
    if (node) {
      const droppedNode = node.drop();
      if (droppedNode) {
        Step.unregisterInstance(step);
      }
    }
  }

  childAt(step: Step, index: number) {
    const id = step.id;
    const node = this.find(id);
    if (node) {
      return node.children[index];
    }
  }
}

export default StepTree;
