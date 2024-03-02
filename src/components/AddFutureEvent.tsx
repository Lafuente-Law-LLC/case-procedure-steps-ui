import React from "react";
import { LabelRow } from "./dragItem/DragItemModal";
import { Form } from "react-bootstrap";
const AddFutureEvent = () => {
  return (
    <tr>
      <td>{"create_future_event"}</td>
      <td>
        <Form.Select>
          <option>After Create</option>
          <option>After Completion</option>
        </Form.Select>
      </td>
      <td>
      <LabelRow label={"Days"} value={"10"} />
      <LabelRow label={"Title"} value={"This is the Title"} />
      <LabelRow label={"Summary"} value={"This is the Summary"} />
      </td>
    </tr>
  );
};

export default AddFutureEvent;
