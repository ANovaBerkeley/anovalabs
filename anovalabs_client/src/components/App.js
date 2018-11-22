import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';
import Lessons from './Lessons';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/auth" component={Auth} />
          <Route path="/lessons" component={Lessons} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
