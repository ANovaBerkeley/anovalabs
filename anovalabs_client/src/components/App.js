import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthComponent from './AuthComponent';
import Lessons from './Lessons';
import LessonPool from './LessonPool';
import Protected from './Protected';
import SignUp from './SignUp';
import LogOut from './LogOut';
import NavBar from './NavBar';

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
            <AuthComponent path="/LessonPool" type="lessonpool"/>
            <AuthComponent path="/profile" type="profile" />
            <AuthComponent path="/Roster" type="roster" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
