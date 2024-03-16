import React, { useState } from "react";
import ReactDOM from "react-dom";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import { Step } from "./step/step";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/main.scss";
import { DragItem } from "./components/DragItem/DragItem";

const App: React.FC = () => {
  const constructorRt = new RootStepConstructor(sampleStep);
  const rt = constructorRt.rootStep;
  const [steps, setSteps] = useState(rt.steps);
  constructorRt.registerUpdateCallback(() => {
    setSteps(rt.steps);
  });
  const addStep = () => {
    rt.addNewStep();
  };
  return (
    <>
      <div className="container pt-4 border border-dark window">
        {steps.map((step) => (
          <DragItem step={step} key={step.id}></DragItem>
        ))}
      </div>
      <button onClick={addStep}>Add</button>
    </>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
