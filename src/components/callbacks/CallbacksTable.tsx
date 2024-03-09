import React, { useReducer } from "react";
import { Table } from "react-bootstrap";
import { Step } from "../../step/step";

const CallbacksTable = ({ step }: { step: Step }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>On</th>
          <th>Run</th>
          <th>With Args</th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  );
};

export default CallbacksTable;
