"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @example
 *   // Define a simple validation logic function
 *   const validateUser = (user) => {
 *     const errors = {};
 *     if (!user.name) {
 *       errors.name = ["Name is required"];
 *     }
 *     if (!user.email) {
 *       errors.email = ["Email is required"];
 *     } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
 *       errors.email.push("Email is invalid");
 *     }
 *     return errors;
 *   };
 *
 *   // Instantiate the GeneralValidator with the validation logic
 *   const userValidator = new GeneralValidator(validateUser);
 *
 *   // Validate a user object
 *   const user = { name: "", email: "invalid-email" };
 *   userValidator.validate(user);
 *
 *   console.log(userValidator.errors); // { name: ['Name is required'], email: ['Email is invalid'] }
 *   console.log(userValidator.valid()); // false
 *   console.log(userValidator.findErrorMessageForField("email")); // 'Email is invalid'
 *   console.log(userValidator.validField("name")); // { valid: false, message: 'Name is required' }
 */
var GeneralValidator = exports["default"] = /*#__PURE__*/function () {
  function GeneralValidator(validationLogicFunction) {
    _classCallCheck(this, GeneralValidator);
    _defineProperty(this, "errors", {});
    this.validationLogicFunction = validationLogicFunction;
  }
  return _createClass(GeneralValidator, [{
    key: "errorMessages",
    get: function get() {
      return Object.values(this.errors).flat();
    }
  }, {
    key: "valid",
    value: function valid() {
      return this.errorMessages.length === 0;
    }
  }, {
    key: "findErrorMessageForField",
    value: function findErrorMessageForField(fieldName) {
      var _this$errors$fieldNam;
      return (_this$errors$fieldNam = this.errors[fieldName]) === null || _this$errors$fieldNam === void 0 ? void 0 : _this$errors$fieldNam[0];
    }
  }, {
    key: "errorInField",
    value: function errorInField(fieldName) {
      return Boolean(this.errors[fieldName]);
    }
  }, {
    key: "validField",
    value: function validField(fieldName) {
      var _this$findErrorMessag;
      var message = (_this$findErrorMessag = this.findErrorMessageForField(fieldName)) !== null && _this$findErrorMessag !== void 0 ? _this$findErrorMessag : "";
      return {
        valid: !message,
        message: message
      };
    }
  }, {
    key: "validate",
    value: function validate(subject) {
      this.errors = this.validationLogicFunction(subject);
      return this.errors;
    }
  }]);
}();