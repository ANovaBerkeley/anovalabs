import React, { Component } from 'react';
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import '../stylesheets/navbar.css';
import { removeJWT } from '../utils/utils';

const logo = require('../stylesheets/logo.png');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  returnHome = () => {
    window.location = "/";
  };

  goToProfile = () => {
    window.location = "/Profile";
  };

  goToLogout = () => {
    removeJWT();
    window.location = "/Login";
  };

  goToRoster = () => {
    window.location = "/Roster";
  };

  toggleDialog = () => {
    if (document.querySelector("#navbar-dialog").style.display != "block") {
      document.querySelector("#navbar-dialog").style.display = "block";
    } else {
      document.querySelector("#navbar-dialog").style.display = "none";
    }
  };

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
          <img onClick={this.returnHome} src={logo} className="logo" style={{ width: 180, height: 65 }}></img>
        </Menu.Item>
        <div className="navbar-options">
            <Menu.Item key="lessons" style={{ paddingRight: 20, paddingTop: 10 }}>
              <a href="/SiteLessons">Site Material</a>
            </Menu.Item>
            <Menu.Item key="lessonpool" style={{ paddingRight: 20, paddingTop: 10 }}>
              <a href="/LessonPool">Lesson Pool</a>
            </Menu.Item>
            <Menu.Item key="roster" style={{ paddingRight: 20, paddingTop: 10 }}>
              <a href="/Roster">Roster</a>
            </Menu.Item>
            <Menu.Item key="profile" style={{ paddingRight: 20, paddingTop: 10 }}>
              <img onClick={this.toggleDialog} src={"https://image.flaticon.com/icons/png/128/1141/1141771.png"} className="profile-logo" style={{ width: 20, height: 20 }}></img>
            </Menu.Item>
            <div id="navbar-dialog">
              <Button key="edit" type="default" className="navbar-dialog-button" onClick={this.goToProfile}>Profile</Button>
              <Button key="logout" type="danger" className="navbar-dialog-button" onClick={this.goToLogout}>Logout</Button>
            </div>
        </div>
      </Menu>
    );
  }
}

export default NavBar;
