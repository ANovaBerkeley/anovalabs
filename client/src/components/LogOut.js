import React, { Component } from 'react';
import { removeJWT } from '../utils/utils';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  _logOut() {
    removeJWT();
    this.props.history.push('/login');
  }

  render() {
    return <div>{this._logOut()}</div>;
  }
}
export default LogOut;
