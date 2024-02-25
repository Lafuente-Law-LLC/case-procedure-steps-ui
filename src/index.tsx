import React, { useState } from "react";
import ReactDOM from "react-dom";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import { Step } from "./step/step";
import RootNodeStep from "./step/rootNodeStep";
import "./css/styles.scss";
import { DragItem } from "./components/DragItem";
import StepManager from "./step/stepManager";

const App: React.FC = () => {
  const rt = new RootNodeStep(sampleStep).rootStep as Step;
  const [steps, setSteps] = useState(rt.steps);
  StepManager.registerUpdateCallback(() => {
    console.log(rt.toJSON());
    setSteps(rt.steps);

  });

  useState;
  return (
    <div>
      <DragItem step={rt}></DragItem>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
