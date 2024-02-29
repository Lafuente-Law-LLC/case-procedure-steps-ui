import React, { useState } from "react";
import { Step } from "../../step/step";
import { Modal, Tab, Table, Tabs } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { EditText, EditTextarea } from "react-edit-text";
type DragItemOptions = {
  step: Step;
};

const WithArgs = ({ args }) => {
  const {title, summary} = args;
  return (
    <div className="input">
      {[title, summary].map((arg, index) => (
        <div className="input-group" key={index}>
          <div className="input-group-prepend"></div>
          <span className="input-group-text" id="basic-addon1">
            {arg}
          </span>
          <input className="form-control" type="text" value={arg} />
        </div>
      ))}
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
        <Table>
          <thead>
            <tr>
              <th>On</th>
              <th>Run</th>
              <th>With Args</th>
            </tr>
          </thead>
          <tbody>
            {step.callbacks &&
              step.callbacks.map((callback, index) => (
                <tr key={index}>
                  <td>{callback.on}</td>
                  <td>{callback.run}</td>
                  <td>
                    <WithArgs args={callback["with_args"]}></WithArgs>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
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
