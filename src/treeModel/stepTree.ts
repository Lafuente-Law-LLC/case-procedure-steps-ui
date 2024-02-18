import type { Options } from "./types";
import TreeModel from "tree-model";
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

}

export default StepTree;
