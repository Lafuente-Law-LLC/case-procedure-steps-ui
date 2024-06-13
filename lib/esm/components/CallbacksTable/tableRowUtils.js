"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventNameCellHandler = exports.createArgsHandler = exports.SelectControl = exports.EditableInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var createArgsHandler = exports.createArgsHandler = function createArgsHandler(_ref) {
  var step = _ref.step,
    callback = _ref.callback,
    argName = _ref.argName;
  return function (e) {
    step.updateCallback(callback, {
      args: _objectSpread(_objectSpread({}, callback.args), {}, _defineProperty({}, argName, e.target.value))
    });
  };
};
var createEventNameCellHandler = exports.createEventNameCellHandler = function createEventNameCellHandler(step, callback) {
  return function (e) {
    var value = e.target.value;
    step.updateCallback(callback, {
      eventName: value
    });
  };
};
var EditableInput = exports.EditableInput = function EditableInput(_ref2) {
  var label = _ref2.label,
    value = _ref2.value,
    type = _ref2.type,
    onChange = _ref2.onChange,
    editMode = _ref2.editMode,
    errorMessage = _ref2.errorMessage;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "label-row-component ".concat(errorMessage ? 'invalid' : '')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "label"
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    className: "value"
  }, !editMode ? value : /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    type: type,
    value: value,
    onChange: onChange
  })), errorMessage && /*#__PURE__*/_react["default"].createElement("div", {
    className: "error-message"
  }, errorMessage));
};
var SelectControl = exports.SelectControl = function SelectControl(_ref3) {
  var onChangeHandler = _ref3.onChangeHandler,
    value = _ref3.value,
    options = _ref3.options;
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
    as: "select",
    onChange: onChangeHandler,
    value: value
  }, options.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      value = _ref5[0],
      label = _ref5[1];
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: value,
      value: value
    }, label);
  }));
};