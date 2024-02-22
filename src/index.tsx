import React from "react";
import ReactDOM from "react-dom";
import sampleStep from "../ignore/rootStep";
import "bootstrap/scss/bootstrap.scss";
import { Accordion } from "react-bootstrap";
import { Step } from "./step/step";
import RootNodeStep from "./step/rootNodeStep";

const rt = new RootNodeStep(sampleStep).rootStep;
const firstStep = rt!.steps[0];
const lastStep = rt!.steps[rt!.steps.length - 1];

lastStep.moveStepBelow(firstStep);

const accordionFn = (step: Step) => {
  if (step.steps.length > 0) {
    return (
      <Accordion key={step.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{step.title}</Accordion.Header>
          <Accordion.Body>
            {step.steps.map((step) => {
              return accordionFn(step);
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  } else {
    return (
      <Accordion key={step.id}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{step.title}</Accordion.Header>
          <Accordion.Body>{step.summary}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
};
const App: React.FC = () => {
  return <div>{accordionFn(rt)}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
