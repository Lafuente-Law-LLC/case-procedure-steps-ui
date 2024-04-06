import { useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  } from "@floating-ui/react";

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
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
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
