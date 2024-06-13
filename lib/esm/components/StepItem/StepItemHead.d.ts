import React from "react";
import { Step } from "../../models/step/step";
import type { SetCollapseOpen, CollapseOpen } from "./StepItem";
export type StepItemHeadProps = {
    step: Step;
    setCollapseOpen: SetCollapseOpen;
    collapseOpen: CollapseOpen;
};
declare const StepItemHead: React.FC<StepItemHeadProps>;
export default StepItemHead;
