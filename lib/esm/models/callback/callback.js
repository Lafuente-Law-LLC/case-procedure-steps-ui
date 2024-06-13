"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _uuid = require("uuid");
var _lodash = require("lodash");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Callbacks are objects associated with steps, defining actions to occur after specific events in a step's lifecycle.
 * For example, imagine that after a step is marked as completed, the function `sendEmail` should be called.
 * The callback object would contain:
 * - The event name (e.g., step completion)
 * - The function name (e.g., sendEmail)
 * - A description of the acceptable arguments that the function `sendEmail` should receive
 * 
 * In the context of front-end development, the callback object could be used to create a button that, when clicked, calls the `sendEmail` function.
 * 
 * Additionally, descriptors within the callback object provide context on how to display certain components related to the callback.
 * The `eventLabelObj` is used to associate the event with a label component, aiding in the display and user interaction.
 */
var Callback = /*#__PURE__*/function () {
  function Callback(_ref) {
    var id = _ref.id,
      eventName = _ref.eventName,
      functionName = _ref.functionName,
      args = _ref.args;
    _classCallCheck(this, Callback);
    this.id = id || (0, _uuid.v4)();
    this.eventName = eventName || "";
    this.functionName = functionName;
    this.args = args;
  }
  return _createClass(Callback, [{
    key: "updateEvent",
    value: function updateEvent(event) {
      this.eventName = event;
    }
  }, {
    key: "updateArgs",
    value: function updateArgs(args) {
      this.args = args;
    }
  }, {
    key: "update",
    value: function update(_ref2) {
      var functionName = _ref2.functionName,
        eventName = _ref2.eventName,
        args = _ref2.args;
      this.functionName = functionName !== null && functionName !== void 0 ? functionName : this.functionName;
      this.eventName = eventName !== null && eventName !== void 0 ? eventName : this.eventName;
      this.args = args ? (0, _lodash.merge)(this.args, args) : this.args;
    }
  }, {
    key: "type",
    get: function get() {
      return this.functionName;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        eventName: this.eventName,
        functionName: this.functionName,
        args: this.args
      };
    }
  }]);
}();
var _default = exports["default"] = Callback;