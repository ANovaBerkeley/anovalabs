import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';

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
