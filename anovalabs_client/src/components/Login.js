import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from "react-router"


import './Login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
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
    event.preventDefault();
    axios
      .post('api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        this.props.history.push('/lessons');
      })
      .catch(error => {
        this.setState({ errorMsg: 'Invalid Login' });
      });
  }



  render() {
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
            <input type="submit" value="Submit" />
          </form>
          <div className = "links">
            <NavLink to = "/SignUp"><a href="" className = "linktext">Register</a></NavLink>

            <a href="" className = "linktext">Forgot Password?</a>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;
