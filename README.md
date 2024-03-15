# Step Library README

## Overview

The Step Library provides a comprehensive solution for managing hierarchical step-based processes or workflows. It enables the creation, manipulation, and navigation of steps within a tree structure. This modular library is designed to be flexible, allowing for various use cases such as tutorials, process flows, or any hierarchical list of actions.

## Features

- **Tree-Based Structure**: Utilizes a tree model to organize steps in a hierarchical manner, enabling complex structures.
- **Dynamic Step Management**: Create, update, and delete steps dynamically within the workflow.
- **Callbacks and Hooks**: Register callbacks to respond to updates in the step tree, allowing for reactive updates in your application.
- **Navigation and Manipulation**: Easily navigate through steps, find specific steps by ID, and reorder steps within the hierarchy.
- **Serialization**: Convert your step structure into a JSON format for easy storage or transmission and rebuild it from the same.

## Installation

To use the Step Library in your project, copy the provided `step.js`, `stepNode.js`, and `stepManager.js` files into your project directory. Ensure that your environment supports ES6 modules if you're working in a Node.js or browser context.

## Usage

### Basic Example

```javascript
import RootStepConstructor from "./rootStepConstructor";
import { Step } from "./step";

// Define your initial step data
const initialData = {
  title: "Start",
  summary: "This is the starting point.",
  id: "start-step", // It's recommended to provide a unique ID
  callbacks: [],
  steps: [
    {
      title: "First Step",
      summary: "This is the first step.",
      id: "first-step",
      callbacks: [],
      steps: [], // Nested steps can be added in a similar manner
    },
  ],
};

// Create the root step
const rootStep = new RootStepConstructor(initialData).rootStep;

// Manipulate steps
const newStep = rootStep.addNewStep();
newStep.updateTitle("New Step");
newStep.updateSummary("This is a new step added to the process.");

// Remove a step
newStep.remove();

// Convert to JSON for storage or transmission
const stepsJson = rootStep.toJSON();
```

### Registering Update Callbacks

```javascript
rootStep.registerUpdateCallback(() => {
  console.log("The step tree was updated!");
});
```

This example demonstrates basic usage. You can build upon this with more complex structures and interactions based on your application's needs.

## API Reference

Please refer to the JSDoc comments in the source code for detailed information on each class and method. The library primarily consists of three classes:

- `Step`: Represents a single step in the process.
- `StepNode`: Manages the tree structure of a step.
- `StepManager`: Handles registration and updates of steps within the entire tree.

### Classes

#### `Step`

Represents a single step or node in the step hierarchy.

##### Constructor

- `constructor(stepNode: StepNode)`: Initializes a new step with the given `StepNode`.

##### Methods

- `updateTitle(title: string)`: Updates the title of the step.
- `updateSummary(summary: string)`: Updates the summary of the step.
- `updateCallbacks(callbacks: Callback[])`: Updates the list of callback functions associated with the step.
- `addNewStep()`: Adds a new child step to the current step and returns the new step.
- `addAsChildStep(step: Step)`: Adds the given step as a child of the current step.
- `isAncestorOf(step: Step)`: Determines if the current step is an ancestor of the given step.
- `findStepById(id: string)`: Searches for and returns a step by its ID within the tree.
- `moveStepAboveSelf(step: Step)`: Moves the given step to be a sibling above the current step.
- `moveStepBelowSelf(step: Step)`: Moves the given step to be a sibling below the current step.
- `remove()`: Removes the current step from the hierarchy.
- `get parentStep()`: Returns the parent step of the current step.
- `isRoot()`: Checks if the current step is the root of the tree.
- `get steps()`: Returns an array of child steps.
- `toJSON()`: Serializes the step (and its children) to JSON.

#### `StepNode`

Manages the tree structure of a step.

##### Constructor

- `constructor(node: Node, stepManager: StepManager)`: Initializes a new `StepNode` with a given tree node and step manager.

##### Methods

- `addNewChild()`: Adds a new child node to the current node and returns the associated step.
- `addAsChild(treeNode: Node)`: Adds a given tree node as a child of the current node.
- `removeSelf()`: Removes the current node (and therefore the step) from the tree.
- `get parentNode()`: Returns the parent node of the current node.
- `get childrenNodes()`: Returns an array of child nodes.
- `get siblingNodes()`: Returns an array of sibling nodes.
- `get indexAmongSiblings()`: Returns the index of the current node among its siblings.
- `isAncestorOf(node: Node)`: Checks if the current node is an ancestor of the given node.
- `moveNodeAboveSelf(node: Node)`: Moves a given node to be a sibling above the current node.
- `moveNodeBelowSelf(node: Node)`: Moves a given node to be a sibling below the current node.
- `findNodeById(id: string)`: Searches for and returns a node by its ID within the tree.

#### `StepManager`

Handles the registration and updates of steps within the tree.

##### Constructor

- `constructor()`: Initializes a new `StepManager`.

##### Methods

- `registerInstance(instance: Step)`: Registers a step instance with the manager.
- `unregisterInstance(instance: Step)`: Unregisters a step instance from the manager.
- `registerUpdateCallback(callback: () => void)`: Registers a callback function to be called when the step tree is updated.
- `searchById(id: string)`: Searches for and returns a step by its ID.
- `static returnRootNode(node: Node)`: Given a node, returns the root node of the tree.

### Usage

The Step Library is intended for use in applications where a structured, navigable hierarchy of steps, tasks, or actions is required. It can be applied in scenarios such as guided workflows, tutorials, project planning tools, and more.

### Extending and Customizing

The library is designed with extendibility in mind. Users can extend the `Step`, `StepNode`, and `StepManager` classes to add additional functionality or to tailor the library to specific requirements.

### Integration

The Step Library can be integrated into both frontend and backend JavaScript applications. It is framework-agnostic and can be used alongside any JavaScript framework or library.
