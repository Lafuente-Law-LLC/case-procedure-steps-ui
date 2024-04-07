import StepManager from "../../../src/models/step/stepManager";
import { Step } from "../../../src/models/step/step";

describe("StepManager", () => {
  let stepManager;
  let step;
  beforeEach(() => {
    stepManager = new StepManager();
    step = Object.create(Step.prototype);
  });

  test("constructor initializes registeredSteps and callbackFunctions", () => {
    expect(stepManager.registeredSteps.size).toBe(0);
    expect(stepManager.callbackFunctions.size).toBe(0);
  });

  test("registerInstance adds instance to registeredSteps", () => {
    const step = Object.create(Step.prototype);
    stepManager.registerInstance(step);
    expect(stepManager.registeredSteps.size).toBe(1);
    expect(stepManager.registeredSteps.has(step)).toBe(true);
  });

  test("unregisterInstance removes instance from registeredSteps", () => {
    stepManager.registeredSteps.add(step);
    stepManager.unregisterInstance(step);
    expect(stepManager.registeredSteps.size).toBe(0);
    expect(stepManager.registeredSteps.has(step)).toBe(false);
  });

  test("registerUpdateCallback adds callback to callbackFunctions", () => {
    const callback = jest.fn();
    stepManager.registerUpdateCallback(callback);
    expect(stepManager.callbackFunctions.size).toBe(1);
    expect(stepManager.callbackFunctions.has(callback)).toBe(true);
  });

  test("searchById returns correct Step instance", () => {
    const step1 = Object.create(Step.prototype, { id: { value: "1" } });
    const step2 = Object.create(Step.prototype, { id: { value: "2" } });
    stepManager.registeredSteps.add(step1);
    stepManager.registeredSteps.add(step2);
    const foundStep = stepManager.searchById("2");
    expect(foundStep).toBe(step2);
  });

  
});
