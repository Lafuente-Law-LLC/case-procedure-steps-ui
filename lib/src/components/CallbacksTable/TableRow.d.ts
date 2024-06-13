import React from "react";
import Callback from "../../models/callback/callback";
import { Step } from "../../models/step/step";
/**
 * Component representing a table row for displaying and editing callback
 * information.
 *
 * @param props - Component props.
 * @param props.callback - The callback object.
 * @param props.editMode - Boolean indicating if the row is in edit mode.
 * @param props.step - The step object.
 * @returns JSX.Element - A table row element.
 */
declare const TableRow: ({ callback, editMode, step, }: {
    callback: Callback;
    editMode: boolean;
    step: Step;
}) => React.JSX.Element;
export default TableRow;
