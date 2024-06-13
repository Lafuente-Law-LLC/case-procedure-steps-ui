"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StepItemCol = function StepItemCol(_ref) {
  var _ref$header = _ref.header,
    header = _ref$header === void 0 ? "" : _ref$header,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "step-item-col ".concat(className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "header"
  }, header), /*#__PURE__*/_react["default"].createElement("div", {
    className: "body"
  }, children));
};
var _default = exports["default"] = StepItemCol;