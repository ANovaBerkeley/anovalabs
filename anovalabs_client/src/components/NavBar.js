import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import 'antd/dist/antd.css';
import '../stylesheets/navbar.css'
var logo = require('../stylesheets/logo.png');

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: "home",
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ current: e.key });
  }


  render() {
    return (
      <Menu className="navbar_menu"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="home">
          <img src={logo} className="logo"></img>
        </Menu.Item>
        <div className="navbar-options">
            <Menu.Item key="lessons" style={{ paddingRight: 20, paddingTop: 10 }}>
              <a href="/Lessons" style={{ color: "black" }}>Lessons</a>
            </Menu.Item>
            <Menu.Item key="signup" style={{ paddingRight: 20, paddingTop: 10 }}>
              <a href="/Signup" style={{ color: "black" }}>Sign Up</a>
            </Menu.Item>
        </div>
      </Menu>
    );
  }
}

// <div>
//   <div className="navbar">
//     <img className="home-button-logo" onClick={this.returnHome} src={logo}/>
//     <div className="navbar-avatar" onClick={this.toggleDialog}>{this.renderAvatar()}</div>
//   </div>
//   <div id="navbar-dialog">
//     <Button key="edit" type="default" onClick={this.handleEdit} className="navbar-dialog-button">Edit account</Button>
//     <Button key="logout" type="danger" onClick={this.handleLogout} className="navbar-dialog-button">Logout</Button>
//   </div>
// </div>

/*
<header>
  <nav>
    <ul>
      <li className="first">
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/Lessons">Lessons</a>
      </li>
      <li>
        <a href="/SignUp">Sign Up</a>
      </li>
    </ul>
  </nav>
</header>
*/

export default NavBar;
