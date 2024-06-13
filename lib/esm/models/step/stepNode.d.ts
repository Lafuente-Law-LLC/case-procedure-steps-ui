import TreeModel from "tree-model";
import type { TreeNode } from "../../types";
export declare const addChildToTreeNode: (parentNode: TreeNode, childNode: TreeNode) => TreeModel.Node<import("../../types").FormattedStepObj>;
/**
 * This class is a wrapper around the TreeNode class from the tree-model
 * library. It provides a more intuitive interface for interacting with the tree
 * structure.
 */
export default class StepNode {
    treeNode: TreeNode;
    rootTreeNode: TreeNode;
    constructor(node: TreeNode);
    addNewChildNodeToTreeNode(): TreeModel.Node<import("../../types").FormattedStepObj>;
    addNodeToTree(treeNode: TreeNode): void;
    newStepNodeChild(): StepNode;
    disconnectSelfFromTree(): void;
    get parentTreeNode(): TreeNode;
    get childrenTreeNodes(): TreeNode[];
    get siblingTreeNodes(): TreeNode[];
    get indexAmongSiblings(): number;
    /** @returns The basic step object which is the model of the TreeNode. */
    basicStepObject(): any;
    isAncestorOf(node: TreeNode): boolean;
    siblingTreeNodeAtIndex(index: number): TreeNode;
    addTreeNodeAtIndex(node: TreeNode, index: number): TreeModel.Node<import("../../types").FormattedStepObj> | undefined;
    isChild(node: TreeNode): any;
    moveNodeAboveSelf(node: TreeNode): TreeModel.Node<import("../../types").FormattedStepObj> | undefined;
    moveNodeBelowSelf(node: TreeNode): TreeModel.Node<import("../../types").FormattedStepObj> | undefined;
    findTreeNodeById(id: string): TreeModel.Node<import("../../types").FormattedStepObj> | undefined;
}
