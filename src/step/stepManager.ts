import { Step } from "./step";

export default class StepManager {
  private static registeredSteps = new Set<Step>();
   static updateCallbacks = new Set<() => void>();

  static registerUpdateCallback(callback: () => void) {
    StepManager.updateCallbacks.add(callback);
  }
  static registerInstance(instance: Step) {
    StepManager.registeredSteps.add(instance);
  }
  static unregisterInstance(instance: Step) {
    StepManager.registeredSteps.delete(instance);
  }

  static searchById(id: string) {
    return Array.from(StepManager.registeredSteps).find(
      (step) => step.id === id
    );
  }
}
