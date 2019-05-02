import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJWT } from '../utils/utils';
import Lessons from './Lessons';
import Profile from './Profile';
import LessonPool from './LessonPool';
import Roster from './Roster';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined,
      type: this.props.type
    };
  }

  componentWillMount() {
    const jwt = getJWT();
    if (!jwt) {
      this.props.history.replace('/login');
    } else {
      axios
        .post('http://localhost:5000/api/v1/auth', {
          token: jwt
        })
        .then(res => {
          // as long as the bearer is authorized, all the children props will render
          this.setState({
            message: res.data.message
          });
        })
        .catch(err => {
          localStorage.removeItem('anovaToken');
          this.props.history.push('/login');
        });
    }
  }

  render() {
    if (!getJWT()) {
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      );
    } else {
      if (this.state.type == "lessons") {
        return (
          <Lessons/>
        );
      }

      else if (this.state.type == "profile") {
        return (
          <Profile/>
        );
      }

      else if (this.state.type == "lessonpool") {
        return (
          <LessonPool/>
        );
      }

      else if (this.state.type == "roster") {
        return (
          <Roster/>
        )
      }
    }
  }
}

export default withRouter(AuthComponent);
