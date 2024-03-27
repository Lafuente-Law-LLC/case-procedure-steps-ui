import React from "react";
import { Step } from "../../models/step/step";
import { EditText } from "react-edit-text";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { ArrowRight } from "react-bootstrap-icons";
import { DragItemModal } from "./DragItemModal";



export type DragItemHeadOptions = {
  step: Step;
  setCollapseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapseOpen: boolean;
};





export const DragItemHead = ({
  step,
  setCollapseOpen,
  collapseOpen,
}: DragItemHeadOptions) => {
  const { title } = step;
  const hasChildrenSteps = step.steps.length > 0;

  const addStep = () => {
    if (!collapseOpen) setCollapseOpen(true);
    step.addNewStep();
  };
  const removeStep = () => {
    step.remove();
  };

  const onChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    step.updateTitle(value);
  };

  return (
    <div
      className={`drag__item__head ${isValid ? "" : "invalid"}`}
      data-step-id={step.id}
    >
      <div
        className="head__start"
        aria-expanded={collapseOpen}
        onClick={() => setCollapseOpen((prev) => !prev)}
      >
        <ArrowRight className="arrow-right" />
      </div>
      <div className="head__middle">
        <EditText value={title} onChange={onChangeTitle}></EditText>
        <div className="meta-data">{`sub-steps: ${step.steps.length} | callbacks: ${step.callbacks.length || 0}`}</div>
      </div>
      <div className="head__end">
        <div className="modal-container">
          <DragItemModal step={step}></DragItemModal>
        </div>

        <div className="button-group">
          <IoMdAddCircle className="add-icon" onClick={addStep} />
          {!hasChildrenSteps && (
            <IoMdRemoveCircle className="remove-icon" onClick={removeStep} />
          )}
        </div>
      </div>
    </div>
  );
};
