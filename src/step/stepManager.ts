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

  registerInstance(instance: Step) {
    this.registeredSteps.add(instance);
  }


  unregisterInstance(instance: Step) {
    this.registeredSteps.delete(instance);
  }


  registerUpdateCallback(callback: () => void) {
    this.updateCallbacks.add(callback);
  }
  searchById(id: string) {
    return Array.from(this.registeredSteps).find((step) => step.id === id);
  }

  static returnRootNode(node: Node) {
    return node.getPath().slice(0, 1)[0];
  }
}
