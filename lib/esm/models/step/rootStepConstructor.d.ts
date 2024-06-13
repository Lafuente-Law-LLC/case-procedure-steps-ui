import { Step } from "./step";
import Callback from "../callback/callback";
import type { CallbackObj, FormattedStepObj } from "../../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
export default class RootStepConstructor {
    rootNode: TreeModel.Node<FormattedStepObj>;
    stepManager: StepManager;
    constructor(data: any);
    parseData(data: any): FormattedStepObj;
    defaultSetup(data: any): FormattedStepObj;
    tranformCallbackObjs(callbackObjs: CallbackObj[]): Callback[];
    ensureRequirements: (data: any) => void;
    processStep(node: TreeModel.Node<FormattedStepObj>): void;
    get rootStep(): Step | undefined;
    registerUpdateCallback(callback: () => void): void;
}
