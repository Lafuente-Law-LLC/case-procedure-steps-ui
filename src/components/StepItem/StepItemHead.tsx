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
import StepItemCol from "./StepItemCol";

import { IoTriangleSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

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
  const TopCorner = () => {
    return <></>;
  };
  return (
    <div
      ref={refElement}
      className={CSS_CLASSES.main}
      data-step-id={step.id}
      {...StepItemHeadDragProps(refElement)}
    >
      <StepItemCol
        className={"triangle-col left-corner"}
        header={
          <IoTriangleSharp
            className={`triangle ${collapseOpen ? "open" : ""}`}
            size={12}
            onClick={() => setCollapseOpen((prev) => !prev)}
          ></IoTriangleSharp>
        }
      >
        {}
      </StepItemCol>

      <StepItemCol header="Title" className="title">
        <>
          <input
            type="text"
            value={step.title}
            onChange={(e) => {
              step.updateTitle(e.target.value);
            }}
          ></input>
        </>
      </StepItemCol>
      <StepItemCol header="Summary" className="summary">
        <>
          <textarea
            value={step.summary}
            onChange={(e) => {
              step.updateSummary(e.target.value);
            }}
          ></textarea>
        </>
      </StepItemCol>
      <StepItemCol
        className={"right-corner"}
        header={
          <div className={"right"}>
            <StepItemModal step={step}></StepItemModal>
            <button className="cross-button" onClick={addStepOnClick}></button>
          </div>
        }
      >
        <div>{showSubStepsAndCallbacks(step)}</div>
        {!(step.steps.length > 0) && (
          <div>
            <AiFillDelete onClick={removeStepOnClick}></AiFillDelete>
          </div>
        )}
      </StepItemCol>
    </div>
  );
};

export default StepItemHead;
