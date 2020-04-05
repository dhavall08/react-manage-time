import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import TimeManager from './containers/TimeManager';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={TimeManager} />
    </BrowserRouter>
  );
}

export default App;
