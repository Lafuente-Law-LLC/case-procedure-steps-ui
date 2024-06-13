"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _rootStepConstructor = _interopRequireDefault(require("./models/step/rootStepConstructor"));
var _ConfigSetup = _interopRequireDefault(require("./config/ConfigSetup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CaseProcedureApp = function CaseProcedureApp(_ref) {
  var title = _ref.title,
    description = _ref.description,
    initialData = _ref.initialData,
    onSubmitFunction = _ref.onSubmitFunction,
    callbackConfigs = _ref.callbackConfigs;
  var constructorRt = new _rootStepConstructor["default"](initialData);
  return /*#__PURE__*/_react["default"].createElement(_ConfigSetup["default"], {
    title: title,
    description: description,
    rootStepConstructor: constructorRt,
    onSubmitFunction: onSubmitFunction,
    callbackConfigs: callbackConfigs
  });
};
var _default = exports["default"] = CaseProcedureApp;