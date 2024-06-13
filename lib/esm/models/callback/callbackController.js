"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _callback = _interopRequireDefault(require("./callback"));
var _validators = require("../../validator/validators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function formatString(input) {
  var words = input.split("_");
  var formattedString = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
  return formattedString;
}
var CallbackController = exports["default"] = /*#__PURE__*/function () {
  function CallbackController() {
    _classCallCheck(this, CallbackController);
  }
  return _createClass(CallbackController, null, [{
    key: "availableEvents",
    value: function availableEvents(functionName) {
      var callbackConfig = this.getCallbackConfig(functionName);
      if (!callbackConfig) {
        throw new Error("Callback not found");
      }
      return callbackConfig.eventName["in"];
    }
  }, {
    key: "registerCallbackConfig",
    value: function registerCallbackConfig(config) {
      this.callbackConfigs.set(config.functionName, config);
    }
  }, {
    key: "getCallbackConfig",
    value: function getCallbackConfig(functionName) {
      return this.callbackConfigs.get(functionName);
    }
  }, {
    key: "getLabelDataForEvent",
    value: function getLabelDataForEvent(eventName) {
      return formatString(eventName);
    }
  }, {
    key: "getValidatorFor",
    value: function getValidatorFor(functionName) {
      var callbackConfig = this.getCallbackConfig(functionName);
      if (!callbackConfig) {
        throw new Error("Callback not found");
      }
      return new _validators.CallbackValidator(callbackConfig);
    }
  }, {
    key: "buildDefaultArgs",
    value: function buildDefaultArgs(argDescriptors) {
      var obj = {};
      argDescriptors.forEach(function (arg) {
        obj[arg.name] = arg["default"];
      });
      return obj;
    }
  }, {
    key: "createPartialCallbackInstance",
    value: function createPartialCallbackInstance(functionName, eventName, args) {
      var callbackConfig = this.getCallbackConfig(functionName);
      if (!callbackConfig) {
        throw new Error("Callback not found");
      }
      eventName = eventName || callbackConfig.eventName["default"];
      var events = callbackConfig.eventName["in"];
      if (!events.includes(eventName)) {
        throw new Error("Event not allowed for this callback");
      }
      return this.createCallbackInstance(functionName, eventName, args);
    }
  }, {
    key: "createCallbackInstance",
    value: function createCallbackInstance(functionName, eventName, args) {
      var callbackConfig = this.getCallbackConfig(functionName);
      if (!callbackConfig) {
        throw new Error("Callback not found");
      }
      var events = callbackConfig.eventName["in"];
      if (!events.includes(eventName)) {
        throw new Error("Event not allowed for this callback");
      }
      var eventDefault = callbackConfig.eventName["default"];
      if (eventName !== eventDefault) {
        throw new Error("Event not allowed for this callback");
      }
      args = args || this.buildDefaultArgs(callbackConfig.args);
      return new _callback["default"]({
        functionName: functionName,
        eventName: eventName,
        args: args
      });
    }
  }]);
}();
_defineProperty(CallbackController, "callbackConfigs", new Map());