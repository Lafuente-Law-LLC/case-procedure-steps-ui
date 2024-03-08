import React from "react";
import { CallbackObj } from "../../types";
import { Table } from "react-bootstrap";
interface CallbackTableProps {
  callbacks: CallbackObj[];
}



const extractKeyValues = (obj: any) => {
  const keyValues = [] as any;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keyValues.push({ label: key, value: obj[key] });
    }
  }
  return keyValues;
};

const CallbackTable: React.FC<CallbackTableProps> = ({ callbacks }) => {
  const [editMode, setEditMode] = React.useState(false);

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
