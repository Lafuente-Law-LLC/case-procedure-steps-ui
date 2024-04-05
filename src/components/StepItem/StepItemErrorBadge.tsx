import React from "react";
import { Badge } from "react-bootstrap";
import type { ValidationObject } from "../../types";

const CSS_CLASSES = {
  MAIN: "error-badge",
};

const StepItemErrorBadge: React.FC<ValidationObject> = ({ valid, message }) => {
  return (
    !valid && (
      <Badge bg="danger" className={CSS_CLASSES.MAIN}>
        <div className="text">{"invalid"}</div>
      </Badge>
    )
  );
};

export default StepItemErrorBadge;
