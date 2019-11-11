import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { getJWT } from '../utils/utils';
import * as decode from 'jwt-decode';
import { Modal} from 'antd';

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
      redirect: false,
      sites: [],
      role: '',
      site: 1
    };

    this._change = this._change.bind(this);

    this._submit = this._submit.bind(this);

    this._validateUser = this._validateUser.bind(this);
  }

  componentDidMount() {
    if (getJWT() !== null) {
      this.setState({ redirect: true })
    };
    fetch('http://localhost:5000/api/v1/site/allSites')
          .then(res => res.json())
          .then(
            sites => {
              this.setState({
                sites
              });
            },
            error => {
              this.setState({
                error
              });
            }
          );
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

  add_user_site(d_token) {
    let curr_date = new Date();
    let month = curr_date.getMonth();
    let year = Number(curr_date.getYear()) + 1900;
    if (month < 7){
        year = 'Spring ' + year;
    } else {
        year = 'Fall ' + year;
    }
    console.log(this.state.site);
    fetch('http://localhost:5000/api/v1/site/addUserSemSite', {
          method: 'POST',
          body: JSON.stringify({ user_id: d_token.id, semester: year, site_id: this.state.site}),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
      .then(res => {
        return
      })
      .catch(err => {
        console.log(err);
      });
  }

  async _submit(event) {
    if (this.state.name == '' || this.state.email == '' ||  this.state.password == '' ||  this.state.role == '') {
      Modal.error({
          title: 'Please fill out all fields.',
          centered: true
        });
      return;
    } else {
        event.preventDefault();
        const isValid = await this._validateUser();
        if (isValid) {
          axios
            .post('http://localhost:5000/api/v1/auth/signup', {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              role: this.state.role
            })
            .then(res => {
              // storing token from server

              localStorage.setItem('anovaToken', res.data.token);
              this.props.history.push('/');
              const tok_payload = decode(res.data.token);
              this.add_user_site(tok_payload);
            })
            .catch(err => {

              localStorage.removeItem('anovaToken');
              console.log(err);
            });
        } else {
          console.log(this.state.errorMessage);
        }
     }
  }

  loadSites = () => {

    let options = [];
    let sites2 = this.state.sites;
    for (let i = 0; i < sites2.length; i++) {
      options.push(<option value={sites2[i].id}>{sites2[i].schoolName}</option>);
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
              <label htmlFor="name">Name
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
              <label htmlFor="email">
                Email
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
              <label htmlFor="password">Password
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
              <label> Site
              <select onChange={this._change} id="site" name="site">
                {this.loadSites()}
              </select>
              </label>
            </div>
            <div>
              <label> Role
              <select onChange={this._change} id="role" name="role">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
              </label>
            </div>
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
