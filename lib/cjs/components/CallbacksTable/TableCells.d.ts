import React from "react";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
type EventNameCellProps = {
    eventNameValue: string;
    editMode: boolean;
    onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
    selectOptions: [string, string][];
    errorMessage?: string;
} & React.PropsWithChildren;
export declare const ArgsCellGroup: ({ callback, step, editMode, argTypes, }: {
    callback: Callback;
    step: Step;
    editMode: boolean;
    argTypes: {
        [key: string]: string;
    };
}) => React.JSX.Element;
export declare const EventNameCell: ({ eventNameValue, editMode, onChangeHandler, selectOptions, }: EventNameCellProps) => React.JSX.Element;
export declare const FunctionNameCell: ({ functionName, }: {
    functionName: string;
}) => React.JSX.Element;
export {};
