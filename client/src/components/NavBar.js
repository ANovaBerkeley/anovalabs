import React, { Component } from 'react';
import { Menu, Button, Drawer } from 'antd';
import '../stylesheets/NavBar.css';
import { removeJWT } from '../utils/utils';
import { NavLink } from 'react-router-dom';

const logo = require('../stylesheets/logo.png');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  hideDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  logOut = () => {
    removeJWT();
  };

  render() {
    const tok = localStorage.getItem('anovaToken');
    if (tok === null) {
      return <div></div>;
    }
    return (
      <nav className="menuBar">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} className="logo" alt={'Logo'} />
          </NavLink>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <Menu mode="horizontal">
              <Menu.Item className="menuItem" key="lessons">
                <NavLink to="/SiteLessons">Site Material</NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="lessonpool">
                <NavLink to="/LessonPool">Lesson Pool</NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="roster">
                <NavLink to="/Roster">Roster</NavLink>
              </Menu.Item>
            </Menu>
          </div>
          <div className="rightMenu">
            <Menu mode="horizontal">
              <Menu.SubMenu
                className="menuItem"
                title={
                  <img
                    src={'https://image.flaticon.com/icons/png/128/1141/1141771.png'}
                    className="profile-logo"
                    alt={'Profile'}
                  />
                }
              >
                <Menu.Item className="menuItem" key="edit">
                  <NavLink to="/Profile">Profile</NavLink>
                </Menu.Item>
                <Menu.Item className="menuItem" key="logout">
                  <NavLink onClick={this.logOut} to="/Login">
                    Logout
                  </NavLink>
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
            onClose={this.hideDrawer}
            visible={this.state.drawerVisible}
          >
            <Menu mode="vertical">
              <Menu.Item className="menuItem" key="lessons">
                <NavLink onClick={this.hideDrawer} to="/SiteLessons">
                  Site Material
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="lessonpool">
                <NavLink onClick={this.hideDrawer} to="/LessonPool">
                  Lesson Pool
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="roster">
                <NavLink onClick={this.hideDrawer} to="/Roster">
                  Roster
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="edit">
                <NavLink onClick={this.hideDrawer} to="/Profile">
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="logout">
                <NavLink onClick={this.logOut} to="/Login">
                  Logout
                </NavLink>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default NavBar;
