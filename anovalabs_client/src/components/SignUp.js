import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { getJWT } from '../utils/utils';

import '../stylesheets/SignUp.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      emailStatus: '',
      passwordStatus: '',
      redirect: false
    };

    this._change = this._change.bind(this);

    this._submit = this._submit.bind(this);

    this._validateUser = this._validateUser.bind(this);
  }

  componentDidMount() {
    if (getJWT() !== null) {
      this.setState({ redirect: true })
    }
  }

  async _validateUser() {
    const userSchema = Yup.object({
      email: Yup.string()
        .email()
        .required('No email provided'),
      password: Yup.string()
        .required('No password provided.')
        .min(10, 'Password should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password must contain numbers or letters')
    });
    const { email, password } = this.state;
    try {
      const isValid = await userSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      if (isValid) {
        this.setState({
          emailStatus: '',
          passwordStatus: ''
        });
        return true;
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const presentState = { passwordStatus: '', emailStatus: '' };
        error.inner.map(item => {
          if (item.path === 'password') {
            presentState.passwordStatus = item.message;
          } else if (item.path === 'email') {
            presentState.emailStatus = item.message;
          }
        });
        this.setState({
          emailStatus: presentState.emailStatus,
          passwordStatus: presentState.passwordStatus
        });
        return false;
      }
    }
    return false;
  }

  // takes an event and creates a key,value pair
  _change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async _submit(event) {
    event.preventDefault();
    const isValid = await this._validateUser();
    if (isValid) {
      axios
        .post('http://localhost:5000/api/v1/auth/signup', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          // storing token from server
          localStorage.setItem('anovaToken', res.data.token);
          this.props.history.push('/');
        })
        .catch(err => {
          localStorage.removeItem('anovaToken');
          console.log(err);
        });
    } else {
      console.log(this.state.errorMessage);
    }
  }

  loadSites = () => {
    let options = [];
    let sites = ['site1', 'site2', 'site3'];
    for (let i = 0; i < sites.length; i++) {
      options.push(<option value={sites[i]}>{sites[i]}</option>);
    }
    return options;
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push('/profile');
    }
    return (
      <div className="container">
        <div className="signUpBox">
          <img src = "../public/img/logo-lower.png" className = "signup-logo"/>
          <div className = "title">
            <div className = "anova">ANova </div>
            <div className = "labs">Labs </div>
          </div>
          <form onSubmit={this._submit}>
            <div>
              <label htmlFor="email">
                email
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={this._change}
                  value={this.state.email}
              />
              </label>
            </div>
            <div>{this.state.emailStatus}</div>
            <div>
              <label htmlFor="password">password
              <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={this._change}
                  value={this.state.password}
              />
              </label>
              <div>{this.state.passwordStatus}</div>
            </div>
            <div>
              <label htmlFor="name">name
              <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this._change}
                  value={this.state.name}
              />
              </label>
            </div>
            <div>
              <label> site
              <select onChange={this._change} id="site" name="site">
                {this.loadSites()}
              </select>
              </label>
            </div>
            <div>
              <label> role
              <select onChange={this._change} id="role" name="role">
                <option value="mentee">mentee</option>
                <option value="mentor">mentor</option>
              </select>
              </label>
            </div>
            <div>
              <label htmlFor="picture">picture
              <input
                  id="picture"
                  type="url"
                  name="picture"
                  onChange={this._change}
                  value={this.state.picture}
              />
              </label>
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
