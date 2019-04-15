import React, { Component } from 'react';
import axios from 'axios';
import * as decode from 'jwt-decode';


import '../stylesheets/Login.css';

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
      .post('http://localhost:5000/api/v1/auth/login', {
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
      const anovaToken = localStorage.getItem('anovaToken');
      const anovaPayload = decode(anovaToken);
      console.log("payload:", anovaPayload);
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
            <div><input type="submit" value="submit" /></div>
          </form>
          <div className = "links">
            <a href="" className = "linktext">Register</a>
            <a href="" className = "linktext">Forgot Password?</a>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;
