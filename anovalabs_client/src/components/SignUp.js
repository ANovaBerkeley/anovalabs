import React, { Component } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailStatus: '',
      passwordStatus: ''
    };

    this._change = this._change.bind(this);

    this._submit = this._submit.bind(this);

    this._validateUser = this._validateUser.bind(this);
  }

  async _validateUser() {
    const userSchema = Yup.object({
      email: Yup.string()
        .email()
        .required('No email provided'),
      password: Yup.string()
        .required('No password provided.')
        .min(10, 'Password should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password must contain numbers or letters')
    });
    const { email, password } = this.state;
    try {
      const isValid = await userSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      if (isValid) {
        this.setState({
          emailStatus: '',
          passwordStatus: ''
        });
        return true;
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const presentState = { passwordStatus: '', emailStatus: '' };
        error.inner.map(item => {
          if (item.path === 'password') {
            presentState.passwordStatus = item.message;
          } else if (item.path === 'email') {
            presentState.emailStatus = item.message;
          }
        });
        this.setState({
          emailStatus: presentState.emailStatus,
          passwordStatus: presentState.passwordStatus
        });
        return false;
      }
    }
    return false;
  }

  // takes an event and creates a key,value pair
  _change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async _submit(event) {
    event.preventDefault();
    const isValid = await this._validateUser();
    if (isValid) {
      axios
        .post('api/v1/auth/signup', {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          // storing token from server
          localStorage.setItem('anovaToken', res.data.token);
          this.props.history.push('/login');
        })
        .catch(err => {
          localStorage.removeItem('anovaToken');
          console.log(err);
        });
    } else {
      console.log(this.state.errorMessage);
    }
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
          <div>{this.state.emailStatus}</div>
          <div>
            <label>password</label>
            <input
              type="password"
              name="password"
              onChange={this._change}
              value={this.state.password}
            />
            <div>{this.state.passwordStatus}</div>
          </div>
          <div>
            <label>first name</label>
            <input type="text" name="first_name" onChange={this._change} />
          </div>
          <div>
            <label>last name</label>
            <input type="text" name="last_name" onChange={this._change} />
          </div>
          <div>
            <label>grade</label>
            <select name="grade">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
              <option value="1">6</option>
              <option value="1">7</option>
              <option value="1">8</option>
              <option value="1">9</option>
              <option value="1">10</option>
              <option value="1">11</option>
              <option value="1">12</option>
            </select>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
export default Login;
