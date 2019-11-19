  import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Modal, Select, Form, Input, Icon, Checkbox, Button } from 'antd';
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
      siteId: '',
      isMentor: '',
      siteCode: ''
    };

    this.onSelectSiteChange = this.onSelectSiteChange.bind(this);
    this.onSelectRoleChange = this.onSelectRoleChange.bind(this);
    this._submit = this._submit.bind(this);
    this._validateUser = this._validateUser.bind(this);
    this._changeName= this._changeName.bind(this);
    this._changeEmail = this._changeEmail.bind(this);
    this._changePassword = this._changePassword.bind(this);
    this._checkAccess = this._checkAccess.bind(this);
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
  _changeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  _changeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  _changePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  onSelectSiteChange(siteId) {
    this.setState({ siteId });
  }

  onSelectRoleChange(role) {
    console.log(role);
    this.setState({ role });
  }

  _checkAccess(event) {
    if (this.state.role == 'student') {
      this.setState({siteCode: event.target.value});
      console.log(this.state.siteCode);
    } else {
      this.setState({isMentor: event.target.value});
      console.log(this.state.isMentor);

    }
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
    const { name, email, password, role, siteId, isMentor, siteCode, sites} = this.state;
    console.log(role);
    console.log(isMentor);
    console.log(siteCode);
    if (!name || !email || !password || !role || !siteId) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true
      });
      event.preventDefault();
    }
    if (role == 'mentor' && isMentor != 'wazoo!') {
      Modal.error({
        title: 'Wrong Mentor Access Code!',
        centered: true
      });
      event.preventDefault();
    }
    if (role == 'student' && siteCode != sites[siteId - 1].schoolName + "ANova") {
      console.log(sites[siteId - 1]);
      Modal.error({
        title: 'Wrong Site Access Code!',
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
          <Form onSubmit={this._submit} className="login-form">
            <Form.Item>
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                  onChange = {this._changeName}
                />
            </Form.Item>
            <Form.Item>
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  onChange = {this._changeEmail}
                />
            </Form.Item>
            <Form.Item>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                  onChange = {this._changePassword}

                />
            </Form.Item>
            <Form.Item>
                <Select
                  style={{ width: 270}}
                  placeholder="Select a site"
                  onChange={this.onSelectSiteChange}
                >
                  {this.loadSites()}
              </Select>
            </Form.Item>
            <Form.Item>
                <Select
                  style={{ width: 270}}
                  placeholder="Select your role"
                  onChange={this.onSelectRoleChange}
                >
                  <Option value="student">Student</Option>
                  <Option value="mentor">Mentor</Option>
              </Select>
            </Form.Item>
            <Form.Item>
                <Input
                  prefix={<Icon type="exclamation-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="access"
                  placeholder="Mentor/Site Access Code"
                  onChange = {this._checkAccess}

                />
            </Form.Item>
            <div className = "error">{this.state.errorMsg}</div>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Sign Up
                </Button>
                <a href="./LogIn">Back to Log In</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default SignUp;
