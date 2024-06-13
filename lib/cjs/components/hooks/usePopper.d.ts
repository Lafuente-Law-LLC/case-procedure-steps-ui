/// <reference types="react" />
declare function usePopper(): {
    popperProps: {
        referenceProps: {
            ref: ((node: import("@floating-ui/react-dom").ReferenceType | null) => void) & ((node: import("@floating-ui/react").ReferenceType | null) => void);
        };
        floatingProps: {
            ref: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void);
            style: import("react").CSSProperties;
        };
        isOpen: boolean;
    };
};
export default usePopper;
