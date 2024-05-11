import { Step } from "../../../src/models/step/step";
import StepNode from "../../../src/models/step/stepNode";
import StepManager from "../../../src/models/step/stepManager";
import TreeModel from "tree-model";

describe("Step", () => {
  let step;
  let stepNode;
  let stepManager;
  let treeNode; 
  beforeEach(() => {
    treeNode = new TreeModel().parse({ id: "123", title: "Test Step" }); 
    stepNode = new StepNode(treeNode);
    stepManager = new StepManager();
    step = new Step(stepNode, stepManager);
  });

  test("should create a step with the correct title and ID", () => {
    expect(step.id).toBe("123");
    expect(step.title).toBe("Test Step");
  });

  test("should update the title and inform the step manager", () => {
    const mockCallback = jest.fn();
    stepManager.registerUpdateCallback(mockCallback);
    step.updateTitle("Updated Title");
    expect(step.title).toBe("Updated Title");
    expect(mockCallback).toHaveBeenCalled();
  });

  test("should add and remove callbacks correctly", () => {
    const callback = { id: "cb1", update: jest.fn() };
    step.addCallback(callback);
    expect(step.callbacks.includes(callback)).toBeTruthy();

    step.removeCallback(callback);
    expect(step.callbacks.includes(callback)).toBeFalsy();
  });
});
