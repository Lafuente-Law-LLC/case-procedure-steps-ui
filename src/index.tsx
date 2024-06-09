import CaseProcedureApp from "./CaseProcedureApp";
import React from "react";
import { createRoot } from "react-dom/client";
import "./css/main.scss";

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
