"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallbackTransformer = exports.ArgumentSpecTransformer = void 0;
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GeneralValidatorTransformer = /*#__PURE__*/function () {
  function GeneralValidatorTransformer(input, transformationLogic) {
    _classCallCheck(this, GeneralValidatorTransformer);
    this.transformationLogic = transformationLogic;
    this.validationResults = this.transform(input);
  }
  return _createClass(GeneralValidatorTransformer, [{
    key: "transform",
    value: function transform(source) {
      return this.transformationLogic(source);
    }
  }, {
    key: "createValidationRule",
    value: function createValidationRule(attribute, validationType) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return {
        attribute: attribute,
        validationType: validationType,
        options: options
      };
    }
  }, {
    key: "createPresenceRule",
    value: function createPresenceRule(attribute) {
      return this.createValidationRule(attribute, "presence");
    }
  }, {
    key: "createInclusionRule",
    value: function createInclusionRule(attribute, allowedValues) {
      return this.createValidationRule(attribute, "inclusion", {
        "in": allowedValues
      });
    }
  }, {
    key: "createConfirmationRule",
    value: function createConfirmationRule(attribute, confirmationAttribute) {
      return this.createValidationRule(attribute, "confirmation", {
        "with": confirmationAttribute
      });
    }
  }, {
    key: "createNumericalityRule",
    value: function createNumericalityRule(attribute) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.createValidationRule(attribute, "numericality", options);
    }
  }]);
}();
var argumentSpecValidationLogic = function argumentSpecValidationLogic(source) {
  var name = source.name,
    type = source.type,
    defaultValue = source["default"],
    required = source.required;
  var validations = [];
  if (required) validations.push(this.createPresenceRule(name));
  if (defaultValue) validations.push(this.createConfirmationRule(name, defaultValue));
  if (type === "number") validations.push(this.createNumericalityRule(name));
  return validations;
};
var callbackConfigValidationLogic = function callbackConfigValidationLogic(source) {
  var eventName = source.eventName,
    functionName = source.functionName,
    args = source.args;
  var validations = [this.createPresenceRule("functionName"), this.createPresenceRule("eventName"), this.createPresenceRule("args"), this.createConfirmationRule("functionName", functionName), this.createInclusionRule("eventName", eventName["in"])];
  return validations;
};
var CallbackTransformer = exports.CallbackTransformer = /*#__PURE__*/function (_GeneralValidatorTran) {
  function CallbackTransformer(input) {
    _classCallCheck(this, CallbackTransformer);
    return _callSuper(this, CallbackTransformer, [input, callbackConfigValidationLogic]);
  }
  _inherits(CallbackTransformer, _GeneralValidatorTran);
  return _createClass(CallbackTransformer);
}(GeneralValidatorTransformer);
var ArgumentSpecTransformer = exports.ArgumentSpecTransformer = /*#__PURE__*/function (_GeneralValidatorTran2) {
  function ArgumentSpecTransformer(input) {
    _classCallCheck(this, ArgumentSpecTransformer);
    return _callSuper(this, ArgumentSpecTransformer, [input, argumentSpecValidationLogic]);
  }
  _inherits(ArgumentSpecTransformer, _GeneralValidatorTran2);
  return _createClass(ArgumentSpecTransformer);
}(GeneralValidatorTransformer);