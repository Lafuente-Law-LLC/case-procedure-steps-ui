"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var rootStep_1 = require("../ignore/rootStep");
var react_bootstrap_1 = require("react-bootstrap");
var rootNodeStep_1 = require("./step/rootNodeStep");
var App = function () {
    return react_1["default"].createElement("h1", null, "Hello");
};
var rt = new rootNodeStep_1["default"](rootStep_1["default"]).rootStep;
var accordionFn;
(function (step) {
    if (step.steps.length > 0) {
        return (react_1["default"].createElement(react_bootstrap_1.Accordion, null,
            react_1["default"].createElement(react_bootstrap_1.Accordion.Item, { eventKey: "0" },
                react_1["default"].createElement(react_bootstrap_1.Accordion.Header, null, step.title),
                react_1["default"].createElement(react_bootstrap_1.Accordion.Body, null, step.steps.map(function (step) {
                    return accordionFn(step);
                })))));
    }
    else {
        return (react_1["default"].createElement(react_bootstrap_1.Accordion, null,
            react_1["default"].createElement(react_bootstrap_1.Accordion.Item, { eventKey: "0" },
                react_1["default"].createElement(react_bootstrap_1.Accordion.Header, null, step.title),
                react_1["default"].createElement(react_bootstrap_1.Accordion.Body, null, step.summary))));
    }
});
react_dom_1["default"].render(react_1["default"].createElement(App, null), document.getElementById('root'));
