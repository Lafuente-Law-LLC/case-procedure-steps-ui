import { Step } from "./step";
import { Node } from "../types";
/**
 * The StepManager class serves as a central registry and controller for managing 
 * instances of Steps within a hierarchical structure. It facilitates the creation,
 * update, and deletion of Steps, while maintaining a synchronized state across the
 * application. Each Step instance is registered with the StepManager upon creation,
 * allowing for global access and manipulation.
 *
 * The StepManager is responsible for invoking update callbacks whenever changes occur
 * within the step hierarchy, ensuring that any dependent processes or UI components 
 * are notified and can react to these changes. It uses a Set to store registered Step
 * instances and another Set for update callbacks, optimizing for performance and ease 
 * of management.
 *
 * The class also provides a static utility method for determining the root node of a 
 * given node within the tree, facilitating operations that require knowledge of the 
 * tree's structure, such as finding a specific node or navigating the hierarchy.
 *
 * Key Features:
 * - Registers and unregisters Step instances to keep track of all steps in the system.
 * - Manages update callbacks that are executed when any changes occur to the steps, 
 *   ensuring reactive updates across the system.
 * - Allows searching for a registered Step instance by its ID, enabling direct access 
 *   to any step within the hierarchy.
 * - Provides a static method to find the root node of a given tree node, aiding in 
 *   hierarchical operations and traversal.
 *
 * Usage:
 * The StepManager should be instantiated once and used throughout the application 
 * to manage Step instances. Upon creating a new Step, it should be registered with 
 * the StepManager. Similarly, when a Step is removed, it should be unregistered. 
 * This class ensures that all parts of the application that interact with the step 
 * hierarchy have up-to-date information and can respond to changes appropriately.
 */

export default class StepManager {
  registeredSteps: Set<Step>;
  updateCallbacks: Set<() => void>;
  constructor() {
    this.registeredSteps = new Set<Step>();
    this.updateCallbacks = new Set<() => void>();
  }

  /**
   * Register a step instance
   *
   * @param instance
   * @returns Void
   */
  registerInstance(instance: Step) {
    this.registeredSteps.add(instance);
  }

  /**
   * Unregister a step instance
   *
   * @param instance
   * @returns Void
   */
  unregisterInstance(instance: Step) {
    this.registeredSteps.delete(instance);
  }

  /**
   * Call all the update callbacks
   *
   * @returns Void
   */
  registerUpdateCallback(callback: () => void) {
    this.updateCallbacks.add(callback);
  }
  searchById(id: string) {
    return Array.from(this.registeredSteps).find((step) => step.id === id);
  }


  /**
   * Given a node, returns the root node  
   * @param node 
   */
  static returnRootNode(node: Node) {
    return node.getPath().slice(0, 1)[0];
  }
}
