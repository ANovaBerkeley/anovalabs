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
import Roster from './Roster';
import LessonPool from './LessonPool';


import Profile from './Profile';
import Roster from './Roster';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Lessons} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Login" component={Login} />
            <Route path="/Protected" component={Protected} />
            <Route path="/Lessons" component={Lessons} />
            <Route path="/Logout" component={LogOut} />

            <Route path="/LessonPool" component={LessonPool} />


            <Route path="/Profile" component={Profile} />
            <Route path="/Roster" component={Roster} />


          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
