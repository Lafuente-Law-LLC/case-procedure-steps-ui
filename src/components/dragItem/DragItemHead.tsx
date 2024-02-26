import React from "react";
import { Button } from "react-bootstrap";
import { Step } from "../../step/step";
import { ArrowRight } from "react-bootstrap-icons";
import { DragItemModal } from "./DragItemModal";
type DragItemHeadOptions = {
  step: Step;
};

export const DragItemHead = ({ step }: DragItemHeadOptions) => {
  const { title } = step;

  const addNewStep = () => {
    step.addNewStep()
  }
  const removeStep = () => {
    step.remove();
  }
  return (
    <div className="drag__item__head">
      <div
        className="head__start collapse"
        data-bs-toggle={"collapse"}
        data-bs-target={`#body_${step.id}`}
      >
        <ArrowRight className="arrow-right" />
      </div>
      <div className="head__middle">
        <div>{step.title}</div>
      </div>
      <div className="head__end">
        <DragItemModal step={step}></DragItemModal>
        <Button onClick={addNewStep}>Add</Button>
        <Button onClick={removeStep}>Delete</Button>
      </div>
    </div>
  );
};
