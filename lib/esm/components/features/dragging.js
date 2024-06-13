"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepItemHeadDragProps = exports.StepItemDividerDragProps = exports.DRAGGING_CSS_CLASSES = void 0;
var _react = require("react");
var DRAGGING_CSS_CLASSES = exports.DRAGGING_CSS_CLASSES = {
  dragging: "dragging",
  dragOver: "drag-over",
  above: "above",
  below: "below"
};
var addDraggingElement = function addDraggingElement(e) {
  e.currentTarget.classList.add(DRAGGING_CSS_CLASSES.dragging);
};
var removeDraggingElement = function removeDraggingElement(e) {
  e.currentTarget.classList.remove(DRAGGING_CSS_CLASSES.dragging);
};
var addDataTransferEffectAllowed = function addDataTransferEffectAllowed(e, effect) {
  e.dataTransfer.effectAllowed = effect;
};
var ePreventDefault = function ePreventDefault(e) {
  e.preventDefault();
};
var StepItemHeadDragProps = exports.StepItemHeadDragProps = function StepItemHeadDragProps(refElement) {
  return {
    draggable: true,
    onDragStart: function onDragStart(e) {
      addDraggingElement(e);
      addDataTransferEffectAllowed(e, "move");
      e.dataTransfer.setData("text", refElement.current.dataset.stepId);
    },
    onDragOver: function onDragOver(e) {
      ePreventDefault(e);
      refElement.current.classList.add(DRAGGING_CSS_CLASSES.dragOver);
    },
    onDragEnter: function onDragEnter(e) {},
    onDragLeave: function onDragLeave(e) {
      refElement.current.classList.remove(DRAGGING_CSS_CLASSES.dragOver);
      refElement.current.classList.remove(DRAGGING_CSS_CLASSES.above);
      refElement.current.classList.remove(DRAGGING_CSS_CLASSES.below);
    },
    onDragEnd: function onDragEnd(e) {
      refElement.current.classList.remove(DRAGGING_CSS_CLASSES.dragOver);
      removeDraggingElement(e);
    }
  };
};
var StepItemDividerDragProps = exports.StepItemDividerDragProps = function StepItemDividerDragProps(refElement, step, setDragOver) {
  var parentStep = step.parentStep;
  if (!parentStep) throw new Error("Parent step is not defined");
  var childIndex = step.stepNode.indexAmongSiblings;
  return {
    onDragOver: (0, _react.useCallback)(function (e) {
      e.preventDefault();
    }, []),
    onDragEnter: (0, _react.useCallback)(function (e) {
      setDragOver(true);
    }, [setDragOver]),
    onDragLeave: (0, _react.useCallback)(function (e) {
      if (refElement.current == e.currentTarget) {
        setDragOver(false);
      }
    }, [setDragOver, refElement]),
    onDrop: (0, _react.useCallback)(function (e) {
      e.preventDefault();
      var stepId = e.dataTransfer.getData("text");
      if (stepId === "") return;
      var step = parentStep.stepManager.searchById(stepId);
      if (!step) return;
      parentStep.addStepToIndex(step, childIndex);
      var draggingSelector = ".".concat(DRAGGING_CSS_CLASSES.dragging);
      var draggingElement = document.querySelector(draggingSelector);
      if (draggingElement) {
        draggingElement.classList.remove(draggingSelector);
        draggingElement.classList.add("flash");
        setTimeout(function () {
          draggingElement.classList.remove("flash");
        }, 1000);
      }
      setDragOver(false);
    }, [parentStep, childIndex, setDragOver]),
    onDragEnd: (0, _react.useCallback)(function (e) {
      setDragOver(false);
    }, [setDragOver])
  };
};