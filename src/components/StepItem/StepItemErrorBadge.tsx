import React from "react";
import { Badge } from "react-bootstrap";
import type { FieldValidationObject } from "../../types";
import usePopper from "../hooks/usePopper";

const CSS_CLASSES = {
  MAIN: "error-badge",
};

const StepItemErrorBadge: React.FC<FieldValidationObject> = ({
  valid,
  message,
}) => {
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
          <div className="popper-dialog" {...popperProps.floatingProps}>
            {message}
          </div>
        )}
      </Badge>
    )
  );
};

export default StepItemErrorBadge;
