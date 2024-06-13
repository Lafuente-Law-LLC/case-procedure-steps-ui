import React from "react";
import { Step } from "../../models/step/step";
export type StepItemBodyProps = {
    step: Step;
    collapseOpen: boolean;
};
declare const StepItemBody: React.FC<StepItemBodyProps>;
export default StepItemBody;
