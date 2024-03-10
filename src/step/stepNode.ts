import TreeModel from "tree-model";
import { Step } from "./step";
import { v4 } from "uuid";
import StepManager from "./stepManager";
import type { Node } from "../types";
/**
 * The StepNode class acts as a wrapper around a node in a tree structure,
 * facilitating various tree manipulation operations specific to the
 * application's step management system. It encapsulates the logic for adding,
 * removing, and navigating among steps (nodes) within the hierarchical tree
 * model provided by the TreeModel library.
 *
 * This class is designed to work closely with the Step and StepManager classes,
 * ensuring that each step in the hierarchy can be easily managed and
 * manipulated according to the needs of the application. It leverages the
 * TreeModel's functionality to provide a rich set of features for node
 * manipulation, including adding new child nodes, moving nodes within the tree,
 * and performing searches within the hierarchy.
 *
 * Key Features:
 *
 * - Add New Child: Allows adding a new child step (node) under the current node,
 *   automatically integrating it into the tree structure.
 * - Add As Child: Enables moving an existing node to become a child of the
 *   current node, useful for reorganizing the step hierarchy.
 * - Remove Self: Removes the current node (and by extension, the step) from the
 *   tree, adjusting the hierarchy accordingly.
 * - Parent and Sibling Access: Provides access to the node's parent and siblings,
 *   facilitating navigation and manipulation within the tree.
 * - Ancestry Checking: Offers a method to check if a given node is an ancestor of
 *   the current node, useful for validating the structure or preventing
 *   circular references.
 * - Node Movement: Supports moving the node to different positions relative to
 *   its siblings, enabling flexible reordering of steps.
 *
 * Usage: The StepNode class is typically used internally by the Step class to
 * manage its position and relations within the tree structure. When creating or
 * modifying steps, the corresponding StepNode methods are called to reflect
 * these changes in the tree model.
 *
 * Example:
 *
 * ```javascript
 * const stepNode = new StepNode(node, stepManager);
 * stepNode.addNewChild(); // Adds a new child node
 * stepNode.removeSelf(); // Removes the node itself from the tree
 * ```
 *
 * Note: It is important to ensure that instances of StepNode are properly
 * managed in conjunction with the StepManager to maintain the integrity of the
 * step hierarchy and avoid orphaned nodes.
 */
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
