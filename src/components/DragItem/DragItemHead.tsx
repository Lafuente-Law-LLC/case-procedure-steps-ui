import React from "react";
import { Button } from "react-bootstrap";
import { Step } from "../../step/step";
import { EditText, EditTextarea } from "react-edit-text";

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
  }
  const removeStep = () => {
    step.remove()
  }

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      </div>
      <div className="head__end">
        <DragItemModal step={step}></DragItemModal>
        <div className="row pt-3">
          <div className="col fs-6" onClick={addStep}>Add</div>
          <div className="col fs-6" onClick={removeStep}>Delete</div>
        </div>
      </div>
    </div>
  );
};