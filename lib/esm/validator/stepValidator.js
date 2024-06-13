"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepValidator = void 0;
var _modelValidations = require("model-validations");
var _callbackController = _interopRequireDefault(require("../models/callback/callbackController"));
var _validator = _interopRequireDefault(require("./validator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var validationRules = [{
  attribute: "id",
  validationType: "presence",
  options: {}
}, {
  attribute: "title",
  validationType: "presence",
  options: {}
}, {
  attribute: "summary",
  validationType: "presence",
  options: {}
}];
var validateStep = function validateStep(step) {
  var validator = new _modelValidations.Validator();
  for (var _i = 0, _validationRules = validationRules; _i < _validationRules.length; _i++) {
    var rule = _validationRules[_i];
    validator.registerRule(rule);
  }
  return validator.validate(step);
};
var StepValidator = exports.StepValidator = /*#__PURE__*/function (_GeneralValidator) {
  function StepValidator(step) {
    var _this;
    _classCallCheck(this, StepValidator);
    _this = _callSuper(this, StepValidator, [validateStep]);
    _defineProperty(_this, "validate", function () {
      return validateStep(_this.step);
    });
    _defineProperty(_this, "valid", function () {
      return Object.values(_this.validate()).flat().length === 0;
    });
    _defineProperty(_this, "findErrorMessageForField", function (fieldName) {
      var _this$validate$fieldN;
      return (_this$validate$fieldN = _this.validate()[fieldName]) === null || _this$validate$fieldN === void 0 ? void 0 : _this$validate$fieldN[0];
    });
    _this.step = step;
    return _this;
  }
  _inherits(StepValidator, _GeneralValidator);
  return _createClass(StepValidator, [{
    key: "validateCallback",
    value: function validateCallback(callback) {
      var validator = _callbackController["default"].getValidatorFor(callback.functionName);
      if (!validator) {
        return {};
      }
      return validator.validate(callback);
    }
  }]);
}(_validator["default"]);