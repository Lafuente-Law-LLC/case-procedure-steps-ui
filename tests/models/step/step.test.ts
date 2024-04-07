jest.mock("../../../src/models/step/stepNode");
jest.mock("../../../src/models/step/stepManager");
import StepNode from "../../../src/models/step/stepNode";
import StepManager from "../../../src/models/step/stepManager";

class MockCallback {
  constructor() {
    this.updated = false;
  }

  update(partial) {
    this.updated = true;
    Object.assign(this, partial);
  }

  toJSON() {
    return { updated: this.updated };
  }
}

import { Step } from "../../../src/models/step/step";

describe("Step class tests", () => {
  let stepNodeMock, stepManagerMock, step;

  beforeEach(() => {
    stepNodeMock = new StepNode();
    stepManagerMock = new StepManager();
    stepManagerMock.callbackFunctions = [];
    stepNodeMock.node = {
      model: {
        id: "001",
        title: "Initial",
        summary: "Initial Summary",
        callbacks: [],
      },
    };
    stepNodeMock.stepManager = stepManagerMock;
    step = new Step(stepNodeMock);
  });

  test("constructor initializes step correctly", () => {
    expect(step.id).toBe("001");
    expect(step.title).toBe("Initial");
    expect(step.summary).toBe("Initial Summary");
    expect(step.callbacks).toEqual([]);
    expect(step.stepNode).toBe(stepNodeMock);
    expect(step.stepManager).toBe(stepManagerMock);
    expect(stepManagerMock.registerInstance).toHaveBeenCalledWith(step);
  });

  test("updateTitle should update title and inform step manager", () => {
    jest.spyOn(step, "informStepManager");
    step.updateTitle("Updated Title");
    expect(step.title).toBe("Updated Title");
    expect(step.informStepManager).toHaveBeenCalled();
  });

  test("addCallback should add a callback and inform step manager", () => {
    const callback = new MockCallback();
    jest.spyOn(step, "informStepManager");
    step.addCallback(callback);
    expect(step.callbacks).toContain(callback);
    expect(step.informStepManager).toHaveBeenCalled();
  });

  test("removeCallback should remove a callback and inform step manager", () => {
    const callback = new MockCallback();
    step.addCallback(callback);
    jest.spyOn(step, "informStepManager");
    const result = step.removeCallback(callback);
    expect(result).toBe(true);
    expect(step.callbacks).not.toContain(callback);
    expect(step.informStepManager).toHaveBeenCalled();
  });

  test("updateSummary should update summary and inform step manager", () => {
    jest.spyOn(step, "informStepManager");
    step.updateSummary("Updated Summary");
    expect(step.summary).toBe("Updated Summary");
    expect(step.informStepManager).toHaveBeenCalled();
  });
});
