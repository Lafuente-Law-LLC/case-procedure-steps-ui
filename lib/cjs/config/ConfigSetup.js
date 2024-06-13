"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StepItemContainer = _interopRequireDefault(require("../components/StepItem/StepItemContainer"));
var _callbackController = _interopRequireDefault(require("../models/callback/callbackController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var setupCallbackController = function setupCallbackController(callbackConfigs) {
  callbackConfigs.forEach(function (config) {
    _callbackController["default"].registerCallbackConfig(config);
  });
};
var ConfigSetup = function ConfigSetup(_ref) {
  var title = _ref.title,
    description = _ref.description,
    rootStepConstructor = _ref.rootStepConstructor,
    onSubmitFunction = _ref.onSubmitFunction,
    callbackConfigs = _ref.callbackConfigs;
  if (callbackConfigs) {
    setupCallbackController(callbackConfigs);
  }
  var _useState = (0, _react.useState)(title),
    _useState2 = _slicedToArray(_useState, 2),
    newTitle = _useState2[0],
    setTitle = _useState2[1];
  var _useState3 = (0, _react.useState)(description),
    _useState4 = _slicedToArray(_useState3, 2),
    newDescription = _useState4[0],
    setDescription = _useState4[1];
  var rootStep = rootStepConstructor.rootStep;
  if (!rootStep) {
    throw new Error("Root step is undefined");
  }
  var _useState5 = (0, _react.useState)(rootStep.steps),
    _useState6 = _slicedToArray(_useState5, 2),
    steps = _useState6[0],
    setSteps = _useState6[1];
  rootStepConstructor.registerUpdateCallback(function () {
    setSteps(rootStep.steps);
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "top-row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Title"), /*#__PURE__*/_react["default"].createElement("input", {
    className: "form-control",
    name: "title",
    value: newTitle,
    onChange: function onChange(e) {
      return setTitle(e.target.value);
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Description"), /*#__PURE__*/_react["default"].createElement("textarea", {
    className: "form-control",
    name: "title",
    value: newDescription,
    onChange: function onChange(e) {
      return setDescription(e.target.value);
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("label", null, "Steps Template")), /*#__PURE__*/_react["default"].createElement(StepsTemplateContainer, {
    steps: steps,
    addStep: function addStep() {
      return rootStep.addNewStep();
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bottom-row",
    style: {
      maxHeight: "1vh"
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-primary",
    onClick: function onClick() {
      onSubmitFunction({
        title: newTitle,
        description: newDescription,
        rootStep: rootStep.toJSON()
      });
    }
  }, "Submit")));
};
var StepsTemplateContainer = function StepsTemplateContainer(_ref2) {
  var steps = _ref2.steps,
    addStep = _ref2.addStep;
  return /*#__PURE__*/_react["default"].createElement(_StepItemContainer["default"], {
    steps: steps
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: "btn btn-primary mt-3 ",
    onClick: addStep
  }, "Add"));
};
var _default = exports["default"] = ConfigSetup;