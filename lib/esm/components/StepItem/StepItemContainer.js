"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _StepItem = _interopRequireDefault(require("./StepItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CSS_CLASS = "step-item-container";
var StepItemContainer = function StepItemContainer(_ref) {
  var steps = _ref.steps,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: CSS_CLASS
  }, steps.map(function (step) {
    return /*#__PURE__*/_react["default"].createElement(_StepItem["default"], {
      key: step.id,
      step: step
    });
  })), children);
};
var _default = exports["default"] = StepItemContainer;