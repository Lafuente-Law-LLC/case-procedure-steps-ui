import React from "react";
import RootStepConstructor from "./models/step/rootStepConstructor";
import ConfigSetup, { CaseProcedureStep } from "./config/ConfigSetup";




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
    <ConfigSetup
      title={title}
      description={description}
      rootStepConstructor={constructorRt}
      onSubmitFunction={onSubmitFunction}
    />
  );
};

export default CaseProcedureApp;