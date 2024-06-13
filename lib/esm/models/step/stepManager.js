"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _step = require("./step");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ensureIsStep = function ensureIsStep(instance) {
  if (!(instance instanceof _step.Step)) {
    throw new Error("Instance must be of type Step");
  }
};
var StepManager = exports["default"] = /*#__PURE__*/function () {
  function StepManager() {
    _classCallCheck(this, StepManager);
    this.registeredSteps = new Set();
    this.updateFunctions = new Set();
  }
  return _createClass(StepManager, [{
    key: "registerInstance",
    value: function registerInstance(instance) {
      ensureIsStep(instance);
      this.registeredSteps.add(instance);
    }
  }, {
    key: "unregisterInstance",
    value: function unregisterInstance(instance) {
      this.registeredSteps["delete"](instance);
    }
  }, {
    key: "registerUpdateFunction",
    value: function registerUpdateFunction(updateFunction) {
      this.updateFunctions.add(updateFunction);
    }
  }, {
    key: "searchById",
    value: function searchById(id) {
      return Array.from(this.registeredSteps).find(function (step) {
        return step.id === id;
      });
    }
  }, {
    key: "makeNewChildForStep",
    value: function makeNewChildForStep(step) {
      return new _step.Step(step.stepNode.newStepNodeChild(), this);
    }
  }]);
}();