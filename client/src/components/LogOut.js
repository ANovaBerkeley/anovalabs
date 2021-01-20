import React, { Component } from 'react';
import { removeAnovaToken, removeGoogleToken } from '../utils/utils';
import { withRouter } from 'react-router-dom';

class LogOut extends Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  _logOut() {
    removeAnovaToken();
    removeGoogleToken();
    this.props.history.push('/login');
  }

  render() {
    return <div>{this._logOut()}</div>;
  }
}
export default withRouter(LogOut);
