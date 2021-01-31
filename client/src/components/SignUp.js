import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Select, Form, Input, Icon, Button } from 'antd';
import * as decode from 'jwt-decode';
import {
  getAnovaToken,
  getGoogleToken,
  removeAnovaToken,
  removeGoogleToken,
} from '../utils/utils';
import ANovaLogo from '../assets/img/logo-lower.png';
import '../stylesheets/SignUp.css';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom';

const { Option } = Select;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      sites: [],
      role: '',
      siteId: '',
      siteCode: '',
    };
    this._submit = this._submit.bind(this);
  }

  clientId = '128601698558-80ae6kq3v7p8iuknfpkqu6bsfg05vgra.apps.googleusercontent.com'; // Put client ID here

  onSuccess = res => {
    localStorage.setItem('googleToken', res.tokenId);
    console.log('Login Success: currentUser:', res);
  };

  onFailure = res => {
    console.log('Login failed: res:', res);
  };

  componentDidMount() {
    if (getAnovaToken() !== null) {
      this.setState({ redirect: true });
    }
    fetch('/api/v1/site/allSites')
      .then(res => res.json())
      .then(
        sites => {
          this.setState({
            sites,
          });
        },
        error => {
          this.setState({
            error,
          });
        },
      );
  }

  onSelectSiteChange = siteId => {
    this.setState({ siteId });
  };

  onSelectRoleChange = role => {
    this.setState({ role });
  };

  _checkAccess = event => {
    this.setState({ siteCode: event.target.value });
  };

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

  async addUserSite(payload) {
    const { siteId } = this.state;
    const semester = this.getCurrentSemester();
    try {
      await fetch('/api/v1/site/addUserSemSite', {
        method: 'POST',
        body: JSON.stringify({
          user_id: payload.id,
          semester,
          site_id: siteId,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  _submit(event) {
    const googleToken = getGoogleToken();

    const { role, siteId, siteCode, sites } = this.state;

    if (!googleToken) {
      Modal.error({
        title: 'Please register with Google.',
        centered: true,
      });
      event.preventDefault();
      return;
    }

    if (!role || !siteId) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
      event.preventDefault();
      return;
    }

    if (role === 'mentor' && siteCode !== 'wazoo!') {
      Modal.error({
        title: 'Wrong Mentor Access Code!',
        centered: true,
      });
      event.preventDefault();
      return;
    }

    if (role === 'student' && siteCode !== sites[siteId - 1].schoolName + 'ANova') {
      Modal.error({
        title: 'Wrong Site Access Code!',
        centered: true,
      });
      event.preventDefault();
      return;
    }

    event.preventDefault();

    axios
      .post('/api/v1/auth/signup', {
        googleToken,
        role,
      })
      .then(data => {
        localStorage.setItem('anovaToken', data.data.token);
        const payload = decode(data.data.token);
        this.addUserSite(payload);
        this.props.history.push('/SiteLessons');
      })
      .catch(err => {
        console.log(err);
        removeAnovaToken();
        removeGoogleToken();
        Modal.error({
          title: 'Email already in use.',
          centered: true,
        });
        event.preventDefault();
      });
  }

  loadSites = () => {
    const { sites } = this.state;
    const options = [];
    for (let i = 0; i < sites.length; i += 1) {
      options.push(
        <Option key={sites[i].id} value={sites[i].id}>
          {sites[i].schoolName}
        </Option>,
      );
    }
    return options;
  };

  render() {
    const { redirect, errorMsg } = this.state;
    const { history } = this.props;
    if (redirect) {
      history.push('/SiteLessons');
    }
    return (
      <div className="signUpContainer">
        <div className="signUpBox">
          <img alt="anova logo" src={ANovaLogo} className="signup-logo" />
          <div className="title">
            <div className="anova">ANova </div>
            <div className="labs">Labs </div>
          </div>
          <Form onSubmit={this._submit} className="login-form">
            <Form.Item className="signup-field-container">
              <GoogleLogin
                className="signup-google"
                clientId={this.clientId}
                buttonText="Register"
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            </Form.Item>
            <Form.Item>
              <Select
                style={{ width: 270 }}
                placeholder="Select a site"
                onChange={this.onSelectSiteChange}
              >
                {this.loadSites()}
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                style={{ width: 270 }}
                placeholder="Select your role"
                onChange={this.onSelectRoleChange}
              >
                <Option value="student">Student</Option>
                <Option value="mentor">Mentor</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="exclamation-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="access"
                placeholder="Mentor/Site Access Code"
                onChange={this._checkAccess}
              />
            </Form.Item>
            <div className="error">{errorMsg}</div>
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
export default withRouter(SignUp);
