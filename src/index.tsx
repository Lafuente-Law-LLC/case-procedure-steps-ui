import React from 'react';
import ReactDOM from 'react-dom';
import sampleStep from '../ignore/rootStep';

import {Step, RootStep} from "./step/step";
const App: React.FC = () => {
  return <h1>Hello</h1>;
};

const rt = new RootStep(sampleStep); 
const child = rt.steps[1];
const child2 = rt.steps[2];
const step = child.step
const step2 = child2.step
step.addStep(step2);

ReactDOM.render(<App />, document.getElementById('root'));

