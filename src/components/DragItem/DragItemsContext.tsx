import { createContext } from "react";
import type { SelectOption } from "../Callbacks/Table/CallbackTableRow/SelectElement";
import type { CallbackAdminObj } from "../../callback/callback";

export type DragItemsOptions = {
  callbacks: {
    adminObjs: CallbackAdminObj[];
    table: {
      selectElementOptions: SelectOption[];
      selectElementDefaultValue: string;
    };
  };
};

const defaultOptions = {
  callbacks: {
    adminObjs: [],
    table: { selectElementOptions: [], selectElementDefaultValue: "" },
  },
};

export const DragItemsContext = createContext<DragItemsOptions>(defaultOptions);
