import React, { Component } from 'react';
import { Menu, Button, Drawer, Icon } from 'antd';
import '../stylesheets/navbar.css';
import { removeJWT } from '../utils/utils';

const logo = require('../stylesheets/logo.png');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  goToLogout = () => {
    removeJWT();
    window.location = '/Login';
  };

  render() {
    const { current } = this.state;
    console.log(current);
    return (
      <nav className="menuBar">
        <div className="logo">
          <img href="/" src={logo} className="logo" />
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <Menu mode="horizontal">
              <Menu.Item className="menuItem" key="lessons">
                <a href="/SiteLessons">Site Material</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="lessonpool">
                <a href="/LessonPool">Lesson Pool</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="roster">
                <a href="/Roster">Roster</a>
              </Menu.Item>
            </Menu>
          </div>
          <div className="rightMenu">
            <Menu mode="horizontal">
              <Menu.SubMenu
                className="menuItem"
                title={
                  <img
                    onClick={this.toggleDialog}
                    src={
                      'https://image.flaticon.com/icons/png/128/1141/1141771.png'
                    }
                    className="profile-logo"
                  />
                }
              >
                <Menu.Item className="menuItem" key="edit">
                  <span onClick={this.goToProfile}>Profile</span>
                </Menu.Item>
                <Menu.Item className="menuItem" key="logout">
                  <span onClick={this.goToLogout}>Logout</span>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Menu mode="vertical">
              <Menu.Item className="menuItem" key="lessons">
                <a href="/SiteLessons">Site Material</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="lessonpool">
                <a href="/LessonPool">Lesson Pool</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="roster">
                <a href="/Roster">Roster</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="edit">
                <a onClick={this.goToProfile}>Profile</a>
              </Menu.Item>
              <Menu.Item className="menuItem" key="logout">
                <a onClick={this.goToLogout}>Logout</a>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default NavBar;
