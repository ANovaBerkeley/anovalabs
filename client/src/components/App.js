import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import Login from './Login';
import SiteLessons from './SiteLessons';
import LessonPool from './LessonPool';
import Profile from './Profile';
import Roster from './Roster';
import LessonPage from './LessonPage';
import Feedback from './Feedback';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
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
            <Route path="/LessonPage">
              <AuthComponent component={LessonPage} />
            </Route>
            <Route path="/Feedback">
              <AuthComponent component={Feedback} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
