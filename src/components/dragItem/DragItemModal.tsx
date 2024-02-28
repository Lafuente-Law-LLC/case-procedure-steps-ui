import React, { useState } from "react";
import { Step } from "../../step/step";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import {EditText, EditTextarea} from "react-edit-text";
type DragItemOptions = {
  step: Step;
};

const ModalBody = ({ step }: DragItemOptions) => {
  const changeSummary = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    step.updateSummary(value);
  }
  return (
    <Tabs defaultActiveKey="summary" id="uncontrolled-tab-example">
      <Tab eventKey="summary" title="Summary">
        <div className="container mt-3">
          <EditTextarea value={step.summary} onChange={changeSummary}></EditTextarea>
        </div>
      </Tab>
      <Tab eventKey="callbacks" title="Callbacks">
        <div className="container">
          <pre>{step.callbacks && JSON.stringify(step.callbacks)}</pre>
        </div>
      </Tab>
    </Tabs>
  );
};

export const DragItemModal = ({ step }: DragItemOptions) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ThreeDotsVertical className="three-dots-vertical" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{step.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBody step={step}></ModalBody>
        </Modal.Body>
      </Modal>
    </>
  );
};
