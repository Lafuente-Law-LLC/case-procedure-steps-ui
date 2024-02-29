import React, { useState } from "react";
import ReactDOM from "react-dom";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import { Step } from "./step/step";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/styles.scss";
import { DragItem } from "./components/DragItem";


const App: React.FC = () => {
  const constructorRt = new RootStepConstructor(sampleStep);
  const rt = constructorRt.rootStep;
  const [steps, setSteps] = useState(rt.steps);
  constructorRt.registerUpdateCallback(() => {
    
    setSteps(rt.steps);
  });

  return steps.map((step) => <DragItem step={step} key={step.id}></DragItem>);
};

ReactDOM.render(<App></App>, document.getElementById("root"));