import React from 'react';
import ReactDOM from 'react-dom';
import sampleStep from '../ignore/rootStep';

import {Step, RootStep} from "./step/step";
const App: React.FC = () => {
  return <h1>Hello</h1>;
};

const rt = new RootStep(sampleStep); 
console.log(rt.children);
ReactDOM.render(<App />, document.getElementById('root'));

