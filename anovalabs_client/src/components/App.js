import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthComponent from './AuthComponent';
import Lessons from './Lessons';
import Home from './Home';
import Protected from './Protected';
import SignUp from './SignUp';
import LogOut from './LogOut';
import Profile from './Profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Login" component={Login} />
          <Route path="/Protected" component={Protected} />
          <Route path="/Lessons" component={Lessons} />
          <Route path="/Logout" component={LogOut} />
          <Route path="/Profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
