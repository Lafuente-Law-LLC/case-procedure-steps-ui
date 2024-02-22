import React from 'react';
import ReactDOM from 'react-dom';
import sampleStep from '../ignore/rootStep';

import RootNodeStep from './step/rootNodeStep';
const App: React.FC = () => {
  return <h1>Hello</h1>;
};

const rt = new RootNodeStep(sampleStep).rootStep
const steps = rt?.steps
const recursive = (step: any) => {
  console.log(step)
  step.steps.forEach((s: any) => {
    recursive(s)
  })
}

steps?.forEach((step: any) => {
  recursive(step)
})
ReactDOM.render(<App />, document.getElementById('root'));

