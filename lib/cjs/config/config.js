"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runConfig = void 0;
var _callbackController = _interopRequireDefault(require("../models/callback/callbackController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var createEvent = {
  functionName: "create_event",
  eventName: {
    "in": ["complete", "after_create"],
    "default": "after_create"
  },
  args: [{
    name: "title",
    type: "string",
    "default": "",
    required: true
  }, {
    name: "summary",
    type: "string",
    "default": "",
    required: true
  }]
};
var createTask = {
  functionName: "create_task",
  eventName: {
    "in": ["complete", "after_create"],
    "default": "after_create"
  },
  args: [{
    name: "title",
    type: "string",
    "default": "",
    required: true
  }, {
    name: "summary",
    type: "string",
    "default": "",
    required: true
  }]
};
var createFutureEvent = {
  functionName: "create_future_event",
  eventName: {
    "in": ["complete", "after_create"],
    "default": "after_create"
  },
  args: [{
    name: "title",
    type: "string",
    "default": "",
    required: true
  }, {
    name: "summary",
    type: "string",
    "default": "",
    required: true
  }, {
    name: "date",
    type: "number",
    "default": 10,
    required: true
  }]
};
_callbackController["default"].registerCallbackConfig(createEvent);
_callbackController["default"].registerCallbackConfig(createTask);
_callbackController["default"].registerCallbackConfig(createFutureEvent);
var runConfig = exports.runConfig = function runConfig() {
  console.log("Config has been run");
};