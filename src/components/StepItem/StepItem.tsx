import React, { useState } from "react";
import { Step } from "../../models/step/step";
import StepItemHead from "./StepItemHead";
import StepItemBody from "./StepItemBody";
const CSS_CLASSES = {
  MAIN: "step-item",
};

export type CollapseOpen = boolean;
export type SetCollapseOpen = React.Dispatch<React.SetStateAction<boolean>>;

const StepItem: React.FC<{ step: Step }> = ({ step }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  return (
    <div className={CSS_CLASSES.MAIN}>
      <StepItemHead
        collapseOpen={collapseOpen}
        setCollapseOpen={setCollapseOpen}
        step={step}
      />
      <StepItemBody collapseOpen={collapseOpen} step={step} />
    </div>
  );
};

export default StepItem;
