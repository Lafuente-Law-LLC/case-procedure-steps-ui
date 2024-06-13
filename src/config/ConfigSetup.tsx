import React, { useState } from "react";
import RootStepConstructor from "../models/step/rootStepConstructor";
import StepItemContainer from "../components/StepItem/StepItemContainer";
import { Step } from "../models/step/step";
import { CallbackConfig } from "../models/callback/callbackController";
import CallbackController from "../models/callback/callbackController";

export type CaseProcedureStep = {
  title: string;
  description: string;
  rootStep: Step;
};

type ConfigProps = {
  title: string;
  description: string;
  rootStepConstructor: RootStepConstructor;
  onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
  callbackConfigs?: CallbackConfig[];
};

const setupCallbackController = (callbackConfigs: CallbackConfig[]) => {
  callbackConfigs.forEach((config) => {
    CallbackController.registerCallbackConfig(config);
  });
};

const ConfigSetup = ({
  title,
  description,
  rootStepConstructor,
  onSubmitFunction,
  callbackConfigs,
}: ConfigProps) => {
  if (callbackConfigs) {
    setupCallbackController(callbackConfigs);
  }
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const rootStep = rootStepConstructor.rootStep;
  if (!rootStep) {
    throw new Error("Root step is undefined");
  }

  const [steps, setSteps] = useState(rootStep.steps);
  rootStepConstructor.registerUpdateCallback(() => {
    setSteps(rootStep.steps);
  });

  return (
    <div className="main-container">
      <div className="top-row">
        <div className="col-1">
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="title"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <div className="form-group">
            <label>Steps Template</label>
          </div>
          <StepsTemplateContainer
            steps={steps}
            addStep={() => rootStep.addNewStep()}
          />
        </div>
      </div>
      <div className="bottom-row" style={{ maxHeight: "1vh" }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            onSubmitFunction({
              title: newTitle,
              description: newDescription,
              rootStep: rootStep.toJSON(),
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const StepsTemplateContainer = ({
  steps,
  addStep,
}: {
  steps: Step[];
  addStep: () => void;
}) => {
  return (
    <StepItemContainer steps={steps}>
      <button className={"btn btn-primary mt-3 "} onClick={addStep}>
        Add
      </button>
    </StepItemContainer>
  );
};

export default ConfigSetup;
