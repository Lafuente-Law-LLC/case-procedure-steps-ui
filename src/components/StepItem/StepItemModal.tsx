import React, { useState } from "react";
import { Step } from "../../models/step/step";
import { Modal } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import CallbacksTable from "../CallbacksTable/CallbacksTable";

const CSS_CLASSES = {
  MAIN: "step-item-modal",
  button: "three-dots-vertical",
};

const StepItemModal: React.FC<{ step: Step }> = ({ step }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={CSS_CLASSES.MAIN}>
      <ThreeDotsVertical
        size={15}
        className={CSS_CLASSES.button}
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton={true}>
          <Modal.Title as="div" className="h5">
            {step.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CallbacksTable step={step} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StepItemModal;
