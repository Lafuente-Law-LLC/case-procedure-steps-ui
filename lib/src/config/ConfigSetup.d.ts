import React from "react";
import RootStepConstructor from "../models/step/rootStepConstructor";
import { Step } from "../models/step/step";
import { CallbackConfig } from "../models/callback/callbackController";
export type CaseProcedureStep = {
    title: string;
    description: string;
    rootStep: Step;
};
type ConfigProps = {
    title: string;
    description: string;
    rootStepConstructor: RootStepConstructor;
    onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
    callbackConfigs?: CallbackConfig[];
};
declare const ConfigSetup: ({ title, description, rootStepConstructor, onSubmitFunction, callbackConfigs, }: ConfigProps) => React.JSX.Element;
export default ConfigSetup;
