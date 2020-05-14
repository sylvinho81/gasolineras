import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Home} from './pages/Home'
import { Switch, Route } from 'react-router-dom'
import { Detail } from './pages/Detail'
import {NotFound} from './pages/NotFound'
import {Province} from './pages/Province'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/:label-en-:location-:ideess' component={Detail} />
      <Route exact path='/gasolineras-en-:province' component={Province} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
