"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ci = require("react-icons/ci");
var _react2 = require("@floating-ui/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var CallbackAdditionButton = function CallbackAdditionButton(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isHover = _useState4[0],
    setHover = _useState4[1];
  var _useFloating = (0, _react2.useFloating)({
      placement: "right",
      strategy: "absolute",
      open: isOpen,
      onOpenChange: setOpen,
      middleware: [],
      whileElementsMounted: _react2.autoUpdate
    }),
    refs = _useFloating.refs,
    floatingStyles = _useFloating.floatingStyles,
    context = _useFloating.context;
  var click = (0, _react2.useClick)(context);
  var _useInteractions = (0, _react2.useInteractions)([click]),
    getReferenceProps = _useInteractions.getReferenceProps,
    getFloatingProps = _useInteractions.getFloatingProps;
  var handleMouseEnter = function handleMouseEnter() {
    return setHover(true);
  };
  var handleMouseLeave = function handleMouseLeave() {
    return setHover(false);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "callback-addition-button",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "menu-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: refs.setReference
  }, getReferenceProps()), /*#__PURE__*/_react["default"].createElement(_ci.CiSquarePlus, {
    size: "2em"
  })), isOpen && /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "menu",
    ref: refs.setFloating,
    style: floatingStyles
  }, getFloatingProps()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "dialog"
  }, children))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "callback-area" + "".concat(isHover ? " hover" : "")
  }));
};
var _default = exports["default"] = CallbackAdditionButton;