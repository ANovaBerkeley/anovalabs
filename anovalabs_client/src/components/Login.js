import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Icon, Button } from 'antd';
import { getJWT } from '../utils/utils';

import '../stylesheets/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      redirect: false,
    };

    this._submit = this._submit.bind(this);
    this._changeEmail = this._changeEmail.bind(this);
    this._changePassword = this._changePassword.bind(this);
  }

  // takes an event and creates a key,value pair

  _changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  _changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  _submit(event) {
    console.log(this.state.email);
    console.log(this.state.password);
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        this.props.history.push('/SiteLessons');
      })
      .catch(error => {
        this.setState({ errorMsg: 'Invalid Login' });
      });
  }

  componentDidMount() {
    if (getJWT() !== null) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push('/profile');
    }
    return (
      <div className="container">
        <div className="loginBox">
          <img
            alt={'ANova Logo'}
            src="../public/img/logo-lower.png"
            className="log_logo"
          />
          <div className="title">
            <div className="anova">ANova </div>
            <div className="labs">Labs </div>
          </div>
          <Form onSubmit={this._submit} className="login-form">
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                onChange={this._changeEmail}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={this._changePassword}
              />
            </Form.Item>
            <div className="error">{this.state.errorMsg}</div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <a href="./SignUp">Register here!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;
