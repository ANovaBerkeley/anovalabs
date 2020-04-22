import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';

function App() {
  const DefaultContainer = () => (
    <div>
      <Switch>
        <AuthComponent exact path="/" type="lessons" />
        <AuthComponent path="/SiteLessons" type="lessons" />
        <AuthComponent path="/LessonPool" type="lessonpool" />
        <AuthComponent path="/Profile" type="profile" />
        <AuthComponent path="/Roster" type="roster" />
        <AuthComponent path="/Feedback/:id" type="feedback" />
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
