import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import {
  useFloating,
  autoUpdate,
  useInteractions,
  useClick,
} from "@floating-ui/react";

const AddCallbacksMenu = ({ children }: React.PropsWithChildren) => {
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
    <div className="my-menu">
      <div
        className="add-callbacks-button"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="head">
          <div ref={refs.setReference} {...getReferenceProps()}>
            <CiSquarePlus size={"2em"} />
          </div>
          {isOpen && (
            <div
              className="flex-column-reverse"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div className="dialog">{children}</div>
            </div>
          )}
        </div>
        <div className={"tail" + `${isHover ? " hover" : ""}`}></div>
      </div>
    </div>
  );
};

export default AddCallbacksMenu;
