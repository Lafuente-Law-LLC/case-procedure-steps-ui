"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addChildToTreeNode = void 0;
var _treeModel = _interopRequireDefault(require("tree-model"));
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultNewStepShape = function defaultNewStepShape() {
  return {
    id: (0, _uuid.v4)()
  };
};
var returnRootNode = function returnRootNode(node) {
  if (node.getPath().length == 1) {
    return node;
  }
  return node.getPath().slice(0, 1)[0];
};
var returnParentNode = function returnParentNode(node) {
  if (node.getPath().length == 1) {
    return node;
  }
  return node.getPath().slice(-2, -1)[0];
};
var returnNewTreeNode = function returnNewTreeNode() {
  return new _treeModel["default"]().parse(defaultNewStepShape());
};
var disconnectNode = function disconnectNode(node) {
  node.drop();
};
var addChildToTreeNode = exports.addChildToTreeNode = function addChildToTreeNode(parentNode, childNode) {
  return parentNode.addChild(childNode);
};

/**
 * This class is a wrapper around the TreeNode class from the tree-model
 * library. It provides a more intuitive interface for interacting with the tree
 * structure.
 */
var StepNode = exports["default"] = /*#__PURE__*/function () {
  function StepNode(node) {
    _classCallCheck(this, StepNode);
    if (!node) throw new Error("Node is required");
    this.treeNode = node;
    this.rootTreeNode = returnRootNode(node);
  }
  return _createClass(StepNode, [{
    key: "addNewChildNodeToTreeNode",
    value: function addNewChildNodeToTreeNode() {
      return addChildToTreeNode(this.treeNode, returnNewTreeNode());
    }
  }, {
    key: "addNodeToTree",
    value: function addNodeToTree(treeNode) {
      disconnectNode(treeNode);
      addChildToTreeNode(this.treeNode, treeNode);
    }
  }, {
    key: "newStepNodeChild",
    value: function newStepNodeChild() {
      return new StepNode(this.addNewChildNodeToTreeNode());
    }
  }, {
    key: "disconnectSelfFromTree",
    value: function disconnectSelfFromTree() {
      return disconnectNode(this.treeNode);
    }
  }, {
    key: "parentTreeNode",
    get: function get() {
      return returnParentNode(this.treeNode);
    }
  }, {
    key: "childrenTreeNodes",
    get: function get() {
      return this.treeNode.children;
    }
  }, {
    key: "siblingTreeNodes",
    get: function get() {
      return this.parentTreeNode.children;
    }
  }, {
    key: "indexAmongSiblings",
    get: function get() {
      return this.treeNode.getIndex();
    }

    /** @returns The basic step object which is the model of the TreeNode. */
  }, {
    key: "basicStepObject",
    value: function basicStepObject() {
      return this.treeNode.model;
    }
  }, {
    key: "isAncestorOf",
    value: function isAncestorOf(node) {
      return this.treeNode.getPath().includes(node);
    }
  }, {
    key: "siblingTreeNodeAtIndex",
    value: function siblingTreeNodeAtIndex(index) {
      return this.siblingTreeNodes[index];
    }
  }, {
    key: "addTreeNodeAtIndex",
    value: function addTreeNodeAtIndex(node, index) {
      try {
        var isChild = this.isChild(node);
        if (isChild) {
          return node.setIndex(index);
        } else {
          node.drop();
          return this.treeNode.addChildAtIndex(node, index);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }, {
    key: "isChild",
    value: function isChild(node) {
      return this.treeNode.children.includes(node);
    }
  }, {
    key: "moveNodeAboveSelf",
    value: function moveNodeAboveSelf(node) {
      try {
        disconnectNode(node);
        return this.parentTreeNode.addChildAtIndex(node, this.indexAmongSiblings);
      } catch (e) {
        console.warn(e);
      }
    }
  }, {
    key: "moveNodeBelowSelf",
    value: function moveNodeBelowSelf(node) {
      try {
        disconnectNode(node);
        return this.parentTreeNode.addChildAtIndex(node, this.indexAmongSiblings + 1);
      } catch (e) {
        console.warn(e);
      }
    }
  }, {
    key: "findTreeNodeById",
    value: function findTreeNodeById(id) {
      return this.rootTreeNode.first(function (node) {
        return node.model.id === id;
      });
    }
  }]);
}();