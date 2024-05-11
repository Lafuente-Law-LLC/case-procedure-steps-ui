import TreeModel from "tree-model";
import { v4 } from "uuid";
import type { TreeNode } from "../../types";

const defaultNewStepShape = () => {
  return { id: v4() };
};

const returnRootNode = (node: TreeNode) => {
  if (node.getPath().length == 1) {
    return node;
  }
  return node.getPath().slice(0, 1)[0];
};

const returnParentNode = (node: TreeNode) => {
  if (node.getPath().length == 1) {
    return node;
  }
  return node.getPath().slice(-2, -1)[0];
};

const returnNewTreeNode = () => {
  return new TreeModel().parse(defaultNewStepShape());
};

const disconnectNode = (node: TreeNode) => {
  node.drop();
};

export const addChildToTreeNode = (
  parentNode: TreeNode,
  childNode: TreeNode,
) => {
  return parentNode.addChild(childNode);
};

/**
 * This class is a wrapper around the TreeNode class from the tree-model
 * library. It provides a more intuitive interface for interacting with the tree
 * structure.
 */
export default class StepNode {
  treeNode: TreeNode;
  rootTreeNode: TreeNode;

  constructor(node: TreeNode) {
    if (!node) throw new Error("Node is required");
    this.treeNode = node;
    this.rootTreeNode = returnRootNode(node);
  }

  addNewChildNodeToTreeNode() {
    return addChildToTreeNode(this.treeNode, returnNewTreeNode());
  }

  addNodeToTree(treeNode: TreeNode) {
    disconnectNode(treeNode);
    addChildToTreeNode(this.treeNode, treeNode);
  }

  newStepNodeChild() {
    return new StepNode(this.addNewChildNodeToTreeNode());
  }

  disconnectSelfFromTree() {
    return disconnectNode(this.treeNode);
  }

  get parentTreeNode() {
    return returnParentNode(this.treeNode);
  }

  get childrenTreeNodes(): TreeNode[] {
    return this.treeNode.children;
  }

  get siblingTreeNodes(): TreeNode[] {
    return this.parentTreeNode.children;
  }

  get indexAmongSiblings() {
    return this.treeNode.getIndex();
  }

  /** @returns The basic step object which is the model of the TreeNode. */
  basicStepObject() {
    return this.treeNode.model;
  }

  isAncestorOf(node: TreeNode) {
    return this.treeNode.getPath().includes(node);
  }

  siblingTreeNodeAtIndex(index: number) {
    return this.siblingTreeNodes[index];
  }

  addTreeNodeAtIndex(node: TreeNode, index: number) {
    try {
      const isChild = this.isChild(node);
      if (isChild) {
        return node.setIndex(index);
      } else {
        node.drop();
        return this.treeNode.addChildAtIndex(node, index);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  isChild(node: TreeNode) {
    return this.treeNode.children.includes(node);
  }

  moveNodeAboveSelf(node: TreeNode) {
    try {
      disconnectNode(node);
      return this.parentTreeNode.addChildAtIndex(node, this.indexAmongSiblings);
    } catch (e) {
      console.warn(e);
    }
  }

  moveNodeBelowSelf(node: TreeNode) {
    try {
      disconnectNode(node);
      return this.parentTreeNode.addChildAtIndex(
        node,
        this.indexAmongSiblings + 1,
      );
    } catch (e) {
      console.warn(e);
    }
  }

  findTreeNodeById(id: string) {
    return this.rootTreeNode.first((node) => node.model.id === id);
  }
}
