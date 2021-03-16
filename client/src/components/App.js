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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/">
              <AuthComponent Component={SiteLessons} />
            </Route>
            <Route path="/SiteLessons">
              <AuthComponent Component={SiteLessons} />
            </Route>
            <Route path="/LessonPool">
              <AuthComponent Component={LessonPool} />
            </Route>
            <Route path="/Profile">
              <AuthComponent Component={Profile} />
            </Route>
            <Route path="/Roster">
              <AuthComponent Component={Roster} />
            </Route>
            <Route path="/LessonPage/:id">
              <AuthComponent Component={LessonPage} />
            </Route>
            <Route path="/LessonFeedback/:id">
              <AuthComponent Component={Feedback} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
