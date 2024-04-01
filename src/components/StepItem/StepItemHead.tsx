import React, { useRef } from "react";
import { Step } from "../../models/step/step";
import { EditText } from "react-edit-text";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { ArrowRight } from "react-bootstrap-icons";
import type { SetCollapseOpen, CollapseOpen } from "./StepItem";
import { DragItemModal } from "../DragItem/DragItemModal";
import type { ReactClickHandler } from "../../types";
import { StepItemHeadDragProps } from "../features/dragging";
import StepItemModal from "./StepItemModal";
export type StepItemHeadProps = {
  step: Step;
  setCollapseOpen: SetCollapseOpen;
  collapseOpen: boolean;
};

const CSS_CLASSES = {
  MAIN: "step-item-head",
  START: "start",
  CENTER: "center",
  END: "end",
};

const ItemHeadStart = ({
  collapseOpen,
  onClickHandler,
}: {
  collapseOpen: CollapseOpen;
  onClickHandler: ReactClickHandler;
}) => {
  return (
    <div
      className={CSS_CLASSES.START}
      onClick={onClickHandler}
      aria-expanded={collapseOpen}
    >
      <ArrowRight className={"arrow-right"} />
    </div>
  );
};

const ItemHeadCenter = ({
  title,
  onChangeTitleHandler,
  subStepAndCallbackCounter,
}: {
  title: string;
  onChangeTitleHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  subStepAndCallbackCounter: string;
}) => {
  return (
    <div className={CSS_CLASSES.CENTER}>
      <EditText value={title} onChange={onChangeTitleHandler}></EditText>
      <div className={"meta-data"}>{subStepAndCallbackCounter} </div>
    </div>
  );
};

const ItemHeadEnd = ({
  step,
  stepHasChildren,
  addStep,
  removeStep,
}: {
  step: Step;
  stepHasChildren: boolean;
  addStep: ReactClickHandler;
  removeStep: ReactClickHandler;
}) => {
  return (
    <div className={CSS_CLASSES.END}>
      <div className="modal-container">
        <StepItemModal step={step} />
      </div>
      <div className="button-group">
        <IoMdAddCircle className="add-icon" onClick={addStep} />
        {stepHasChildren && (
          <IoMdRemoveCircle className="remove-icon" onClick={removeStep} />
        )}
      </div>
    </div>
  );
};

const StepItemHead: React.FC<StepItemHeadProps> = ({
  step,
  setCollapseOpen,
  collapseOpen,
}) => {
  const showSubStepsAndCallbacks = (step: Step) => {
    return `sub-steps: ${step.steps.length} | callbacks: ${step.callbacks.length || 0}`;
  };

  const addStepOnClick = () => {
    if (!collapseOpen) setCollapseOpen(true);
    step.addNewStep();
  };
  const removeStepOnClick = () => {
    step.remove();
  };

  const refElement = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={refElement}
      className={CSS_CLASSES.MAIN}
      data-step-id={step.id}
      {...StepItemHeadDragProps(refElement)}
    >
      <ItemHeadStart
        collapseOpen={collapseOpen}
        onClickHandler={() => setCollapseOpen((prev) => !prev)}
      />
      <ItemHeadCenter
        title={step.title}
        onChangeTitleHandler={(e) => {
          step.updateTitle(e.target.value);
        }}
        subStepAndCallbackCounter={showSubStepsAndCallbacks(step)}
      />
      <ItemHeadEnd
        step={step}
        stepHasChildren={step.steps.length > 0}
        addStep={addStepOnClick}
        removeStep={removeStepOnClick}
      />
    </div>
  );
};

export default StepItemHead;
