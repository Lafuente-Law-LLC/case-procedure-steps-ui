import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import {
  useFloating,
  autoUpdate,
  useInteractions,
  useClick,
} from "@floating-ui/react";


/**
 * CallbackAdditionButton component is a button for adding callbacks.
 * It manages state using React's useState hook and utilizes hooks from "@floating-ui/react" for floating behavior and interactions.
 *
 * @component
 * @param {object} props - Props for CallbackAdditionButton component.
 * @param {React.ReactNode} props.children - Content to be displayed inside the dialog.
 * @returns {React.ReactNode} CallbackAdditionButton component.
 */
const CallbackAdditionButton = ({ children }: React.PropsWithChildren) => {
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

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <div className="callback-addition-button"
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}>

      <div className="menu-wrapper">
        <div ref={refs.setReference} {...getReferenceProps()}>
          <CiSquarePlus size={"2em"} />
        </div>
        {isOpen && (
          <div className="menu"
               ref={refs.setFloating}
               style={floatingStyles}
               {...getFloatingProps()}>
            <div className="dialog">{children}</div>
          </div>
        )}
      </div>
      <div className={"callback-area" + `${isHover ? " hover" : ""}`}></div>
    </div>
  );
};

export default CallbackAdditionButton;
