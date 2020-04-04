import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TimeManage from './containers/TimeManage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={TimeManage} />
    </BrowserRouter>
  );
}

export default App;
