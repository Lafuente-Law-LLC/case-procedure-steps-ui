import { Step } from "./step";
export default class StepManager {
    registeredSteps: Set<Step>;
    updateFunctions: Set<() => void>;
    constructor();
    registerInstance(instance: Step): void;
    unregisterInstance(instance: Step): void;
    registerUpdateFunction(updateFunction: () => void): void;
    searchById(id: string): Step | undefined;
    makeNewChildForStep(step: Step): Step;
}
