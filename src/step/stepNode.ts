import TreeModel from "tree-model";
import { StepObj } from "../types";
import { Step } from "./step";
import { v4 } from "uuid";
type Node = TreeModel.Node<StepObj>;

const returnRootNode = (node: Node) => node.getPath().slice(0, 1)[0];

export default class StepNode {
  node: Node;
  rootNode: Node;
  constructor(node: Node) {
    if (!node) throw new Error("Node is required");
    this.node = node;
    this.rootNode = returnRootNode(node);
  }

  addNewChild() {
    const newId = v4();
    const newNode = this.node.addChild(new TreeModel().parse({ id: newId }));
    return new Step({ id: newId }, new StepNode(newNode));
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
      this.rootNode;
    }
    return this.node.getPath().slice(-2, -1)[0];
  }

  get childrenNodes(): Node[] {
    return this.node.children || [];
  }

  get siblingNodes(): Node[] {
    return this.parentNode.children || [];
  }

  get indexAmongSiblings() {
    return this.node.getIndex();
  }

  siblingAtGivenIndex(index: number) {
    return this.siblingNodes[index];
  }

  moveNodeAboveSelf(node: Node) {
    node.drop();
    return this.parentNode.addChildAtIndex(node, this.indexAmongSiblings);
  }

  moveNodeBelowSelf(node: Node) {
    node.drop();
    return this.parentNode.addChildAtIndex(node, this.indexAmongSiblings + 1);
  }

  findNodeById(id: string) {
    return this.rootNode.first((node) => node.model.id === id);
  }
}
