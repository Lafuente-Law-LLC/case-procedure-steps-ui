import React, { useState } from "react";
import { Step } from "../../step/step";
import { Modal, ModalDialog, Tab, Table, Tabs } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { EditText, EditTextarea } from "react-edit-text";
import GhostAddButton from "../GhostAddButton";
import CallbacksTable from "../Callbacks/Table/CallbacksTable";
type DragItemOptions = {
  step: Step;
};

export const LabelRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="row">
      <div className="col-4 fw-semibold text-secondary">{label}</div>
      <div className="col-8">{value}</div>
    </div>
  );
};


const ModalBody = ({ step }: DragItemOptions) => {
  const changeSummary = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    step.updateSummary(value);
  };
  return (
    <Tabs defaultActiveKey="summary" id="uncontrolled-tab-example">
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

export const DragItemModal = ({ step }: DragItemOptions) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ThreeDotsVertical className="three-dots-vertical" onClick={handleShow} />
      <Modal show={show} onHide={handleClose} size="lg">
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
