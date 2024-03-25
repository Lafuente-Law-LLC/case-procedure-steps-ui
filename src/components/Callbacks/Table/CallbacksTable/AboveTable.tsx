import React from "react";
import {Form } from "react-bootstrap";


const AboveTable = ({
    setEditMode,
  }: {
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <div className="above-table">
        <Form.Check
          type="switch"
          label="Edit Mode"
          onChange={(e) => setEditMode(e.target.checked)}
        />
      </div>
    );
  };
 
  export default AboveTable;