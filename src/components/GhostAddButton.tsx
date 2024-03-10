import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import {
  useFloating,
  autoUpdate,
  useInteractions,
  useClick,
} from "@floating-ui/react";

const GhostAddButton = ({ items }: { items: React.JSX.Element[] }) => {
  const [isOpen, setOpen] = useState(false);
  const [isHover, setHover] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: "right",
    strategy: "absolute",
    open: isOpen,
    onOpenChange: setOpen,
    middleware: [],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <div
      className="ghost-add-button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
          >
            {items.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        )}
      </div>
      <div className={"tail" + `${isHover ? " hover" : ""}`}></div>
    </div>
  );
};

export default GhostAddButton;
