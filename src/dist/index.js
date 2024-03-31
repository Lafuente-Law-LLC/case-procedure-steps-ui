"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var rootStep_1 = require("../ignore/rootStep");
require("bootstrap/scss/bootstrap.scss");
var rootStepConstructor_1 = require("./models/step/rootStepConstructor");
require("./css/main.scss");
var DragItemContainer_1 = require("./components/DragItem/DragItemContainer");
var callbackManager_1 = require("./models/callback/callbackManager");
var callbacks_config_1 = require("./config/callbacks.config");
var callbackFactory_1 = require("./models/callback/callbackFactory");
var createFutureEvent = {
    name: "create_future_event",
    args: [
        { name: "title", type: "string", required: true, "default": "New Title" },
        { name: "summary", type: "string", required: true, "default": "New Summary" },
        { name: "days", type: "number", required: true, "default": 0 },
    ]
};
var createTask = {
    name: "create_task",
    args: [
        { name: "title", type: "string", required: true, "default": "New Title" },
        { name: "summary", type: "string", required: true, "default": "New Summary" },
    ]
};
callbackFactory_1["default"].registerFunctionArgsPair(createFutureEvent);
callbackFactory_1["default"].registerFunctionArgsPair(createTask);
callbackFactory_1["default"].registerEventName("after_create");
callbackFactory_1["default"].registerEventName("complete");
var callbackManager = new callbackManager_1["default"]();
callbackManager.registerCallbackConfig("create_task", callbacks_config_1.taskConfig);
callbackManager.registerCallbackConfig("create_future_event", callbacks_config_1.eventConfig);
var App = function (_a) {
    var rootStep = _a.rootStep;
    var _b = react_1.useState(rootStep.steps), steps = _b[0], setSteps = _b[1];
    constructorRt.registerUpdateCallback(function () {
        setSteps(rootStep.steps);
    });
    var addStep = function () {
        rootStep.addNewStep();
    };
    return (react_1["default"].createElement(DragItemContainer_1["default"], { steps: steps, options: { callbackManager: callbackManager } },
        react_1["default"].createElement("button", { className: "mui-button", onClick: addStep }, "Add")));
};
var constructorRt = new rootStepConstructor_1["default"](rootStep_1["default"]);
var rt = constructorRt.rootStep;
var element = document.getElementById("root");
if (!element) {
    throw new Error("No root element found");
}
var root = client_1.createRoot(element);
if (rt === undefined) {
    throw new Error("Root step is undefined");
}
root.render(react_1["default"].createElement(App, { rootStep: rt }));
