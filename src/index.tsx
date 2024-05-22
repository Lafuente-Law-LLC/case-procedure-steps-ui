import React from "react";
import { createRoot } from "react-dom/client";
import sampleStep from "../ignore/rootStep";
import RootStepConstructor from "./models/step/rootStepConstructor";

import Config, { CaseProcedureStep } from "./config/Config";

type AppsProps = {
  title: string;
  description: string;
  initialData: any;
  onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
};

const CaseProcedureApp = ({
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
if (element) {
  const root = createRoot(element);
  root.render(
    <CaseProcedureApp
      title=""
      description=""
      initialData={{}}
      onSubmitFunction={(caseProcedureStep) => {
        console.log(caseProcedureStep);
      }}
    ></CaseProcedureApp>,
  );
}

// root.render(
//   <App
//     title=""
//     description=""
//     initialData={sampleStep}
//     onSubmitFunction={(caseProcedureStep) => {
//       console.log(caseProcedureStep);
//     }}
//   />,
// );
export default CaseProcedureApp;
export const runnie = () => {
  console.log("runnie");
}

