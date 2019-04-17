import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthComponent from './AuthComponent';
import Lessons from './Lessons';
import Home from './Home';
import Protected from './Protected';
import SignUp from './SignUp';
import LogOut from './LogOut';
import NavBar from './NavBar';

import LessonPool from './LessonPool';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <AuthComponent exact path="/" type="lessons" />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Login" component={Login} />
            <AuthComponent path="/Lessons" type="lessons" />
            <AuthComponent path="/LessonPool" component={LessonPool} />

            <AuthComponent path="/profile" type="profile" />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
