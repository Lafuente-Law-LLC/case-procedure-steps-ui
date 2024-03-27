import TreeModel from "tree-model";
import { Step } from "./step";
import { v4 } from "uuid";
import StepManager from "./stepManager";
import { Node } from "../../types";

export default class StepNode {
  node: Node;
  rootNode: Node;
  stepManager: StepManager;
  constructor(node: Node, stepManager: StepManager) {
    if (!node) throw new Error("Node is required");
    this.node = node;
    this.rootNode = StepManager.returnRootNode(node);
    this.stepManager = stepManager;
  }

  addNewChild() {
    const newId = v4();
    const newNode = this.node.addChild(new TreeModel().parse({ id: newId }));
    const manager = this.stepManager;
    return new Step(new StepNode(newNode, manager));
  }

  addAsChild(treeNode: Node) {
    treeNode.drop();
    this.node.addChild(treeNode);
  }

  removeSelf() {
    return this.node.drop();
  }

  get parentNode() {
    if (this.node.getPath().length == 1) {
      return this.rootNode;
    }
    return this.node.getPath().slice(-2, -1)[0];
  }

  get childrenNodes(): Node[] {
    return this.node.children;
  }

  get siblingNodes(): Node[] {
    return this.parentNode.children;
  }

  get indexAmongSiblings() {
    return this.node.getIndex();
  }

  isAncestorOf(node: Node) {
    return this.node.getPath().includes(node);
  }
  siblingAtGivenIndex(index: number) {
    return this.siblingNodes[index];
  }

  moveNodeAboveSelf(node: Node) {
    try {
      node.drop();
      return this.parentNode.addChildAtIndex(node, this.indexAmongSiblings);
    } catch (e) {
      console.warn(e);
    }
  }

  moveNodeBelowSelf(node: Node) {
    try {
      node.drop();
      return this.parentNode.addChildAtIndex(node, this.indexAmongSiblings + 1);
    } catch (e) {
      console.warn(e);
    }
  }

  findNodeById(id: string) {
    return this.rootNode.first((node) => node.model.id === id);
  }
}
