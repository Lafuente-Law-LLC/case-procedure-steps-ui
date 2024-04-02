import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Step } from "../../models/step/step";
import CallbackAdditionButton from "../Callbacks/Table/CallbacksTable/CallbacksTableComponents/BelowTable/CallbackAdditionButton";
import CallbackFactory from "../../models/callback/callbackFactory";
import CallbacksTableContext from "./CallbacksTableContext";
import TableRow from "./TableRow";
type CallbacksTableProps = {
  step: Step;
};

const CallbacksTable = ({ step }: CallbacksTableProps) => {
  const [editMode, setEditMode] = useState(true);

  return (
    <CallbacksTableContext.Provider value={{ step }}>
      <div>
         <Form.Check
          type="switch"
          label="Edit Mode"
          onChange={(e) => setEditMode(e.target.checked)}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Function Name</th>
              <th>Args</th>
            </tr>
          </thead>
          <tbody>
            {step.callbacks.map((callback, index) => (
              <TableRow key={index} callback={callback} editMode={editMode} />
            ))}
          </tbody>
        </Table>
        <CallbackAdditionButton>
          <Button
            variant="primary"
            onClick={(e) => {
              step.addCallback(CallbackFactory.createCallback("create_task"));
            }}
          >
            Add Task Based
          </Button>
        </CallbackAdditionButton>
      </div>
    </CallbacksTableContext.Provider>
  );
};

export default CallbacksTable;
