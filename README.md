# Steps Management System

The Steps Management System is designed to facilitate the creation, manipulation, and navigation of a structured step-based workflow. This system is ideal for managing tasks, procedures, or any process that can be broken down into a series of steps. It utilizes a tree structure for organizing steps, allowing for hierarchical relationships between steps, including parent-child and sibling connections. The system comprises several key components: `Step`, `StepNode`, `StepManager`, and `RootStepConstructor`, working together to offer a comprehensive API for handling complex workflows.

## Key Components

- **Step**: Represents a single step in the workflow. Each step has a title, summary, ID, and can have multiple callbacks and child steps.
- **StepNode**: Manages the tree structure of steps, facilitating operations like adding, moving, or removing steps within the tree.
- **StepManager**: Keeps track of all step instances and provides methods for registering steps, unregistering steps, and executing update callbacks.
- **RootStepConstructor**: Initializes the root of the steps tree and processes the entire structure to link steps with their corresponding `StepNode` instances.

## Installation

To use the Steps Management System, copy the provided classes (`Step`, `StepNode`, `StepManager`, and `RootStepConstructor`) into your project. Ensure you have the `tree-model` and `uuid` libraries installed in your project for tree manipulation and generating unique identifiers, respectively.

```bash
npm install tree-model uuid
```

## Example Usage

Below is a simple example demonstrating how to use the Steps Management System to create a workflow with multiple steps:

### Setting Up

First, import the necessary classes and initialize the root step with some data.

```javascript
import RootStepConstructor from './RootStepConstructor';

// Sample data for the root step
const data = {
  title: "Root Step",
  summary: "This is the root step of the workflow",
  steps: [
    {
      title: "Child Step 1",
      summary: "This is the first child step",
    },
    {
      title: "Child Step 2",
      summary: "This is the second child step",
    }
  ]
};

const rootStepConstructor = new RootStepConstructor(data);
```

### Manipulating Steps

After setting up, you can manipulate steps (e.g., add, move, remove steps) using the methods provided by the `Step` and `StepNode` classes.

```javascript
// Adding a new child step to the root
const newStep = rootStepConstructor.rootStep.addNewStep();
newStep.title = "New Child Step";
newStep.summary = "This is a newly added child step.";

// Moving the new step to be the first child of "Child Step 1"
const childStep1 = rootStepConstructor.rootStep.steps.find(step => step.title === "Child Step 1");
childStep1.addAsChildStep(newStep);

// Removing "Child Step 2"
const childStep2 = rootStepConstructor.rootStep.steps.find(step => step.title === "Child Step 2");
childStep2.remove();
```

### Retrieving Steps and Updating the Workflow

You can search for steps by ID, register update callbacks to react to changes in the workflow, and convert the entire workflow into a JSON object for storage or transmission.

```javascript
// Register an update callback
rootStepConstructor.registerUpdateCallback(() => {
  console.log("The workflow has been updated!");
});

// Convert the workflow to JSON
const workflowJSON = rootStepConstructor.rootStep.toJSON();
console.log(workflowJSON);
```

This example demonstrates basic usage and manipulation of a workflow using the Steps Management System. The system is flexible and can be extended to accommodate various workflow management needs.

Certainly! Here's a detailed cheat sheet for using the Callback Manager Library:

---

# Callback Manager Library Cheat Sheet

## Importing the Library

```typescript
import { EventCallbackManager, TaskCallbackManager } from 'callback-manager';
```

## Creating Callback Managers

### EventCallbackManager

```typescript
const eventManager = new EventCallbackManager(initialCallbacks: CallbackWithId[]);
```

### TaskCallbackManager

```typescript
const taskManager = new TaskCallbackManager(initialCallbacks: CallbackWithId[]);
```

## Managing Callbacks

### Adding a Callback

```typescript
manager.add(callback: Partial<T>);
```

### Updating a Callback

```typescript
manager.update(id: string, callback: Partial<T>);
```

### Removing a Callback

```typescript
manager.remove(id: string);
```

### Finding a Callback by ID

```typescript
const callback = manager.find(id: string);
```

## Types and Interfaces

### CallbackWithId

```typescript
interface CallbackWithId {
  id: string;
  // Other callback properties...
}
```

### PartialCallback

```typescript
type PartialCallback = Partial<EventCallback> & Partial<TaskCallback>;
```

### Managers

```typescript
type Managers = typeof EventCallbackManager | typeof TaskCallbackManager;
```

## Usage Example

```typescript
// Create an instance of EventCallbackManager with initial callbacks
const eventManager = new EventCallbackManager([]);

// Add a new event callback
eventManager.add({
  args: {
    title: 'Event Title',
    summary: 'Event Summary',
    date: '2024-03-09T12:00:00Z',
  },
});

// Update an existing callback
eventManager.update('callbackId', { args: { date: '2024-03-10T12:00:00Z' } });

// Remove a callback by ID
eventManager.remove('callbackId');

// Find a callback by ID
const callback = eventManager.find('callbackId');
```

---

This cheat sheet provides a quick reference for using the Callback Manager Library, including creating callback managers, managing callbacks, and understanding types and interfaces. Feel free to customize it further to suit your specific needs!