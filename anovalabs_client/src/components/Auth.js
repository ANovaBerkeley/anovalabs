import React, { Component } from 'react';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  render() {
    return (
      <div>
        <h1>Login and authentication </h1>
      </div>
    );
  }
}

export default Auth;
