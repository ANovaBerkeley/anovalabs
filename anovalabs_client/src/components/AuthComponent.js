import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJWT } from '../utils/utils';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: undefined
    };
  }

  componentDidMount() {
    const jwt = getJWT();
    if (!jwt) {
      this.props.history.push('/login');
    }
    axios
      .get('/api/v1/auth', {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(res => {
        // as long as the bearer is authorized, all the children props will render
        this.setState({ message: res.data.message });
      })
      .catch(err => {
        localStorage.removeItem('anovaToken');
        this.props.history.push('/login');
      });
  }

  render() {
    if (this.state.message === undefined) {
      return (
        <div>
          <h1>Loading . . . </h1>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(AuthComponent);
