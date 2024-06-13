import CaseProcedureApp from "./CaseProcedureApp";
import React from "react";
import { createRoot } from "react-dom/client";
import "./css/main.scss";
import { runConfig } from "./config/config";

runConfig();
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <CaseProcedureApp
    title=""
    description=""
    initialData={{}}
    onSubmitFunction={() => {}}
  />,
);

export { CaseProcedureApp };
