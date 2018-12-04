import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthComponent from './AuthComponent';
import Lessons from './Lessons';
import Home from './Home';
import Protected from './Protected';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" component={Login} />
          <AuthComponent>
            <Route path="/Protected" component={Protected} />
          </AuthComponent>
          <Route path="/Lessons" component={Lessons} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
