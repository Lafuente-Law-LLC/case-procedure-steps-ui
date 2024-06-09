import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Step } from "../../models/step/step";
import CallbackAdditionButton from "./CallbackAdditionButton";
import CallbackController from "../../models/callback/callbackController";
import TableRow from "./TableRow";

type CallbacksTableProps = {
  step: Step;
};

const CSS_CLASSES = {
  MAIN: "callbacks-table-wrapper",
  MENU_ITEM: "menu-item",
};

const handleMenuBtnClick = (functionName: string, step: Step) => {
  step.addCallback(CallbackController.createPartialCallbackInstance(functionName));
};

const CallbacksTable = ({ step }: CallbacksTableProps) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <div className={CSS_CLASSES.MAIN}>
        <Form.Check
          type="switch"
          label="Edit Mode"
          onChange={(e) => setEditMode((prev) => !prev)}
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
              <TableRow
                step={step}
                key={index}
                callback={callback}
                editMode={editMode}
              />
            ))}
          </tbody>
        </Table>
      </div>
      <CallbackAdditionButton>
        <div
          className={CSS_CLASSES.MENU_ITEM}
          onClick={(e) => {
            handleMenuBtnClick("create_task", step);
          }}
        >
          Add Task Based
        </div>
        <div
          className={CSS_CLASSES.MENU_ITEM}
          onClick={(e) => {
            handleMenuBtnClick("create_event", step);
          }}
        >
          Add Event Based
        </div>
        <div
          className={CSS_CLASSES.MENU_ITEM}
          onClick={(e) => {
            handleMenuBtnClick("create_future_event", step);
          }}
        >
          Add Future Event Based
        </div>
      </CallbackAdditionButton>
    </>
  );
};

export default CallbacksTable;
