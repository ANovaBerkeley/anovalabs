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
      <div className="container">
        <div className="signUpBox">
          <form onSubmit={this._submit}>
            <div>
              <label htmlFor="email">
                email
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={this._change}
                  value={this.state.email}
              />
              </label>
            </div>
            <div>{this.state.emailStatus}</div>
            <div>
              <label htmlFor="password">password
              <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={this._change}
                  value={this.state.password}
              />
              </label>
              <div>{this.state.passwordStatus}</div>
            </div>
            <div>
              <label htmlFor="first_name">first name
              <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  onChange={this._change}
              />
              </label>
            </div>
            <div>
              <label htmlFor="last_name">last name
              <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  onChange={this._change}
              />
              </label>
            </div>
            <div>
              <label> grade
              <select id="grade" name="grade">
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
              </label>
            </div>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
