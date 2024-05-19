import React from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import RootStepConstructor from "./models/step/rootStepConstructor";
import "./css/main.scss";
import Config, { CaseProcedureStep } from "./config/Config";


type AppsProps = {
  title: string;
  description: string;
  initialData: any;
  onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
};

const App = ({
  title,
  description,
  initialData,
  onSubmitFunction,
}: AppsProps) => {
  const constructorRt = new RootStepConstructor(initialData);
  return (
    <Config
      title={title}
      description={description}
      rootStepConstructor={constructorRt}
      onSubmitFunction={onSubmitFunction}
    />
  );
};

const element = document.getElementById("root");
if (!element) {
  throw new Error("No root element found");
}

const root = createRoot(element);

root.render(
  <App
    title=""
    description=""
    initialData={sampleStep}
    onSubmitFunction={(caseProcedureStep) => {
      console.log(caseProcedureStep);
    }}
  />,
);
export default App;
