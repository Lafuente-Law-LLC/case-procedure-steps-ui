import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./models/step/rootStepConstructor";
import "./css/main.scss";
import StepItemContainer from "./components/StepItem/StepItemContainer";
import { Step } from "./models/step/step";

import type { FunctionArgsPair } from "./models/callback/funtionArgsPair";
import CallbackFactory from "./models/callback/callbackFactory";

interface AppProps {
  rootStep: Step;
}

const createFutureEvent: FunctionArgsPair = {
  name: "create_future_event",
  args: [
    { name: "title", type: "string", required: true, default: "New Title" },
    { name: "summary", type: "string", required: true, default: "New Summary" },
    { name: "days", type: "number", required: true, default: 0 },
  ],
};

const createTask: FunctionArgsPair = {
  name: "create_task",
  args: [
    { name: "title", type: "string", required: true, default: "New Title" },
    { name: "summary", type: "string", required: true, default: "New Summary" },
  ],
};

CallbackFactory.registerFunctionArgsPair(createFutureEvent);
CallbackFactory.registerFunctionArgsPair(createTask);
CallbackFactory.registerEventName("after_create");
CallbackFactory.registerEventName("complete");

const App: React.FC<AppProps> = ({ rootStep }: { rootStep: Step }) => {
  const [steps, setSteps] = useState(rootStep.steps);

  constructorRt.registerUpdateCallback(() => {
    setSteps(rootStep.steps);
  });
  const addStep = () => {
    rootStep.addNewStep();
  };

  return (
    <StepItemContainer steps={steps}>
      <button className={"mui-button"} onClick={addStep}>
        Add
      </button>
    </StepItemContainer>
  );
};

const constructorRt = new RootStepConstructor(sampleStep);
const rt = constructorRt.rootStep;

const element = document.getElementById("root");
if (!element) {
  throw new Error("No root element found");
}

const root = createRoot(element);
if (rt === undefined) {
  throw new Error("Root step is undefined");
}

root.render(<App rootStep={rt} />);
