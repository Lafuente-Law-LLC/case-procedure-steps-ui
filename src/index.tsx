import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/main.scss";
import DragItemContainer from "./components/DragItem/DragItemContainer";
import { Step } from "./step/step";




interface AppProps {
  rootStep: Step;
}

const App: React.FC<AppProps> = ({ rootStep }: { rootStep: Step }) => {
  const [steps, setSteps] = useState(rootStep.steps);

  constructorRt.registerUpdateCallback(() => {
    setSteps(rootStep.steps);
  });
  const addStep = () => {
    rootStep.addNewStep();
  };

  return (
    <DragItemContainer steps={steps} options={{}}>
      <button className={"mui-button"} onClick={addStep}>
        Add
      </button>
    </DragItemContainer>
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
