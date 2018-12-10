import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMsg: ''
    };

    this._change = this._change.bind(this);
    this._submit = this._submit.bind(this);
  }

  // takes an event and creates a key,value pair
  _change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  _submit(event) {
    event.preventDefault();
    axios
      .post('api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem('anovaToken', res.data.token);
        this.props.history.push('/lessons');
      })
      .catch(error => {
        this.setState({ errorMsg: 'Invalid Login' });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submit}>
          <div>
            <label>email</label>
            <input
              type="text"
              name="email"
              onChange={this._change}
              value={this.state.email}
            />
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              name="password"
              onChange={this._change}
              value={this.state.password}
            />
            <div>{this.state.errorMsg}</div>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
export default Login;
