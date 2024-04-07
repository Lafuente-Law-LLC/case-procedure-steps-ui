import { Step } from "./step";


const ensureIsStep = (instance: Step) => {
  if (!(instance instanceof Step)) {
    throw new Error("Instance must be of type Step");
  }
};

export default class StepManager {
  registeredSteps: Set<Step>;
  callbackFunctions: Set<() => void>;

  constructor() {
    this.registeredSteps = new Set<Step>();
    this.callbackFunctions = new Set<() => void>();
  }

  registerInstance(instance: Step) {
    ensureIsStep(instance);
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

  makeNewChildForStep(step: Step) { 
    return new Step(step.stepNode.newStepNodeChild(), this);
  }


}
