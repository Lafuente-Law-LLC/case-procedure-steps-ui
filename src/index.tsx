import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import RootStepConstructor from "./step/rootStepConstructor";
import "./css/main.scss";
import { DragItem } from "./components/DragItem/DragItem";
import { removeClassesFromElements } from "./components/DragItem/helpers/dragItemUtil";
import { Step } from "./step/step";

import { v4 } from "uuid";
import {
  eventCallbackValidator,
  taskCallbackValidator,
} from "./validator/validators";
import Callback from "./callback/callback";

const eventCallbackManagementObj = {
  createFn: () => ({
    id: v4(),
    event: "",
    function: "create_future_event",
    args: {
      title: "",
      summary: "",
      days: 0,
    },
  }),
  type: "create_future_event", 
  validator: eventCallbackValidator,
};



const taskCallbackManagementObj = {
  createFn: () => ({
    id: v4(),
    event: "",
    function: "create_task",
    args: {
      title: "",
      summary: "",
    },
  }),
  type: "create_task",
  validator: taskCallbackValidator,
};

Callback.registerCallbackAdminObj(eventCallbackManagementObj);
Callback.registerCallbackAdminObj(taskCallbackManagementObj);



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


