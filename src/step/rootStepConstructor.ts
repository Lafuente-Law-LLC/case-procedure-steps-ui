import { Step } from "./step";
import type { Callback, FormattedStepObj } from "../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 as generateUniqueId } from "uuid";
import type { CallbackManagementObj } from "../callback/callbackManager";

export default class RootStepConstructor {
  rootNode: TreeModel.Node<FormattedStepObj>;
  stepManager = new StepManager();
  callbackTypes = new Set<string>();
  callbackManager = this.stepManager.callbackManager;

  constructor(
    data: any,
    callbackManagementObjs: CallbackManagementObj<any>[] = [],
  ) {
    callbackManagementObjs.forEach((obj) =>
      this.registerCallbackManagement(obj),
    );
    const parsedData = this.parseData(data);

    this.validateData(parsedData);
    this.rootNode = new TreeModel().parse<FormattedStepObj>(parsedData);
    this.processStep(this.rootNode);
  }

  defaultSetup(data: any): FormattedStepObj {
    data.title = data.title || "";
    data.id = data.id || generateUniqueId();
    data.summary = data.summary || "";
    data.callbacks = data.callbacks || [];
    data.children = data.steps || [];
    delete data.steps;
    return data;
  }

  validateData = (data: any): void => {
    const requiredFields = ["title", "id", "summary"];
    requiredFields.forEach((field) => {
      if (!data[field]) throw new Error(`${field} is required`);
    });
    this.checkIfAllCallbackTypesRegistered();
  };

  registerCallbackManagement<T extends CallbackManagementObj<any>>(obj: T) {
    this.callbackManager.registerCallbackManagementObj(obj);
  }

  checkIfAllCallbackTypesRegistered() {
    this.callbackTypes.forEach((callbackType) => {
      if (!this.callbackManager.checkIfRegistered(callbackType)) {
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
    data = this.defaultSetup(data);
    this.getCallbackTypesFromData(data);

    data.children.forEach((child: any) => {
      return this.parseData(child);
    });
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
}
