import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Form } from 'antd';
import { getAnovaToken } from '../utils/utils';
import ANovaLogo from '../assets/img/logo-lower.png';
import '../stylesheets/Login.css';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom';

const Login = props => {
  const { history } = props;

  const [errorMsg, setErrorMsg] = useState('');
  const [redirect, setRedirect] = useState(false);

  const clientId =
    '128601698558-80ae6kq3v7p8iuknfpkqu6bsfg05vgra.apps.googleusercontent.com'; // Put client ID here

  const onSuccess = res => {
    axios
      .post('/api/v1/auth/login', {
        googleToken: res.tokenId,
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        history.push('/SiteLessons');
      })
      .catch(err => {
        setErrorMsg('Email not registered.');
      });
  };

  const onFailure = res => {
    console.log('Login failed: res:', res);
  };

  useEffect(() => {
    if (getAnovaToken() !== null) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Redirect to="/Profile" />;
  }
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <img alt={'ANova Logo'} src={ANovaLogo} className="log_logo" />
        <div className="login-title">
          <div className="anova">ANova </div>
          <div className="labs">Labs </div>
        </div>
        <Form className="login-form">
          <div className="error">{errorMsg}</div>
          <Form.Item className="login-field-container">
            <GoogleLogin
              className="login-google"
              clientId={clientId}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
            />
          </Form.Item>
          <Form.Item className="login-field-container">
            <a href="./SignUp">Register here!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default withRouter(Login);
