import { Step } from "./step";
import { Node } from "../types";
import { stepValidator } from "../validator/validators";
import CallbackManager from "../callback/callbackManager";


export default class StepManager {
  registeredSteps: Set<Step>;
  updateCallbacks: Set<() => void>;
  stepValidator = stepValidator;
  callbackManager = new CallbackManager();
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
   *
   * @param node
   */
  static returnRootNode(node: Node) {
    return node.getPath().slice(0, 1)[0];
  }
}
