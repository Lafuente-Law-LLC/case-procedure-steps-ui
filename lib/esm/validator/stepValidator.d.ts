import { Step } from "../models/step/step";
import GeneralValidator from "./validator";
import Callback from "../models/callback/callback";
export declare class StepValidator extends GeneralValidator {
    step: Step;
    constructor(step: Step);
    validateCallback(callback: Callback): Record<string, string[]>;
    validate: () => Record<string, string[]>;
    valid: () => boolean;
    findErrorMessageForField: (fieldName: string) => string;
}
