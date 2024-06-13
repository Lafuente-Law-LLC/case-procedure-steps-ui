import React from "react";
import { CaseProcedureStep } from "./config/ConfigSetup";
import { CallbackConfig } from "./models/callback/callbackController";
type AppsProps = {
    title: string;
    description: string;
    initialData: any;
    onSubmitFunction: (caseProcedureStep: CaseProcedureStep) => void;
    callbackConfigs?: CallbackConfig[];
};
declare const CaseProcedureApp: ({ title, description, initialData, onSubmitFunction, callbackConfigs }: AppsProps) => React.JSX.Element;
export default CaseProcedureApp;
