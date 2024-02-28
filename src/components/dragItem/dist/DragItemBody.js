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
        try {
            e.preventDefault();
            var _a = dragItemUtil_1.returnDraggingElementAndCurrentTarget(e), draggingElement_1 = _a.draggingElement, currentTarget = _a.currentTarget;
            var dragItemHeadChildren = __spreadArrays(currentTarget.querySelectorAll(".drag__item__head")).filter(function (element) { return element !== draggingElement_1; });
            var dragItemHead = dragItemUtil_1.closestElement({ x: e.clientX, y: e.clientY }, dragItemHeadChildren);
            if (!dragItemHead)
                return;
            var aboveOrBelow = dragItemUtil_1.aboveOrBelowFromPoint({ x: e.clientX, y: e.clientY }, dragItemHead);
            var _b = dragItemUtil_1.returnStepsFromElements(draggingElement_1, dragItemHead, step), draggingStep = _b.step1, dragItemHeadStep = _b.step2;
            aboveOrBelow === "above"
                ? dragItemUtil_1.addAboveStep(dragItemHeadStep, draggingStep)
                : dragItemUtil_1.addBelowStep(dragItemHeadStep, draggingStep);
        }
        catch (e) {
            console.log(e);
            return;
        }
    }, [step]);
    var onDragEnter = react_1.useCallback(function (e) {
        e.preventDefault();
        dragItemUtil_1.removeClassesFromElements(["above", "below"]);
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
    var onDragEnd = react_1.useCallback(function (e) {
        dragItemUtil_1.removeClassesFromElements(["dragging", "drag-over", "above", "below"]);
    }, []);
    return (react_1["default"].createElement("div", { className: "drag__item__body collapse", id: "body_" + step.id, "data-step-id": step.id, onDragOver: onDragOver, onDragEnter: onDragEnter, onDrop: onDrop, onDragEnd: onDragEnd }, step.steps &&
        step.steps.map(function (step) {
            return step && react_1["default"].createElement(DragItem_1.DragItem, { step: step, key: step.id });
        })));
};
