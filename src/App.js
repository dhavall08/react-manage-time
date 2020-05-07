import React from 'react';
import {Route} from 'react-router-dom';
import TimeManager from './containers/TimeManager';
import './App.css';
import usePageViews from './components/PageView';

function App() {
  usePageViews();
  return <Route path="/" component={TimeManager} />;
}

export default App;
