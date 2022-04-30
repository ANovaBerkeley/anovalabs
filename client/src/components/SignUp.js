import React, { useState, useEffect } from 'react';
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
import { useHistory, withRouter } from 'react-router-dom';

const { Option } = Select;

const SignUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [sites, setSites] = useState([]);
  const [role, setRole] = useState('');
  const [siteId, setSiteId] = useState('');
  const [siteCode, setSiteCode] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const clientId =
    '128601698558-80ae6kq3v7p8iuknfpkqu6bsfg05vgra.apps.googleusercontent.com'; // Put client ID here

  const onSuccess = res => {
    localStorage.setItem('googleToken', res.tokenId);
    console.log('Login Success: currentUser:', res);
    setEmail(res.profileObj.email);
  };

  const onFailure = res => {
    console.log('Login failed: res:', res);
  };

  useEffect(() => {
    if (getAnovaToken() !== null) {
      setRedirect(true);
    }
    fetch('/api/v1/site/allSites')
      .then(res => res.json())
      .then(
        sites => {
          setSites(sites);
        },
        error => {
          setError(error);
        },
      );
  }, []);

  const onSelectSiteChange = siteId => {
    setSiteId(siteId);
  };

  const onSelectRoleChange = role => {
    setRole(role);
  };

  const _checkAccess = event => {
    setSiteCode(event.target.value);
  };

  const getCurrentSemester = () => {
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

  const addUserSite = async payload => {
    // const semester = getCurrentSemester();
    try {
      await fetch('/api/v1/site/addUserSite', {
        method: 'POST',
        body: JSON.stringify({
          user_id: payload.id,
          // semester,
          site_id: siteId,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _submit = async event => {
    const googleToken = getGoogleToken();

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

    const semesters = [];
    semesters.push(await getCurrentSemester());

    axios
      .post('/api/v1/auth/signup', {
        googleToken,
        role,
        semesters,
      })
      .then(data => {
        localStorage.setItem('anovaToken', data.data.token);
        const payload = decode(data.data.token);
        addUserSite(payload);
        history.push('/SiteLessons');
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
  };

  const loadSites = () => {
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

  if (redirect) {
    history.push('/SiteLessons');
  }
  return (
    <div className="signUpContainer">
      <div className="signUpBox">
        <img alt="anova logo" src={ANovaLogo} className="signup-logo" />
        <div className="signup-title">
          <div className="anova">ANova </div>
          <div className="labs">Labs </div>
        </div>
        <Form onSubmit={_submit} className="login-form">
          <Form.Item className="signup-field-container">
            <GoogleLogin
              className="signup-google"
              clientId={clientId}
              buttonText={email || 'Register'}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
            />
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 270 }}
              placeholder="Select a site"
              onChange={onSelectSiteChange}
            >
              {loadSites()}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 270 }}
              placeholder="Select your role"
              onChange={onSelectRoleChange}
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
              onChange={_checkAccess}
            />
          </Form.Item>
          <div className="error">{error}</div>
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
};

export default withRouter(SignUp);
