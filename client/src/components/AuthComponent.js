import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as decode from 'jwt-decode';
import { getAnovaToken, removeAnovaToken } from '../utils/utils';
import NavBar from './NavBar';

const AuthComponent = props => {
  const { history, match, Component } = props;

  const [mentor, setMentor] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let decodedAnovaToken;
    try {
      decodedAnovaToken = decode(getAnovaToken());
    } catch (err) {
      // if local storage doesn't have token
      removeAnovaToken();
      history.push(`/Login`);
      return;
    }
    this.setState({
      uid: d_tok.id
    })

    fetch('/api/v1/profile/' + decodedAnovaToken.id + '?uid=' + decodedAnovaToken.id)
      .then(res => res.json())
      .then(profile => {
        setMentor(profile[0].role === 'mentor');
        setMounted(true);
      });

    const anovaToken = getAnovaToken();

    if (!anovaToken) {
      history.replace('/Login');
    } else {
      axios
        .post('/api/v1/auth', {
          anovaToken: anovaToken,
        })
        .catch(err => {
          removeAnovaToken();
          history.push('/Login');
        });
    }
  }, [history]);

  if (!getAnovaToken() || !mounted) {
    return (
      <div>
        <h1>Loading . . .</h1>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar isMentor={mentor} />
        <Component ismentor={mentor} id={match.params.id} />
      </div>
    );
  }
};

export default withRouter(AuthComponent);
