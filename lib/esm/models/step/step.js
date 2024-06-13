"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = void 0;
var _callback = _interopRequireDefault(require("../callback/callback"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Step = exports.Step = /*#__PURE__*/function () {
  function Step(stepNode, stepManager) {
    _classCallCheck(this, Step);
    var dataObj = stepNode.basicStepObject();
    if (!dataObj.id) {
      throw new Error("Step id is required");
    }
    var id = dataObj.id,
      title = dataObj.title,
      summary = dataObj.summary,
      callbacks = dataObj.callbacks;
    this.id = id;
    this.title = title || "";
    this.summary = summary || "";
    this.callbacks = callbacks || [];
    this.stepNode = stepNode;
    this.stepManager = stepManager;
    this.stepManager.registerInstance(this);
  }
  return _createClass(Step, [{
    key: "treeNode",
    get: function get() {
      return this.stepNode.treeNode;
    }
  }, {
    key: "steps",
    get: function get() {
      var _this = this;
      var stepsArray = this.stepNode.childrenTreeNodes.map(function (node) {
        return _this.stepManager.searchById(node.model.id);
      });
      return stepsArray.filter(function (step) {
        return step !== undefined;
      });
    }
  }, {
    key: "parentStep",
    get: function get() {
      var parent = this.stepNode.parentTreeNode;
      return this.stepManager.searchById(parent.model.id) || null;
    }
  }, {
    key: "updateTitle",
    value: function updateTitle(title) {
      this.title = title;
      this.informStepManager();
    }
  }, {
    key: "updateSummary",
    value: function updateSummary(summary) {
      this.summary = summary;
      this.informStepManager();
    }
  }, {
    key: "addCallback",
    value: function addCallback(callback) {
      if (!(callback instanceof _callback["default"])) {
        throw new Error("Callback must be an instance of Callback");
      }
      this.callbacks.push(callback);
      this.informStepManager();
    }
  }, {
    key: "removeCallback",
    value: function removeCallback(callback) {
      var index = this.callbacks.indexOf(callback);
      if (index === -1) {
        return false;
      }
      this.callbacks.splice(index, 1);
      this.informStepManager();
      return true;
    }
  }, {
    key: "updateCallback",
    value: function updateCallback(callback, partial) {
      if (!this.callbacks.includes(callback)) {
        return false;
      }
      callback.update(partial);
      this.informStepManager();
      return true;
    }
  }, {
    key: "replaceCallbacks",
    value: function replaceCallbacks(callbacks) {
      this.callbacks = callbacks;
      this.informStepManager();
      return true;
    }
  }, {
    key: "addNewStep",
    value: function addNewStep() {
      this.stepManager.makeNewChildForStep(this);
      this.informStepManager();
    }
  }, {
    key: "addAsChildStep",
    value: function addAsChildStep(step) {
      this.stepNode.addNodeToTree(step.treeNode);
    }
  }, {
    key: "isAncestorOf",
    value: function isAncestorOf(step) {
      return this.stepNode.isAncestorOf(step.treeNode);
    }
  }, {
    key: "findStepById",
    value: function findStepById(id) {
      return this.stepManager.searchById(id);
    }
  }, {
    key: "addStepToIndex",
    value: function addStepToIndex(step, index) {
      this.stepNode.addTreeNodeAtIndex(step.treeNode, index);
      this.informStepManager();
    }
  }, {
    key: "moveStepAboveSelf",
    value: function moveStepAboveSelf(step) {
      this.stepNode.moveNodeAboveSelf(step.treeNode);
      this.informStepManager();
    }
  }, {
    key: "moveStepBelowSelf",
    value: function moveStepBelowSelf(step) {
      this.stepNode.moveNodeBelowSelf(step.treeNode);
      this.informStepManager();
    }
  }, {
    key: "remove",
    value: function remove() {
      this.stepNode.disconnectSelfFromTree();
      this.stepManager.unregisterInstance(this);
      this.informStepManager();
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      return this.stepNode.treeNode.getPath().length === 1;
    }
  }, {
    key: "informStepManager",
    value: function informStepManager() {
      this.stepManager.updateFunctions.forEach(function (updateFn) {
        return updateFn();
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var title = this.title,
        summary = this.summary,
        id = this.id;
      var steps = this.steps.map(function (step) {
        return step && step.toJSON();
      });
      var callbacks = this.callbacks.map(function (callback) {
        return callback.toJSON();
      });
      return {
        id: id,
        title: title,
        summary: summary,
        steps: steps,
        callbacks: callbacks
      };
    }
  }]);
}();