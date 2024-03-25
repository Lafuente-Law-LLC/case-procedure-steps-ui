import React, { useState } from "react";
import { Step } from "../../step/step";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { EditTextarea } from "react-edit-text";
import CallbacksTable from "../Callbacks/Table/CallbacksTable";

const ModalBody = ({ step }: { step: Step }) => {
  const changeSummary = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    step.updateSummary(event.target.value);
  };
  return (
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
  );
};

export const DragItemModal = ({ step }: { step: Step }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="drag-item-modal">
      <ThreeDotsVertical className="three-dots-vertical" onClick={handleShow} />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton={true}>
          <Modal.Title as="div" className="h5" >{step.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBody step={step}></ModalBody>
        </Modal.Body>
      </Modal>
    </div>
  );
};
