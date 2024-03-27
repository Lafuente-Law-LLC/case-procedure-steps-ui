import { Step } from "./step";
import { Node } from "../../types";

export default class StepManager {
  registeredSteps: Set<Step>;
  callbackFunctions: Set<() => void>;

  constructor() {
    this.registeredSteps = new Set<Step>();
    this.callbackFunctions = new Set<() => void>();
  }

  registerInstance(instance: Step) {
    this.registeredSteps.add(instance);
  }

  unregisterInstance(instance: Step) {
    this.registeredSteps.delete(instance);
  }

  registerUpdateCallback(callback: () => void) {
    this.callbackFunctions.add(callback);
  }
  searchById(id: string) {
    return Array.from(this.registeredSteps).find((step) => step.id === id);
  }

  static returnRootNode(node: Node) {
    return node.getPath().slice(0, 1)[0];
  }
}
