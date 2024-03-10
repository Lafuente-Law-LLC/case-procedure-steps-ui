import StepNode from "./stepNode";
import StepManager from "./stepManager";
import type { Callback } from "../types";

/**
 * The Step class represents a single actionable item within a hierarchical step management system.
 * Each step is uniquely identified and can contain a title, a summary, callbacks for specific events,
 * and child steps, forming a structured, navigable tree of steps. The Step class provides methods for
 * updating step properties, managing child steps, and navigating the step hierarchy, ensuring a flexible
 * and powerful way to manage complex workflows or processes.
 *
 * Upon instantiation, the Step class requires a StepNode, which links the step to its position within
 * the hierarchical tree structure and provides access to tree manipulation functions. This design
 * enforces a consistent relationship between the step and its tree representation, facilitating efficient
 * management and updates of the step hierarchy.
 *
 * Constructor:
 * - stepNode (StepNode): An instance of StepNode that represents the step's position in the tree structure.
 *   The step's properties (title, summary, id, callbacks) are initialized based on the StepNode's model data.
 *
 * Properties:
 * - title (string): The title of the step.
 * - summary (string): A brief summary of the step's purpose or contents.
 * - id (string): A unique identifier for the step.
 * - callbacks (Callback[]): An array of callbacks associated with the step.
 * - stepNode (StepNode): The StepNode instance representing the step in the tree structure.
 * - stepManager (StepManager): The StepManager instance managing this step.
 *
 * Methods:
 * - updateTitle(title: string): Updates the step's title.
 * - updateSummary(summary: string): Updates the step's summary.
 * - updateCallbacks(callbacks: Callback[]): Updates the step's callbacks.
 * - addNewStep(): Adds a new child step under this step.
 * - addAsChildStep(step: Step): Adds an existing step as a child of this step.
 * - isAncestorOf(step: Step): Checks if this step is an ancestor of another step.
 * - findStepById(id: string): Finds a step by its ID within the step hierarchy.
 * - moveStepAboveSelf(step: Step), moveStepBelowSelf(step: Step): Moves a step relative to this step's position.
 * - remove(): Removes this step from the tree.
 * - isRoot(): Checks if this step is the root of the step hierarchy.
 * - callupdateCallbacks(): Triggers update callbacks registered in the step manager.
 * - toJSON(): Serializes the step to a JSON-like object, including nested child steps.
 *
 * Usage:
 * The Step class is designed to be used in applications requiring structured management of tasks,
 * processes, or any hierarchical system of actions. It allows for dynamic manipulation of the step
 * hierarchy and provides detailed control over step properties and child steps.
 *
 * Example:
 * ```javascript
 * // Assuming stepNode represents a valid StepNode in the tree
 * const step = new Step(stepNode);
 * step.updateTitle("New Title");
 * const childStep = step.addNewStep();
 * ```
 */
class Step {
  title: string;
  summary: string;
  id: string;
  callbacks: Callback[];
  stepNode: StepNode;
  stepManager: StepManager;
  constructor(stepNode: StepNode) {
    const dataObj = stepNode.node.model;
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    this.title = dataObj.title || "";
    this.summary = dataObj.summary || "";
    this.id = dataObj.id;
    this.callbacks = dataObj.callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = this.stepNode.stepManager;
    this.stepManager.registerInstance(this);
  }

  updateTitle(title: string) {
    this.title = title;
    this.callupdateCallbacks();
  }

  updateCallbacks(callbacks: Callback[]) {
    this.callbacks = callbacks;
    this.callupdateCallbacks();
  }
  updateSummary(summary: string) {
    this.summary = summary;
    this.callupdateCallbacks();
  }

  addNewStep() {
    const step = this.stepNode.addNewChild();
    this.callupdateCallbacks();
    return step;
  }

  addAsChildStep(step: Step) {
    this.stepNode.addAsChild(step.stepNode.node);
  }

  isAncestorOf(step: Step) {
    return this.stepNode.isAncestorOf(step.stepNode.node);
  }

  findStepById(id: string) {
    return this.stepManager.searchById(id);
  }

  moveStepAboveSelf(step: Step) {
    this.stepNode.moveNodeAboveSelf(step.stepNode.node);
    this.callupdateCallbacks();
  }

  moveStepBelowSelf(step: Step) {
    this.stepNode.moveNodeBelowSelf(step.stepNode.node);
    this.callupdateCallbacks();
  }

  remove() {
    this.stepNode.removeSelf();
    this.stepManager.unregisterInstance(this);
    this.callupdateCallbacks();
  }

  get parentStep(): Step | null {
    const parent = this.stepNode.parentNode;
    return this.stepManager.searchById(parent.model.id) || null;
  }

  isRoot() {
    return this.stepNode.node.getPath().length === 1;
  }

  callupdateCallbacks() {
    this.stepManager.updateCallbacks.forEach((callback) => callback());
  }

  get steps() {
    const stepsArray = this.stepNode.childrenNodes.map((node) =>
      this.stepManager.searchById(node.model.id),
    );

    return stepsArray.filter((step) => step !== undefined);
  }

  toJSON(): any {
    return {
      title: this.title,
      summary: this.summary,
      id: this.id,
      callbacks: this.callbacks,
      steps: this.steps.map((step) => step && step.toJSON()),
    };
  }
}

export { Step };
