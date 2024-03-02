import React, { useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import {
  useFloating,
  autoUpdate,
  useHover,
  useInteractions,
  offset,
  flip,
  safePolygon,
} from "@floating-ui/react";
const GhostAddButton = () => {
  const [isOpen, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    strategy: "absolute",
    open: isOpen,
    onOpenChange: setOpen,
    middleware: [],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: true,
    handleClose: safePolygon(),
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <div className="ghost-add-button">
      <div className="head">
        <div ref={refs.setReference} {...getReferenceProps()}>
          <CiSquarePlus size={"2em"} />
        </div>
        {isOpen && (
          <div
            className="menu-fl"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          ></div>
        )}
      </div>
      <div className={"tail" + `${isOpen ? " hover" : ""}`}></div>
    </div>
  );
};

export default GhostAddButton;
