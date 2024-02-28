"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DragItemBody = void 0;
var react_1 = require("react");
var DragItem_1 = require("../DragItem");
var dragItemUtil_1 = require("../dragItemUtil");
exports.DragItemBody = function (_a) {
    var step = _a.step;
    var onDragOver = react_1.useCallback(function (e) {
        e.preventDefault();
    }, []);
    var onDrop = react_1.useCallback(function (e) {
        e.preventDefault();
        var draggingElement = document.querySelector(".dragging");
        if (!draggingElement)
            return;
        var currentTarget = e.currentTarget;
        if (!currentTarget)
            return;
        if (draggingElement === currentTarget)
            return;
        if (!currentTarget.classList.contains("drag__item__body"))
            return;
        var listofElementsWithAboveClass = document.querySelectorAll(".above");
        var listofElementsWithBelowClass = document.querySelectorAll(".below");
        listofElementsWithAboveClass.forEach(function (element) {
            return element.classList.remove("above");
        });
        listofElementsWithBelowClass.forEach(function (element) {
            return element.classList.remove("below");
        });
        var dragItemHeadChildren = __spreadArrays(currentTarget.querySelectorAll(".drag__item__head")).filter(function (element) { return element !== draggingElement; });
        var dragItemHead = dragItemUtil_1.closestElement({ x: e.clientX, y: e.clientY }, dragItemHeadChildren);
        if (!dragItemHead)
            return;
        var aboveOrBelow = dragItemUtil_1.compareVerticalPosition({ x: e.clientX, y: e.clientY }, dragItemHead) ==
            1
            ? "above"
            : "below";
        var draggingElementStepId = draggingElement.getAttribute("data-step-id");
        var dragItemHeadStepId = dragItemHead.getAttribute("data-step-id");
        if (!draggingElementStepId || !dragItemHeadStepId)
            return;
        var draggingStep = step.findStepById(draggingElementStepId);
        var dragItemHeadStep = step.findStepById(dragItemHeadStepId);
        if (!draggingStep || !dragItemHeadStep)
            return;
        if (aboveOrBelow === "above") {
            dragItemHeadStep.moveStepAboveSelf(draggingStep);
        }
        else {
            dragItemHeadStep.moveStepBelowSelf(draggingStep);
        }
    }, [step]);
    var onDragEnter = react_1.useCallback(function (e) {
        e.preventDefault();
        var target = e.target;
        var draggingElement = document.querySelector(".dragging");
        if (!draggingElement)
            return;
        var currentTarget = e.currentTarget;
        if (!currentTarget)
            return;
        if (draggingElement === currentTarget)
            return;
        var listofElementsWithAboveClass = document.querySelectorAll(".above");
        var listofElementsWithBelowClass = document.querySelectorAll(".below");
        listofElementsWithAboveClass.forEach(function (element) {
            return element.classList.remove("above");
        });
        listofElementsWithBelowClass.forEach(function (element) {
            return element.classList.remove("below");
        });
        if (!currentTarget.classList.contains("drag__item__body"))
            return;
        var dragItemHeadChildren = __spreadArrays(currentTarget.querySelectorAll(".drag__item__head")).filter(function (element) { return element !== draggingElement; });
        var dragItemHead = dragItemUtil_1.closestElement({ x: e.clientX, y: e.clientY }, dragItemHeadChildren);
        if (!dragItemHead)
            return;
        var aboveOrBelow = dragItemUtil_1.compareVerticalPosition({ x: e.clientX, y: e.clientY }, dragItemHead) == 1
            ? "above"
            : "below";
        if (aboveOrBelow === "above") {
            dragItemHead.classList.add("above");
        }
        else {
            dragItemHead.classList.add("below");
        }
    }, []);
    var onDragLeave = react_1.useCallback(function (e) {
        e.preventDefault();
        var draggingElement = document.querySelector(".dragging");
        if (!draggingElement)
            return;
        var currentTarget = e.currentTarget;
        if (draggingElement === currentTarget)
            return;
        if (!currentTarget.classList.contains("drag__item__body"))
            return;
    }, []);
    return (react_1["default"].createElement("div", { className: "drag__item__body collapse", id: "body_" + step.id, "data-step-id": step.id, onDragOver: onDragOver, onDragEnter: onDragEnter, onDragLeave: onDragLeave, onDrop: onDrop }, step.steps &&
        step.steps.map(function (step) {
            return step && react_1["default"].createElement(DragItem_1.DragItem, { step: step, key: step.id });
        })));
};
