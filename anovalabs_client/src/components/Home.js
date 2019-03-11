import React, { Component } from 'react';
import {NavLink} from "react-router";
import "antd/dist/antd.css";
import "./index.css";
import {Button} from 'antd/lib/button';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Anova Labs</h1>
        <NavLink to = "/SignUp"><button className = "signupButton">Sign Up</button></NavLink>
        <NavLink to = "/SignUp"><Button>Sign Up</Button></NavLink>
      </div>
    );
  }
}
export default Home;
