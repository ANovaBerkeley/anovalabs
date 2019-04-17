import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJWT } from '../utils/utils';
import Lessons from './Lessons';
import Profile from './Profile';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    console.log("authenticating");
    this.state = {
      message: undefined,
      type: this.props.type
    };
  }

  componentDidMount() {
    const jwt = getJWT();
    if (!jwt) {
      this.props.history.push('/login');
    }
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

  render() {
    console.log("this is authcomponent");
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

    // if (this.state.message === undefined) {
    //   return (
    //     <div>
    //       <h1>Loading . . . </h1>
    //     </div>
    //   );
    // }
    // return (<div>{this.props.children}</div>);
  }
}

export default withRouter(AuthComponent);
