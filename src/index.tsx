import React from "react";
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

export default CaseProcedureApp;
