"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _step = require("./step");
var _treeModel = _interopRequireDefault(require("tree-model"));
var _stepManager = _interopRequireDefault(require("./stepManager"));
var _stepNode = _interopRequireDefault(require("./stepNode"));
var _uuid = require("uuid");
var _callbackController = _interopRequireDefault(require("../callback/callbackController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RootStepConstructor = exports["default"] = /*#__PURE__*/function () {
  function RootStepConstructor(_data) {
    _classCallCheck(this, RootStepConstructor);
    _defineProperty(this, "stepManager", new _stepManager["default"]());
    _defineProperty(this, "ensureRequirements", function (data) {
      var requiredFields = ["id"];
      requiredFields.forEach(function (field) {
        if (!data[field]) throw new Error("".concat(field, " is required"));
      });
    });
    var parsedData = this.parseData(_data);
    this.ensureRequirements(parsedData);
    this.rootNode = new _treeModel["default"]().parse(parsedData);
    this.processStep(this.rootNode);
  }
  return _createClass(RootStepConstructor, [{
    key: "parseData",
    value: function parseData(data) {
      var _this = this;
      data = this.defaultSetup(data);
      data.children.forEach(function (child) {
        return _this.parseData(child);
      });
      return data;
    }
  }, {
    key: "defaultSetup",
    value: function defaultSetup(data) {
      data.title = data.title || "";
      data.id = data.id || (0, _uuid.v4)();
      data.summary = data.summary || "";
      data.callbacks = this.tranformCallbackObjs(data.callbacks || []);
      data.children = data.steps || [];
      delete data.steps;
      return data;
    }
  }, {
    key: "tranformCallbackObjs",
    value: function tranformCallbackObjs(callbackObjs) {
      return callbackObjs.map(function (callbackObj) {
        return _callbackController["default"].createCallbackInstance(callbackObj.functionName, callbackObj.eventName, callbackObj.args);
      });
    }
  }, {
    key: "processStep",
    value: function processStep(node) {
      var _this2 = this;
      new _step.Step(new _stepNode["default"](node), this.stepManager);
      var children = node.children;
      if (children) {
        children.forEach(function (child) {
          return _this2.processStep(child);
        });
      }
    }
  }, {
    key: "rootStep",
    get: function get() {
      return this.stepManager.searchById(this.rootNode.model.id);
    }
  }, {
    key: "registerUpdateCallback",
    value: function registerUpdateCallback(callback) {
      this.stepManager.registerUpdateFunction(callback);
    }
  }]);
}();