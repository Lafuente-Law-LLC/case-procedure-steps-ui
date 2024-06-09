import React from "react";
import Callback from "../../models/callback/callback";
import { Step } from "../../models/step/step";
import { EventNameCell, FunctionNameCell, ArgsCellGroup } from "./TableCells";
import { createEventNameCellHandler } from "./tableRowUtils";
import CallbackController from "../../models/callback/callbackController";
import type { ArgumentSpec } from "../../models/callback/callbackController";

/**
 * Converts an array of ArgumentSpec objects to a dictionary with argument names as keys
 * and their corresponding types as values.
 * @param argsSpec - Array of ArgumentSpec objects.
 * @returns A dictionary with argument names as keys and their types as values.
 */
const returnArgsWithType = (argsSpec: ArgumentSpec[]): { [key: string]: string } => {
  return argsSpec.reduce((acc, arg) => {
    acc[arg.name] = arg.type === "string" ? "text" : arg.type;
    return acc;
  }, {} as { [key: string]: string });
};

/**
 * Converts an array containing an event name string into a tuple containing the event name
 * and a formatted version of it (e.g., ['create_event'] => ['create_event', 'Create Event']).
 * @param arr - Array containing a single event name string.
 * @returns A tuple containing the original event name and a formatted version of it.
 */
const returnSelectOption = (arr: string[]): [string, string] => {
  return [
    arr[0],
    arr[0]
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  ];
};

/**
 * Component representing a table row for displaying and editing callback information.
 * @param props - Component props.
 * @param props.callback - The callback object.
 * @param props.editMode - Boolean indicating if the row is in edit mode.
 * @param props.step - The step object.
 * @returns JSX.Element - A table row element.
 */
const TableRow = ({
  callback,
  editMode,
  step,
}: {
  callback: Callback;
  editMode: boolean;
  step: Step;
}) => {
  const { eventName, functionName } = callback;
  const callbackConfig = CallbackController.getCallbackConfig(functionName);

  if (!callbackConfig) {
    throw new Error(`No callback config found for ${functionName}`);
  }

  const argsDictionary = returnArgsWithType(callbackConfig.args);
  const events = callbackConfig.eventName.in.map((e) => returnSelectOption([e]));

  return (
    <tr>
      <EventNameCell
        onChangeHandler={createEventNameCellHandler(step, callback)}
        editMode={editMode}
        eventNameValue={eventName}
        selectOptions={events}
      />
      <FunctionNameCell functionName={functionName} />
      <ArgsCellGroup
        callback={callback}
        step={step}
        editMode={editMode}
        argTypes={argsDictionary}
      />
    </tr>
  );
};

export default TableRow;
