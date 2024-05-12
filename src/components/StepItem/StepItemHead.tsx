import React, { useRef } from "react";
import { Step } from "../../models/step/step";
import { EditText } from "react-edit-text";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { ArrowRight } from "react-bootstrap-icons";
import type { SetCollapseOpen, CollapseOpen } from "./StepItem";
import type { ReactClickHandler } from "../../types";
import { StepItemHeadDragProps } from "../features/dragging";
import StepItemModal from "./StepItemModal";
import type { ValidationObject } from "../../types";
import { stepValidator } from "../../validator/validators";
import StepItemErrorBadge from "./StepItemErrorBadge";


export type StepItemHeadProps = {
  step: Step;
  setCollapseOpen: SetCollapseOpen;
  collapseOpen: boolean;
};

const CSS_CLASSES = {
  main: "step-item-head",
  start: "start",
  center: "center",
  end: "end",
  arrowRight: "arrow-right",
  metaData: "meta-data",
  modalContainer: "modal-container",
  buttonGroup: "button-group",
  addIcon: "add-icon",
  removeIcon: "remove-icon",
};

const ItemHeadStart = ({
  collapseOpen,
  onClickHandler,
  validationObject,
}: {
  collapseOpen: CollapseOpen;
  onClickHandler: ReactClickHandler;
  validationObject: ValidationObject;
}) => {
  return (
    <div
      className={CSS_CLASSES.start}
      onClick={onClickHandler}
      aria-expanded={collapseOpen}
    >
      <StepItemErrorBadge {...validationObject} />
      <ArrowRight className={CSS_CLASSES.arrowRight} />
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
    <div className={CSS_CLASSES.center}>
      <EditText value={title} onChange={onChangeTitleHandler}></EditText>
      <div className={CSS_CLASSES.metaData}>{subStepAndCallbackCounter} </div>
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
    <div className={CSS_CLASSES.end}>
      <div className={CSS_CLASSES.modalContainer}>
        <StepItemModal step={step} />
      </div>
      <div className={CSS_CLASSES.buttonGroup}>
        <IoMdAddCircle className={CSS_CLASSES.addIcon} onClick={addStep} />
        {!stepHasChildren && (
          <IoMdRemoveCircle
            className={CSS_CLASSES.removeIcon}
            onClick={removeStep}
          />
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
  const validator = stepValidator(step);
  return (
    <div
      ref={refElement}
      className={CSS_CLASSES.main}
      data-step-id={step.id}
      {...StepItemHeadDragProps(refElement)}
    >
      <ItemHeadStart
        validationObject={validator.validate()}
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
