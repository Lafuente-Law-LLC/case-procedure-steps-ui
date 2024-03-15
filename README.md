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

## Contributing

Contributions to the Step Library are welcome. Please ensure to follow the existing coding style and add unit tests for any new or changed functionality. Create pull requests for any contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
