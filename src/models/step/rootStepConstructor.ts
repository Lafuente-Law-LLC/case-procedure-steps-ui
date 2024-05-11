import { Step } from "./step";
import Callback from "../callback/callback";
import type { CallbackObj, FormattedStepObj } from "../../types";
import TreeModel from "tree-model";
import StepManager from "./stepManager";
import StepNode from "./stepNode";
import { v4 as generateUniqueId } from "uuid";
import CallbackFactory from "../callback/callbackFactory";
import StepsValidator from "../../validator/stepsValidator";

export default class RootStepConstructor {
  rootNode: TreeModel.Node<FormattedStepObj>;
  stepManager = new StepManager();

  constructor(data: any) {
    const parsedData = this.parseData(data);
    this.ensureRequirements(parsedData);
    this.rootNode = new TreeModel().parse<FormattedStepObj>(parsedData);
    this.processStep(this.rootNode);
  }
  parseData(data: any) {
    data = this.defaultSetup(data);
    data.children.forEach((child: any) => {
      return this.parseData(child);
    });
    return data as FormattedStepObj;
  }

  defaultSetup(data: any): FormattedStepObj {
    data.title = data.title || "";
    data.id = data.id || generateUniqueId();
    data.summary = data.summary || "";
    data.callbacks = this.tranformCallbackObjs(data.callbacks || []);
    data.children = data.steps || [];
    delete data.steps;
    return data;
  }

  tranformCallbackObjs(callbackObjs: CallbackObj[]): Callback[] {
    return callbackObjs.map((callbackObj) =>
      CallbackFactory.createCallback(
        callbackObj.function,
        callbackObj.event,
        callbackObj.args,
      ),
    );
  }

  ensureRequirements = (data: any): void => {
    const requiredFields = ["id"];
    requiredFields.forEach((field) => {
      if (!data[field]) throw new Error(`${field} is required`);
    });
  };

  processStep(node: TreeModel.Node<FormattedStepObj>) {
    new Step(new StepNode(node ), this.stepManager);

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

  get stepsValidator() {
    const stepsValidator = new StepsValidator(this.stepManager);
    stepsValidator.validate();
    return stepsValidator;
  }
}
