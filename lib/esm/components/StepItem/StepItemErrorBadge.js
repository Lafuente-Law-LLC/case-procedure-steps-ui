"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _usePopper2 = _interopRequireDefault(require("../hooks/usePopper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var CSS_CLASSES = {
  MAIN: "error-badge"
};
var StepItemErrorBadge = function StepItemErrorBadge(_ref) {
  var valid = _ref.valid,
    message = _ref.message;
  var _usePopper = (0, _usePopper2["default"])(),
    popperProps = _usePopper.popperProps;
  return !valid && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Badge, _extends({}, popperProps.referenceProps, {
    bg: "danger",
    className: CSS_CLASSES.MAIN
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text"
  }, "invalid"), popperProps.isOpen && /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "popper-dialog"
  }, popperProps.floatingProps), message));
};
var _default = exports["default"] = StepItemErrorBadge;