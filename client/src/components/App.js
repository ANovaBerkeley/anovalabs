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
import Feedback from './Feedback';

function App() {
  const DefaultContainer = () => (
    <div>
      <Switch>
        <AuthComponent exact path="/" component={SiteLessons} />
        <AuthComponent path="/SiteLessons" component={SiteLessons} />
        <AuthComponent path="/LessonPool" component={LessonPool} />
        <AuthComponent path="/Profile" component={Profile} />
        <AuthComponent path="/Roster" component={Roster} />
        <AuthComponent path="/Feedback/:id" component={Feedback} />
      </Switch>
    </div>
  );

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <div>
            <NavBar />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route component={DefaultContainer} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
