import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Home} from './pages/Home'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

export default App;
