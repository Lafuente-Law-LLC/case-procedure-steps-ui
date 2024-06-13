"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dragging = require("../features/dragging");
var _StepItemModal = _interopRequireDefault(require("./StepItemModal"));
var _StepItemCol = _interopRequireDefault(require("./StepItemCol"));
var _io = require("react-icons/io5");
var _ai = require("react-icons/ai");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var CSS_CLASSES = {
  main: "step-item-head",
  modalContainer: "modal-container"
};
var stepCanBeRemoved = function stepCanBeRemoved(step) {
  return step.steps.length === 0;
};
var StepItemHead = function StepItemHead(_ref) {
  var step = _ref.step,
    setCollapseOpen = _ref.setCollapseOpen,
    collapseOpen = _ref.collapseOpen;
  var addStepOnClick = function addStepOnClick() {
    if (!collapseOpen) setCollapseOpen(true);
    step.addNewStep();
  };
  var removeStepOnClick = function removeStepOnClick() {
    step.remove();
  };
  var refElement = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: refElement,
    className: CSS_CLASSES.main,
    "data-step-id": step.id
  }, (0, _dragging.StepItemHeadDragProps)(refElement)), /*#__PURE__*/_react["default"].createElement(_StepItemCol["default"], {
    className: "left-corner",
    header: /*#__PURE__*/_react["default"].createElement(_io.IoTriangleSharp, {
      className: "triangle ".concat(collapseOpen ? "open" : ""),
      size: 12,
      onClick: function onClick() {
        return setCollapseOpen(function (prev) {
          return !prev;
        });
      }
    })
  }), /*#__PURE__*/_react["default"].createElement(_StepItemCol["default"], {
    header: "Title",
    className: "title"
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    value: step.title,
    onChange: function onChange(e) {
      step.updateTitle(e.target.value);
    }
  }))), /*#__PURE__*/_react["default"].createElement(_StepItemCol["default"], {
    header: "Summary",
    className: "summary"
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("textarea", {
    value: step.summary,
    onChange: function onChange(e) {
      step.updateSummary(e.target.value);
    }
  }))), /*#__PURE__*/_react["default"].createElement(_StepItemCol["default"], {
    className: "right-corner",
    header: /*#__PURE__*/_react["default"].createElement("div", {
      className: "right"
    }, /*#__PURE__*/_react["default"].createElement(_StepItemModal["default"], {
      step: step
    }), /*#__PURE__*/_react["default"].createElement("button", {
      className: "cross-button",
      onClick: addStepOnClick
    }))
  }, /*#__PURE__*/_react["default"].createElement("span", null, "sub-steps: ".concat(step.steps.length)), /*#__PURE__*/_react["default"].createElement("span", null, "callbacks: ".concat(step.callbacks.length)), stepCanBeRemoved(step) && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_ai.AiFillDelete, {
    size: 18,
    className: "garbage-can",
    onClick: removeStepOnClick
  }))));
};
var _default = exports["default"] = StepItemHead;