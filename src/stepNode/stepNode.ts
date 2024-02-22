import TreeModel from "tree-model";
import { StepObj } from "../types";
import { Step } from "../step/step";
import StepManager from "../step/stepManager";
type Node = TreeModel.Node<StepObj>;

export default class StepNode {
  node: Node;
  rootNode: Node;
  constructor(node: Node) {
    if (!node) throw new Error("Node is required");
    this.node = node;
    this.rootNode = this.node.getPath().slice(0, 1)[0];
  }

  addChild(stepObjOrNode: StepObj | Node): Node {
    if (stepObjOrNode instanceof TreeModel.Node) {
      stepObjOrNode.drop();
      return this.node.addChild(stepObjOrNode);
    } else {
      const newNode = this.node.addChild(new TreeModel().parse(stepObjOrNode));
      const newStep = new Step(
        new StepNode(newNode),
        stepObjOrNode.title,
        stepObjOrNode.summary,
        stepObjOrNode.id,
        stepObjOrNode.callbacks
      );
      StepManager.registerInstance(newStep);
      return newNode;
    }
  }

  removeChild(id: string) {
    const nodeToRemove = this.rootNode.first((node) => node.model.id === id);
    if (nodeToRemove) {
      return nodeToRemove.drop();
    } else {
      throw new Error(`No node with id ${id} found`);
    }
  }

  get parent() {
    if (this.node.getPath().length == 1) {
      return null;
    }
    return this.node.getPath().slice(-2, -1)[0];
  }

  get children(): Node[] {
    return this.node.children || [];
  }

  get siblings() {
    if (!this.parent) {
      return [];
    } else {
      return this.parent.children;
    }
  }

  get indexAmongSiblings() {
    return this.node.getIndex();
  }

  siblingAtGivenIndex(index: number) {
    return this.siblings[index];
  }

  moveStepAbove(siblingId: string) {
    const sibling = this.findNodeById(siblingId);
    if (!sibling || !this.parent) {
      return false;
    }
    sibling.drop();
    return !!this.parent.addChildAtIndex(sibling, this.indexAmongSiblings);
  }

  moveStepBelow(siblingId: string) {
    const sibling = this.findNodeById(siblingId);
    if (!sibling || !this.parent) {
      return false;
    }
    sibling.drop();
    return !!this.parent.addChildAtIndex(sibling, this.indexAmongSiblings + 1);
  }

  findNodeById(id: string) {
    return this.rootNode.first((node) => node.model.id === id);
  }
}
