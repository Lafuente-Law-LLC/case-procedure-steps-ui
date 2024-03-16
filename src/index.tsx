import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/main.scss";
import { DragItem } from "./components/DragItem/DragItem";
import { removeClassesFromElements } from "./components/DragItem/helpers/dragItemUtil";

const App: React.FC = () => {
  const constructorRt = new RootStepConstructor(sampleStep);
  const rt = constructorRt.rootStep;
  const [steps, setSteps] = useState(rt.steps);

  const addStep = () => {
    rt?.addNewStep();
  };

  constructorRt.registerUpdateCallback(() => {
    setSteps((prev) =>
      [...prev, ...rt.steps].filter(
        (step, index, self) =>
          self.findIndex((s) => s.id === step.id) === index,
      ),
    );
  });

  useEffect(() => {
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

ReactDOM.render(<App></App>, document.getElementById("root"));
