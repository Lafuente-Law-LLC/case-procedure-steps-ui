import React from "react";
import { Step } from "../../models/step/step";
type StepItemContainerProps = {
    steps: Step[];
    children?: React.ReactNode;
};
declare const StepItemContainer: React.FC<StepItemContainerProps>;
export default StepItemContainer;
