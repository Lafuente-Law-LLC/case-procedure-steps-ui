import React from "react";
import { Step } from "../../models/step/step";
import Callback from "../../models/callback/callback";
type EditableInputObj = {
    label: string;
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export declare const createArgsHandler: ({ step, callback, argName, }: {
    step: Step;
    callback: Callback;
    argName: string;
}) => (e: React.ChangeEvent<HTMLInputElement>) => void;
export declare const createEventNameCellHandler: (step: Step, callback: Callback) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
export declare const EditableInput: ({ label, value, type, onChange, editMode, errorMessage, }: EditableInputObj & {
    editMode: boolean;
    errorMessage?: string;
}) => React.JSX.Element;
export declare const SelectControl: ({ onChangeHandler, value, options, }: {
    onChangeHandler: any;
    options: [string, string][];
    value?: string;
}) => React.JSX.Element;
export {};
