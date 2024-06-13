"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CaseProcedureApp", {
  enumerable: true,
  get: function get() {
    return _CaseProcedureApp["default"];
  }
});
var _CaseProcedureApp = _interopRequireDefault(require("./CaseProcedureApp"));
var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
require("./css/main.scss");
var _config = require("./config/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _config.runConfig)();
var root = (0, _client.createRoot)(document.getElementById("root"));
root.render( /*#__PURE__*/_react["default"].createElement(_CaseProcedureApp["default"], {
  title: "",
  description: "",
  initialData: {},
  onSubmitFunction: function onSubmitFunction() {}
}));