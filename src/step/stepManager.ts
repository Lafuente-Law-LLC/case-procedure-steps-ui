import { Step } from "./step";
const REGISTERED_STEPS = new Set<Step>();
export default class StepManager {
  static get registeredSteps() {
    return REGISTERED_STEPS;
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
