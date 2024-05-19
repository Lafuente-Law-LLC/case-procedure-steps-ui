import React, { useRef } from "react";
import { Step } from "../../models/step/step";
import type { SetCollapseOpen, CollapseOpen } from "./StepItem";
import { StepItemHeadDragProps } from "../features/dragging";
import StepItemModal from "./StepItemModal";
import { stepValidator } from "../../validator/validators";
import StepItemCol from "./StepItemCol";
import { IoTriangleSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

export type StepItemHeadProps = {
  step: Step;
  setCollapseOpen: SetCollapseOpen;
  collapseOpen: CollapseOpen;
};

const CSS_CLASSES = {
  main: "step-item-head",
  modalContainer: "modal-container", 
};


const stepCanBeRemoved = (step: Step) => {
  return step.steps.length === 0;
}


const StepItemHead: React.FC<StepItemHeadProps> = ({
  step,
  setCollapseOpen,
  collapseOpen,
}) => {
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
      <StepItemCol
        className={"left-corner"}
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
            className={validator.errorInField("title") ? "error" : ""}
            value={step.title}
            onChange={(e) => {
              step.updateTitle(e.target.value);
            }}
          ></input>
          <span className="error-message flex-grow-4">
            {validator.findErrorMessageForField("title")}
          </span>
        </>
      </StepItemCol>
      <StepItemCol header="Summary" className="summary">
        <>
          <textarea
            value={step.summary}
            className={validator.errorInField("summary") ? "error" : ""}
            onChange={(e) => {
              step.updateSummary(e.target.value);
            }}
          ></textarea>
          <span className="error-message flex-grow-4">
            {validator.findErrorMessageForField("summary")}
          </span>
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
        <span>{`sub-steps: ${step.steps.length}`}</span>
        <span>{`callbacks: ${step.callbacks.length}`}</span>
        {(stepCanBeRemoved(step)) && (
          <div>
            <AiFillDelete
              size={18}
              className={"garbage-can"}
              onClick={removeStepOnClick}
            ></AiFillDelete>
          </div>
        )}
      </StepItemCol>
    </div>
  );
};

export default StepItemHead;
