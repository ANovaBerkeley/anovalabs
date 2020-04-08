import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as decode from 'jwt-decode';
import { getJWT } from '../utils/utils';
import SiteLessons from './SiteLessons';
import Profile from './Profile';
import LessonPool from './LessonPool';
import Roster from './Roster';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
      mentor: null,
      mounted: false,
    };
  }

  componentDidMount() {
    let d_tok;
    try {
      const tok = localStorage.getItem('anovaToken');
      d_tok = decode(tok);
    } catch (err) {
      // if local storage doesn't have token
      localStorage.removeItem('anovaToken');
      this.props.history.push(`/login`);
      return;
    }

    fetch('/api/v1/profile/' + d_tok.id + '?uid=' + d_tok.id)
      .then(res => res.json())
      .then(profile => {
        this.setState({
          mentor: profile[0].role === 'mentor',
          mounted: true,
        });
      });

    const jwt = getJWT();
    if (!jwt) {
      this.props.history.replace('/login');
    } else {
      axios
        .post('/api/v1/auth', {
          token: jwt,
        })
        .then(res => {
          // as long as the bearer is authorized, all the children props will render
          this.setState({
            message: res.data.message,
          });
        })
        .catch(err => {
          localStorage.removeItem('anovaToken');
          this.props.history.push('/login');
        });
    }
  }

  render() {
    if (!getJWT() || !this.state.mounted) {
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      );
    } else {
      if (this.props.type === 'lessons') {
        return <SiteLessons ismentor={this.state.mentor} />;
      } else if (this.props.type === 'profile') {
        return <Profile />;
      } else if (this.props.type === 'lessonpool') {
        return <LessonPool ismentor={this.state.mentor} />;
      } else if (this.props.type === 'roster') {
        return <Roster ismentor={this.state.mentor} />;
      }
    }
  }
}

export default withRouter(AuthComponent);
