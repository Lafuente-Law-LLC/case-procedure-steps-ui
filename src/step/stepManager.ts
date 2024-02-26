import { Step } from "./step";

export default class StepManager {
  registeredSteps: Set<Step>;
  updateCallbacks: Set<() => void>;
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
}
