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

class App extends Component {
  render() {
    return (
      <div>
        <NavBar className="navbar"/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Login" component={Login} />
            <Route path="/Lessons" component={Lessons} />
            <AuthComponent>
              <Route path="/Protected" component={Protected} />
              <Route path="/Logout" component={LogOut} />
            </AuthComponent>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
