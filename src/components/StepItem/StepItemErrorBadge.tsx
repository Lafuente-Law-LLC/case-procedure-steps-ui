import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import type { ValidationObject } from "../../types";
import usePopper from "../hooks/usePopper";

const CSS_CLASSES = {
  MAIN: "error-badge",
};

const menuItemStyle = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  padding: "5px",
  borderRadius: "5px",
};

const StepItemErrorBadge: React.FC<ValidationObject> = ({ valid, message }) => {
  const { popperProps } = usePopper();

  return (
    !valid && (
      <Badge
        {...popperProps.referenceProps}
        bg="danger"
        className={CSS_CLASSES.MAIN}
      >
        <div className="text">{"invalid"}</div>
        {popperProps.isOpen && (
          <div className="popper-dialog" {...popperProps.floatingProps} >
            {message}
          </div>
        )}
      </Badge>
    )
  );
};

export default StepItemErrorBadge;