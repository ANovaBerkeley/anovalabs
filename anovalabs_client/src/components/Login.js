import React, { Component } from 'react';
import axios from 'axios';
import * as decode from 'jwt-decode';
import { getJWT } from '../utils/utils';

import '../stylesheets/Login.css';

class Login extends Component {
  constructor(props) {
    console.log("login constructor");
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: '',
      redirect: false
    };

    this._change = this._change.bind(this);
    this._submit = this._submit.bind(this);
  }

  // takes an event and creates a key,value pair
  _change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  _submit(event) {
    console.log("submit event");
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        console.log(res.data.token);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ errorMsg: 'Invalid Login' });
      });
      const anovaToken = localStorage.getItem('anovaToken');
      const anovaPayload = decode(anovaToken);
      console.log("anovaToken: " + anovaToken);
      console.log("anovaPayload: " + anovaPayload);
  }

  componentDidMount() {
    if (getJWT() !== null) {
      this.setState({ redirect: true })
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push('/profile');
    }
    return (

      <div className="container">
        <div className= "loginBox">
          <img src = "../public/img/logo-lower.png" className = "logo"/>
          <div className = "title">
            <div className = "anova">ANova </div>
            <div className = "labs">Labs </div>
          </div>
          <form onSubmit={this._submit}>
            <div>
              <label for = "email">Email</label>
              <input
                type="text"
                name="email"
                onChange={this._change}
                value={this.state.email}
              />
            </div>
            <div>
              <label for = "password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this._change}
                value={this.state.password}
              />
              <div className = "error">{this.state.errorMsg}</div>
            </div>
            <div className = "remember"> <input type="checkbox"/> Remember Me</div>
            <div><input type="submit" value="submit" /></div>
          </form>
          <div className = "links">
            <a href="./SignUp" className = "linktext">Register</a>
            <a href="" className = "linktext">Forgot Password?</a>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;
