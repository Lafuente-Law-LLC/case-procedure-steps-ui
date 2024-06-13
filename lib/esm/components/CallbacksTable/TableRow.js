"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _TableCells = require("./TableCells");
var _tableRowUtils = require("./tableRowUtils");
var _callbackController = _interopRequireDefault(require("../../models/callback/callbackController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Converts an array of ArgumentSpec objects to a dictionary with argument names
 * as keys and their corresponding types as values.
 *
 * @param argsSpec - Array of ArgumentSpec objects.
 * @returns A dictionary with argument names as keys and their types as values.
 */
var returnArgsWithType = function returnArgsWithType(argsSpec) {
  return argsSpec.reduce(function (acc, arg) {
    acc[arg.name] = arg.type === "string" ? "text" : arg.type;
    return acc;
  }, {});
};

/**
 * Converts an array containing an event name string into a tuple containing the
 * event name and a formatted version of it (e.g., ['create_event'] =>
 * ['create_event', 'Create Event']).
 *
 * @param arr - Array containing a single event name string.
 * @returns A tuple containing the original event name and a formatted version
 *   of it.
 */
var returnSelectOption = function returnSelectOption(arr) {
  return [arr[0], arr[0].split("_").map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ")];
};

/**
 * Component representing a table row for displaying and editing callback
 * information.
 *
 * @param props - Component props.
 * @param props.callback - The callback object.
 * @param props.editMode - Boolean indicating if the row is in edit mode.
 * @param props.step - The step object.
 * @returns JSX.Element - A table row element.
 */
var TableRow = function TableRow(_ref) {
  var callback = _ref.callback,
    editMode = _ref.editMode,
    step = _ref.step;
  var eventName = callback.eventName,
    functionName = callback.functionName;
  var callbackConfig = _callbackController["default"].getCallbackConfig(functionName);
  if (!callbackConfig) {
    throw new Error("No callback config found for ".concat(functionName));
  }
  var argsDictionary = returnArgsWithType(callbackConfig.args);
  var events = callbackConfig.eventName["in"].map(function (e) {
    return returnSelectOption([e]);
  });
  return /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement(_TableCells.EventNameCell, {
    onChangeHandler: (0, _tableRowUtils.createEventNameCellHandler)(step, callback),
    editMode: editMode,
    eventNameValue: eventName,
    selectOptions: events
  }), /*#__PURE__*/_react["default"].createElement(_TableCells.FunctionNameCell, {
    functionName: functionName
  }), /*#__PURE__*/_react["default"].createElement(_TableCells.ArgsCellGroup, {
    callback: callback,
    step: step,
    editMode: editMode,
    argTypes: argsDictionary
  }), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return step.removeCallback(callback);
    }
  }, "X")));
};
var _default = exports["default"] = TableRow;