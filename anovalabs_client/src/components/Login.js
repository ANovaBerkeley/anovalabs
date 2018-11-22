import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.change = this.change.bind(this);
  }

  // takes an event and creates a key,value pair
  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form>
          <label>email</label>
          <input type="text" name="email" onChange={e => this.change(e)} />

          <label>password</label>
          <input type="text" name="password" onChange={e => this.change(e)} />
        </form>
      </div>
    );
  }
}
export default Login;
