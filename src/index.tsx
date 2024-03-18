import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/main.scss";
import { DragItem } from "./components/DragItem/DragItem";
import {
  removeClassesFromElements, 
} from "./components/DragItem/helpers/dragItemUtil";
import { Step } from "./step/step";
const App: React.FC = ({ rootStep }: { rootStep: Step }) => {
  const [steps, setSteps] = useState(rootStep.steps);

  constructorRt.registerUpdateCallback(() => {
    setSteps(rootStep.steps);
  });
  const addStep = () => {
    rootStep.addNewStep();
  };

  useEffect(() => {
    debugger;
    removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
  }, [
    document.querySelectorAll<HTMLElement>(`.dragging`),
    document.querySelectorAll<HTMLElement>(`.drag-over`),
    document.querySelectorAll<HTMLElement>(`.above`),
    document.querySelectorAll<HTMLElement>(`.below`),
  ]);
  return (
    <>
      <div className="container pt-4 border border-dark window">
        {steps.map((step) => (
          <DragItem step={step} key={step.id}></DragItem>
        ))}
      </div>
      <button className={"mui-button"} onClick={addStep}>
        Add
      </button>
    </>
  );
};

const constructorRt = new RootStepConstructor(sampleStep);
const rt = constructorRt.rootStep;

const root = createRoot(document.getElementById("root"));

root.render(<App rootStep={rt} />);
