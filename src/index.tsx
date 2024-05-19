import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./models/step/rootStepConstructor";
import "./css/main.scss";
import StepItemContainer from "./components/StepItem/StepItemContainer";
import { Step } from "./models/step/step";
import { runConfig } from "./config/config";
runConfig();

type AppsProps = {
  title: string;
  description: string;
  rootStepConstructor: RootStepConstructor;
};

const App = ({
  title = "",
  description = "",
  rootStepConstructor,
}: AppsProps) => {
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
    <div className="main-app">
      <div className="top">
        <div className="group-1">
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
        <div className="group-2">
          <div className="form-group">
            <label>Steps Template</label>
          </div>
          <StepsTemplateContainer
            steps={steps}
            addStep={() => rootStep.addNewStep()}
          />
        </div>
      </div>
      <div className="bottom">
        <button className="btn btn-primary">Submit</button>
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
      <button className={"mui-button"} onClick={addStep}>
        Add
      </button>
    </StepItemContainer>
  );
};

const element = document.getElementById("root");
if (!element) {
  throw new Error("No root element found");
}

const root = createRoot(element);

const constructorRt = new RootStepConstructor(sampleStep);

root.render(
  <App title="" description="" rootStepConstructor={constructorRt} />,
);
export default App;
