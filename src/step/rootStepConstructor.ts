import { Step } from "./step";
import type { FormattedStepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 } from "uuid";

/**
 * Given a data object, this function will return a new object with the default
 * values set to ensure that the data is a valid StepObj
 */
const defaultSetupFunction = (data: any): FormattedStepObj => {
  data.title = data.title || "";
  data.id = data.id || v4();
  data.summary = data.summary || "";
  data.callbacks = data.callbacks || [];
  data.children = data.steps || [];
  delete data.steps;
  return data;
};

const validateData = (data: any) => {
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.id) {
    throw new Error("Id is required");
  }
  if (!data.summary) {
    throw new Error("Summary is required");
  }
};


/**
 * The RootStepConstructor class is designed to initialize a hierarchical step
 * structure from a given data object. It constructs the root step and all its
 * child steps based on the provided data, setting default values for any missing
 * fields to ensure the data conforms to the FormattedStepObj interface. This class
 * leverages the TreeModel library to manage the hierarchical structure, and 
 * integrates with the Step, StepNode, and StepManager classes to create a 
 * comprehensive system for managing steps in an application.
 *
 * Key Functions:
 * - defaultSetupFunction(data: any): FormattedStepObj
 *   Takes a potentially incomplete data object and returns a new object with default
 *   values for any missing step properties, ensuring the object is a valid FormattedStepObj.
 *
 * - validateData(data: any): void
 *   Validates that the necessary fields (title, id, summary) are present in the data object.
 *   Throws an error if any required field is missing.
 *
 * Constructor:
 * - data (any): The initial data object from which to construct the step hierarchy.
 *   The constructor parses this data, validates it, and initializes the step structure,
 *   creating a TreeModel.Node for each step and registering it with a StepManager instance.
 *
 * Methods:
 * - parseData(data: any): FormattedStepObj
 *   Recursively processes the input data, applying defaultSetupFunction to ensure
 *   all steps are valid FormattedStepObj instances, including child steps.
 *
 * - processStep(node: TreeModel.Node<FormattedStepObj>): void
 *   Instantiates Step objects for each node in the tree, linking them with their
 *   respective StepNode and registering them with the StepManager. This method
 *   recursively processes all child nodes.
 *
 * - get rootStep(): Step
 *   Accessor for the root Step object, retrieved from the StepManager using the root node's ID.
 *
 * - registerUpdateCallback(callback: () => void): void
 *   Allows registration of a callback function in the StepManager that is called
 *   whenever any step in the hierarchy is updated.
 *
 * Usage:
 * This class is used to bootstrap a step management system from a JSON or
 * JavaScript object representing the initial structure of steps. It simplifies
 * the creation of a complex hierarchical system of steps, ensuring all steps
 * are properly initialized and registered with the system's StepManager.
 *
 * Example:
 * ```javascript
 * const initialData = {
 *   title: "Root Step",
 *   summary: "This is the root step",
 *   id: "root",
 *   steps: [
 *     {
 *       title: "Child Step 1",
 *       summary: "First child step",
 *       id: "child1"
 *     }
 *   ]
 * };
 * const rootStepConstructor = new RootStepConstructor(initialData);
 * const rootStep = rootStepConstructor.rootStep;
 * ```
 */
export default class RootStepConstructor {
  rootNode: TreeModel.Node<FormattedStepObj>;
  stepManager = new StepManager();
  constructor(data: any) {
    const parsedData = this.parseData(data);
    validateData(parsedData);
    this.rootNode = new TreeModel().parse<FormattedStepObj>(parsedData);
    this.processStep(this.rootNode);
  }

  parseData(data: any) {
    data = defaultSetupFunction(data);
    data.children.forEach((child: any) => this.parseData(child));
    return data as FormattedStepObj;
  }

  processStep(node: TreeModel.Node<FormattedStepObj>) {
    new Step(new StepNode(node, this.stepManager));
    const children = node.children as TreeModel.Node<FormattedStepObj>[];
    if (children) {
      children.forEach((child) => this.processStep(child));
    }
  }

  get rootStep() {
    return this.stepManager.searchById(this.rootNode.model.id);
  }

  registerUpdateCallback(callback: () => void) {
    this.stepManager.registerUpdateCallback(callback);
  }
}
