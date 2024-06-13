"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _StepItem = _interopRequireDefault(require("./StepItem"));
var _StepItemDivider = _interopRequireDefault(require("./StepItemDivider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CSS_CLASSES = {
  MAIN: "step-item-body"
};
var StepItemBody = function StepItemBody(_ref) {
  var parentStep = _ref.step,
    collapseOpen = _ref.collapseOpen;
  var refElement = (0, _react.useRef)(null);
  var steps = parentStep.steps;
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Collapse, {
    "in": collapseOpen
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: refElement,
    className: CSS_CLASSES.MAIN,
    id: "body_".concat(parentStep.id),
    "data-step-id": parentStep.id
  }, steps.map(function (step, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: step.id
    }, /*#__PURE__*/_react["default"].createElement(_StepItemDivider["default"], {
      step: step
    }), /*#__PURE__*/_react["default"].createElement(_StepItem["default"], {
      step: step
    }), index + 1 == steps.length && /*#__PURE__*/_react["default"].createElement(_StepItemDivider["default"], {
      step: step
    }));
  })));
};
var _default = exports["default"] = StepItemBody;