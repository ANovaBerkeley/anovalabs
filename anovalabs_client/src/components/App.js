import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';

function App() {
  const LoginContainer = () => <Route path="/Login" component={Login} />;

  const SignUpContainer = () => <Route path="/SignUp" component={SignUp} />;

  const DefaultContainer = () => (
    <div>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <AuthComponent exact path="/" type="lessons" />
          <AuthComponent path="/SiteLessons" type="lessons" />
          <AuthComponent path="/LessonPool" type="lessonpool" />
          <AuthComponent path="/Profile" type="profile" />
          <AuthComponent path="/Roster" type="roster" />
        </Switch>
      </BrowserRouter>
    </div>
  );

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path="/Login" component={LoginContainer} />
            <Route exact path="/SignUp" component={SignUpContainer} />
            <Route component={DefaultContainer} />
          </div>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
