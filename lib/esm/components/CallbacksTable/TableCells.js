"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionNameCell = exports.EventNameCell = exports.ArgsCellGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _tableRowUtils = require("./tableRowUtils");
var _callbackController = _interopRequireDefault(require("../../models/callback/callbackController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ArgsCell = function ArgsCell(_ref) {
  var argName = _ref.argName,
    value = _ref.value,
    argType = _ref.argType,
    onChangeHandler = _ref.onChangeHandler,
    editMode = _ref.editMode,
    errorMessage = _ref.errorMessage;
  return /*#__PURE__*/_react["default"].createElement(_tableRowUtils.EditableInput, {
    key: argName,
    label: argName,
    value: value,
    type: argType,
    onChange: onChangeHandler,
    editMode: editMode,
    errorMessage: errorMessage
  });
};
var ArgsCellGroup = exports.ArgsCellGroup = function ArgsCellGroup(_ref2) {
  var callback = _ref2.callback,
    step = _ref2.step,
    editMode = _ref2.editMode,
    argTypes = _ref2.argTypes;
  var argsValidator = {};
  var callbackValidator = _callbackController["default"].getValidatorFor(callback.functionName);
  if (callbackValidator) {
    argsValidator = callbackValidator.validateArgs(callback.args);
  }
  return /*#__PURE__*/_react["default"].createElement("td", null, Object.entries(callback.args).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      argName = _ref4[0],
      value = _ref4[1];
    return /*#__PURE__*/_react["default"].createElement(ArgsCell, {
      key: argName,
      argName: argName,
      value: value,
      argType: argTypes[argName] || "text",
      onChangeHandler: (0, _tableRowUtils.createArgsHandler)({
        step: step,
        callback: callback,
        argName: argName
      }),
      editMode: editMode,
      errorMessage: argsValidator[argName] || undefined
    });
  }));
};
var EventNameCell = exports.EventNameCell = function EventNameCell(_ref5) {
  var eventNameValue = _ref5.eventNameValue,
    editMode = _ref5.editMode,
    onChangeHandler = _ref5.onChangeHandler,
    selectOptions = _ref5.selectOptions;
  return /*#__PURE__*/_react["default"].createElement("td", null, editMode ? /*#__PURE__*/_react["default"].createElement(_tableRowUtils.SelectControl, {
    options: selectOptions,
    onChangeHandler: onChangeHandler,
    value: eventNameValue
  }) : eventNameValue);
};
var FunctionNameCell = exports.FunctionNameCell = function FunctionNameCell(_ref6) {
  var functionName = _ref6.functionName;
  return /*#__PURE__*/_react["default"].createElement("td", null, functionName);
};