import React, { Component } from 'react';
import axios from 'axios';

//import styles from "./LoginStyles";

import './Login.css';

// const styles = {
//     container: {
//       backgroundColor: "#E6F4FC",
//       width: '100%',
//       height: '100%',
//       flex: 1,
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//
//
//     },
//     loginbox: {
//       margin: 'auto',
//       width: '420px',
//       height: '521px',
//       backgroundColor: 'rgba(247, 247, 247, 0.86)',
//
//     }
//
// }

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

      <div className="container">
        <div className= "loginBox">
          <div className = "title"> ANova Labs </div>
          <form onSubmit={this._submit}>
            <div>
              <label for = "email">Email</label>
              <input
                type="text"
                name="email"
                onChange={this._change}
                value={this.state.email}
              />
            </div>
            <div>
              <label for = "password">Password</label>
              <input
                type="text"
                name="password"
                onChange={this._change}
                value={this.state.password}
              />
              <div>{this.state.errorMsg}</div>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
