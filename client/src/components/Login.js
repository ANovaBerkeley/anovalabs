import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'antd';
import { getAnovaToken } from '../utils/utils';
import ANovaLogo from '../assets/img/logo-lower.png';
import '../stylesheets/Login.css';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      redirect: false,
    };
  }

  clientId = ''; // TODO: Put client ID here.

  onSuccess = res => {
    axios
      .post('/api/v1/auth/login', {
        googleToken: res.tokenId,
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        this.props.history.push('/SiteLessons');
      })
      .catch(err => {
        this.setState({ errorMsg: 'Email not registered.' });
      });
  };

  onFailure = res => {
    console.log('Login failed: res:', res);
  };

  componentDidMount() {
    if (getAnovaToken() !== null) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push('/profile');
    }
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <img alt={'ANova Logo'} src={ANovaLogo} className="log_logo" />
          <div className="title">
            <div className="anova">ANova </div>
            <div className="labs">Labs </div>
          </div>
          <Form onSubmit={this._submit} className="login-form">
            <div className="error">{this.state.errorMsg}</div>
            <Form.Item className="login-field-container">
              <GoogleLogin
                className="login-google"
                clientId={this.clientId}
                buttonText="Login"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
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
  }
}
export default withRouter(Login);
