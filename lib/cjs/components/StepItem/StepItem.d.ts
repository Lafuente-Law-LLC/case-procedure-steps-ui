import React from "react";
import { Step } from "../../models/step/step";
export type CollapseOpen = boolean;
export type SetCollapseOpen = React.Dispatch<React.SetStateAction<boolean>>;
declare const StepItem: React.FC<{
    step: Step;
}>;
export default StepItem;
