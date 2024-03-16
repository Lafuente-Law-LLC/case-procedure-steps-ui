import React from "react";
import { Step } from "../../step/step";
import { EditText} from "react-edit-text";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { ArrowRight } from "react-bootstrap-icons";
import { DragItemModal } from "./DragItemModal";
import { removeClassesFromElements } from "./helpers/dragItemUtil";

type DragItemHeadOptions = {
  step: Step;
};

export const DragItemHead = ({ step }: DragItemHeadOptions) => {
  const { title } = step;
  const addStep = () => {
    step.addNewStep();
  };
  const removeStep = () => {
    step.remove();
  };

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
    removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
  };

  const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      removeClassesFromElements(["drag-over"]);
      const currentTarget = e.currentTarget;
      if (currentTarget.classList.contains("drag__item__head"))
        e.stopPropagation();
      currentTarget.classList.add("drag-over");
    } catch (e) {
      return;
    }
  };

  const onChangeTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    step.updateTitle(value);
  };

  return (
    <div
      className="drag__item__head"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      data-step-id={step.id}
    >
      <div
        className="head__start collapse"
        data-bs-toggle={"collapse"}
        data-bs-target={`#body_${step.id}`}
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
          <IoMdRemoveCircle className="remove-icon" onClick={removeStep} />
        </div>
      </div>
    </div>
  );
};
