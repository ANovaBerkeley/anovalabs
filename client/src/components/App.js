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
  const DefaultContainer = () => (
    <div>
      <Switch>
        <AuthComponent exact path="/" component={SiteLessons} />
        <AuthComponent path="/SiteLessons" component={SiteLessons} />
        <AuthComponent path="/LessonPool" component={LessonPool} />
        <AuthComponent path="/Profile" component={Profile} />
        <AuthComponent path="/Roster" component={Roster} />
      </Switch>
    </div>
  );

  return (
    <div>
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/">
              <AuthComponent type="lessons" />
            </Route>
            <Route path="/SiteLessons">
              <AuthComponent type="lessons" />
            </Route>
            <Route path="/LessonPool">
              <AuthComponent type="lessonpool" />
            </Route>
            <Route path="/Profile">
              <AuthComponent type="profile" />
            </Route>
            <Route path="/Roster">
              <AuthComponent type="roster" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
