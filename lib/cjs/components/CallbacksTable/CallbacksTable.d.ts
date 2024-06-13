import React from "react";
import { Step } from "../../models/step/step";
type CallbacksTableProps = {
    step: Step;
};
declare const CallbacksTable: ({ step }: CallbacksTableProps) => React.JSX.Element;
export default CallbacksTable;
