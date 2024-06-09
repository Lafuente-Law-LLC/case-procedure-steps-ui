import React from "react";
import Callback from "../../models/callback/callback";
import { Step } from "../../models/step/step";
import { EventNameCell, FunctionNameCell, ArgsCellGroup } from "./TableCells";
import { createEventNameCellHandler } from "./tableRowUtils";
import CallbackFactory from "../../models/callback/callbackFactory";
import type { ArgumentSpec } from "../../models/callback/callbackFactory";

const returnArgsWithType = (argsSpec: ArgumentSpec[]) => {
  return argsSpec.reduce(
    (acc, arg) => {
      acc[arg.name] = arg.type;
      return acc;
    },
    {} as { [key: string]: string },
  );
};

/** @param example (['create_event']) => ['create_event', 'Create Event'] */
const returnSelectOption = (arr: string[]): [string, string] => {
  return [
    arr[0],
    arr[0]
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  ];
};
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
  const callbackConfig = CallbackFactory.getCallbackConfig(functionName);
  if (!callbackConfig) {
    throw new Error(`No callback config found for ${functionName}`);
  }
  const argsDictionary = returnArgsWithType(callbackConfig.args);
  const events = callbackConfig.eventName.in.map((e)=> returnSelectOption([e]));

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
