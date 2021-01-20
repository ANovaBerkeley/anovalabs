import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as decode from 'jwt-decode';
import { getAnovaToken, removeAnovaToken } from '../utils/utils';
import NavBar from './NavBar';
// eslint-disable-next-line
import Profile from './Profile';
// eslint-disable-next-line
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
    let decodedAnovaToken;
    try {
      decodedAnovaToken = decode(getAnovaToken());
    } catch (err) {
      // if local storage doesn't have token
      removeAnovaToken();
      this.props.history.push(`/login`);
      return;
    }

    fetch('/api/v1/profile/' + decodedAnovaToken.id + '?uid=' + decodedAnovaToken.id)
      .then(res => res.json())
      .then(profile => {
        this.setState({
          mentor: profile[0].role === 'mentor',
          mounted: true,
        });
      });

    const anovaToken = getAnovaToken();

    if (!anovaToken) {
      this.props.history.replace('/login');
    } else {
      axios
        .post('/api/v1/auth', {
          anovaToken: anovaToken,
        })
        .then(res => {
          // as long as the bearer is authorized, all the children props will render
          this.setState({
            message: res.data.message,
          });
        })
        .catch(err => {
          removeAnovaToken();
          this.props.history.push('/login');
        });
    }
  }

  render() {
    if (!getAnovaToken() || !this.state.mounted) {
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <this.props.component ismentor={this.state.mentor} />
        </div>
      );
    }
  }
}

export default withRouter(AuthComponent);
