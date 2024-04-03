import React, { useState } from "react";
import { Step } from "../../models/step/step";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { EditTextarea } from "react-edit-text";
import CallbacksTable from "../CallbacksTable/CallbacksTable";

const CSS_CLASSES = {
  MAIN: "step-item-modal",
  button: "three-dots-vertical",
};

const StepItemModal: React.FC<{ step: Step }> = ({ step }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeSummary = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    step.updateSummary(event.target.value);
  }
  return (
    <div className={CSS_CLASSES.MAIN}>
      <ThreeDotsVertical className={CSS_CLASSES.button} onClick={handleShow} />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton={true}>
          <Modal.Title as="div" className="h5">
            {step.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="summary">
            <Tab eventKey="summary" title="Summary">
              <div className="container mt-3">
                <EditTextarea
                  value={step.summary}
                  onChange={changeSummary}
                ></EditTextarea>
              </div>
            </Tab>
            <Tab eventKey="callbacks" title="Callbacks">
              <CallbacksTable step={step} /> 
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StepItemModal;
