import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Auth} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
