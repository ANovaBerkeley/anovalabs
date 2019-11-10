import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import AuthComponent from './AuthComponent';
import SiteLessons from './SiteLessons';
import LessonPool from './LessonPool';
import Protected from './Protected';
import SignUp from './SignUp';
import LogOut from './LogOut';
import NavBar from './NavBar';

class App extends Component {
  render() {
    const LoginContainer = () => (
      <Route path="/Login" component={Login} />
    )

    const SignUpContainer = () => (
      <Route path="/SignUp" component={SignUp} />
    )

    const DefaultContainer = () => (
      <div>
        <NavBar />
        <BrowserRouter>
          <Switch>
              <AuthComponent exact path="/" type="lessons" />
              <AuthComponent path="/SiteLessons" type="lessons" />
              <AuthComponent path="/LessonPool" type="lessonpool"/>
              <AuthComponent path="/profile" type="profile" />
              <AuthComponent path="/Roster" type="roster" />
            </Switch>
        </BrowserRouter>
      </div>
    )

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <div>
              <Route exact path="/Login" component={LoginContainer}/>
              <Route exact path="/SignUp" component={SignUpContainer}/>
              <Route component={DefaultContainer}/>
            </div>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
