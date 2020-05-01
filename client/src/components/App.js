import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';
import SiteLessons from './SiteLessons';
import LessonPool from './LessonPool';
import Profile from './Profile';
import Roster from './Roster';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/">
              <AuthComponent component={SiteLessons} />
            </Route>
            <Route path="/SiteLessons">
              <AuthComponent component={SiteLessons} />
            </Route>
            <Route path="/LessonPool">
              <AuthComponent component={LessonPool} />
            </Route>
            <Route path="/Profile">
              <AuthComponent component={Profile} />
            </Route>
            <Route path="/Roster">
              <AuthComponent component={Roster} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;