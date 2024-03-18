import { Step } from "./step";
import type { Callback, CallbackWithId, FormattedStepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 } from "uuid";
import type { CallbackManagementObj } from "../callback/callbackManager";
import CallbackManager from "../callback/callbackManager";

const defaultSetupFunction = (data: any): FormattedStepObj => {
  data.title = data.title || "";
  data.id = data.id || v4();
  data.summary = data.summary || "";
  data.callbacks = data.callbacks || [];
  data.children = data.steps || [];
  return data;
};

const validateData = function(this: RootStepConstructor, data: any){
  if (!data.title) {
    throw new Error("Title is required");
  }
  if (!data.id) {
    throw new Error("Id is required");
  }
  if (!data.summary) {
    throw new Error("Summary is required");
  }
  this.checkIfAllCallbackTypesRegistered();
};

export default class RootStepConstructor {
  rootNode: TreeModel.Node<FormattedStepObj>;
  stepManager = new StepManager();
  callbackTypes = new Set<string>();

  registerCallbackManagement<T extends CallbackManagementObj<any>>(obj: T) {
    CallbackManager.registerCallbackManagementObj(obj);
  }

  constructor(data: any, callbackManagementObjs: CallbackManagementObj<any>[] = []) {
    callbackManagementObjs.forEach((obj) => this.registerCallbackManagement(obj));
    const parsedData = this.parseData(data);
    validateData.call(this, parsedData); 
    this.rootNode = new TreeModel().parse<FormattedStepObj>(parsedData);
    this.processStep(this.rootNode);
  }

  checkIfAllCallbackTypesRegistered() {
    this.callbackTypes.forEach((callbackType) => {
      if (!CallbackManager.checkIfRegistered(callbackType)) {
        throw new Error(`Callback type ${callbackType} not registered`);
      }
    });
  }

  getCallbackTypesFromData(data: any) {
    if (!data.callbacks) {
      return;
    }
    const callbacks = data.callbacks;
    callbacks.forEach((callback: Callback) => {
      this.callbackTypes.add(callback.function);
    });
  }

  parseData(data: any) {
    data = defaultSetupFunction(data);
    this.getCallbackTypesFromData(data);
    data.children.forEach((child: any) => this.parseData(child));
    return data as FormattedStepObj;
  }

  processStep(node: TreeModel.Node<FormattedStepObj>) {
    new Step(new StepNode(node, this.stepManager));
    const children = node.children as TreeModel.Node<FormattedStepObj>[];
    if (children) {
      children.forEach((child) => this.processStep(child));
    }
  }

  get rootStep() {
    return this.stepManager.searchById(this.rootNode.model.id);
  }

  registerUpdateCallback(callback: () => void) {
    this.stepManager.registerUpdateCallback(callback);
  }

  get StepManager() {
    return this.stepManager;
  }
}
