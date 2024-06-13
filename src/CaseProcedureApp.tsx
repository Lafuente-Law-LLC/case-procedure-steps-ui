import React from "react";
import RootStepConstructor from "./models/step/rootStepConstructor";
import ConfigSetup, { CaseProcedureStep } from "./config/ConfigSetup";
import { CallbackConfig } from "./models/callback/callbackController";


type AppsProps = {
  title: string;
  description: string;
  initialData: any;
  onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
  callbackConfigs?: CallbackConfig[]; 
};

const CaseProcedureApp = ({
  title,
  description,
  initialData,
  onSubmitFunction,
  callbackConfigs
}: AppsProps) => {
  const constructorRt = new RootStepConstructor(initialData);

  return (
    <ConfigSetup
      title={title}
      description={description}
      rootStepConstructor={constructorRt}
      onSubmitFunction={onSubmitFunction}
      callbackConfigs={callbackConfigs}
    />
  );
};

export default CaseProcedureApp;
