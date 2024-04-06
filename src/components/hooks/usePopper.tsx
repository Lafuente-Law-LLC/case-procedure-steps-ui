import { useState} from "react";
import { useFloating, useHover, useInteractions, safePolygon } from "@floating-ui/react";

function usePopper() {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start", 
    
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return {
    popperProps: {
      referenceProps: {
        ref: refs.setReference,
        ...getReferenceProps({
          onMouseEnter: () => setIsOpen(true), // Open the popper on hover
          onMouseLeave: () => setIsOpen(false), // Close the popper when leaving
        }),
      },
      floatingProps: {
        ref: refs.setFloating,
        style: floatingStyles,
        ...getFloatingProps(),
      },
      isOpen,
    },
  };
}

export default usePopper;
