import React, { Component } from 'react';
import { Menu, Button, Drawer, Icon } from 'antd';
import '../stylesheets/NavBar.css';
import { removeJWT } from '../utils/utils';
import { NavLink } from 'react-router-dom';

const logo = require('../stylesheets/logo.png');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  logOut = () => {
    removeJWT();
  };

  toggleDialog = () => {
    if (document.querySelector('#navbar-dialog').style.display !== 'block') {
      document.querySelector('#navbar-dialog').style.display = 'block';
    } else {
      document.querySelector('#navbar-dialog').style.display = 'none';
    }
  };

  handleClick(e) {
    this.setState({ current: e.key });
  }

  render() {
    const tok = localStorage.getItem('anovaToken');
    if (tok === null) {
      return <div></div>;
    }
    const { current } = this.state;
    return (
      <Menu
        className="navbar_menu"
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="home">
          <NavLink to="/">
            <img
              src={logo}
              className="logo"
              style={{ width: 180, height: 65 }}
              alt={'Logo'}
            />
          </NavLink>
        </Menu.Item>
        <div className="navbar-options">
          <Menu.Item key="lessons" style={{ paddingRight: 20, paddingTop: 10 }}>
            <NavLink to="/SiteLessons">Site Material</NavLink>
          </Menu.Item>
          <Menu.Item key="lessonpool" style={{ paddingRight: 20, paddingTop: 10 }}>
            <NavLink to="/LessonPool">Lesson Pool</NavLink>
          </Menu.Item>
          <Menu.Item key="roster" style={{ paddingRight: 20, paddingTop: 10 }}>
            <NavLink to="/Roster">Roster</NavLink>
          </Menu.Item>
          <Menu.Item key="profile" style={{ paddingRight: 20, paddingTop: 21 }}>
            <img
              alt={'Student Icon'}
              onClick={this.toggleDialog}
              src={'https://image.flaticon.com/icons/png/128/1141/1141771.png'}
              className="profile-logo"
              style={{ width: 20, height: 20 }}
            />
          </Menu.Item>
          <div id="navbar-dialog">
            <Button
              key="edit"
              type="default"
              className="navbar-dialog-button"
              onClick={this.goToProfile}
            >
              Profile
            </Button>
            <Button
              key="logout"
              type="danger"
              className="navbar-dialog-button"
              onClick={this.logOut}
            >
              Logout
            </Button>
          </div>
        </div>
      </Menu>
    );
  }
}

export default NavBar;
