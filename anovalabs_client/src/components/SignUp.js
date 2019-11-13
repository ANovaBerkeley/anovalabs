import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Modal, Select } from 'antd';
import * as decode from 'jwt-decode';
import { getJWT } from '../utils/utils';
import '../stylesheets/SignUp.css';

const { Option } = Select;

class SignUp extends Component {
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
      siteId: ''
    };

    this._change = this._change.bind(this);
    this.onSelectSiteChange = this.onSelectSiteChange.bind(this);
    this.onSelectRoleChange = this.onSelectRoleChange.bind(this);
    this._submit = this._submit.bind(this);
    this._validateUser = this._validateUser.bind(this);
  }

  componentDidMount() {
    if (getJWT() !== null) {
      this.setState({ redirect: true });
    }
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

  _change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSelectSiteChange(siteId) {
    this.setState({ siteId });
  }

  onSelectRoleChange(role) {
    this.setState({ role });
  }

  getCurrentSemester = () => {
    const currDate = new Date();
    const month = currDate.getMonth();
    const year = Number(currDate.getYear()) + 1900;
    let semester;
    if (month < 7) {
      semester = `Spring ${year}`;
    } else {
      semester = `Fall ${year}`;
    }
    return semester;
  };

  addUserSite(decodedToken) {
    const { siteId } = this.state;
    const semester = this.getCurrentSemester();
    fetch('http://localhost:5000/api/v1/site/addUserSemSite', {
      method: 'POST',
      body: JSON.stringify({
        user_id: decodedToken.id,
        semester,
        site_id: siteId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  async _submit(event) {
    const { name, email, password, role, siteId } = this.state;
    if (!name || !email || !password || !role || !siteId) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true
      });
      event.preventDefault();
    } else {
      event.preventDefault();
      const isValid = await this._validateUser();
      if (isValid) {
        axios
          .post('http://localhost:5000/api/v1/auth/signup', {
            name,
            email,
            password,
            role
          })
          .then(res => {
            // storing token from server
            localStorage.setItem('anovaToken', res.data.token);
            this.props.history.push('/SiteLessons');
            const tokPayload = decode(res.data.token);
            this.addUserSite(tokPayload);
          })
          .catch(err => {
            localStorage.removeItem('anovaToken');
          });
      } else {
        console.log(this.state.errorMessage);
      }
     }
  }

  loadSites = () => {
    const { sites } = this.state;
    const options = [];
    for (let i = 0; i < sites.length; i += 1) {
      options.push(
        <Option key={sites[i].id} value={sites[i].id}>
          {sites[i].schoolName}
        </Option>
      );
    }
    return options;
  }


  async _validateUser() {
    const userSchema = Yup.object({
      email: Yup.string()
        .email()
        .required('No email provided'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password must contain only numbers or letters')
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

  render() {
    const {
      redirect,
      name,
      email,
      password,
      emailStatus,
      passwordStatus
    } = this.state;
    if (redirect) {
      this.props.history.push('/SiteLessons');
    }
    return (
      <div className="container">
        <div className="signUpBox">
          <img
            alt="anova logo"
            src="../public/img/logo-lower.png"
            className="signup-logo"
          />
          <div className="title">
            <div className="anova">ANova </div>
            <div className="labs">Labs </div>
          </div>
          <form onSubmit={this._submit}>
            <div>
              <label htmlFor="name">
                Name
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this._change}
                  value={name}
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={this._change}
                  value={email}
                />
              </label>
            </div>
            <div>{emailStatus}</div>
            <div>
              <label htmlFor="password">
                Password
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={this._change}
                  value={password}
                />
              </label>
              <div>{passwordStatus}</div>
            </div>

            <div>
              Site
              <br/>
              <Select
                style={{ width: 250 }}
                placeholder="Select a site"
                onChange={this.onSelectSiteChange}
              >
                {this.loadSites()}
              </Select>,
            </div>
            <div>
              Role
              <br/>
              <Select
                style={{ width: 250 }}
                placeholder="Select your role"
                onChange={this.onSelectRoleChange}
              >
                <Option value="student">Student</Option>
                <Option value="mentor">Mentor</Option>
              </Select>
            </div>
            <br />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;
