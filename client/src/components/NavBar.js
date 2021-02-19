import React, { useState } from 'react';
import { Menu, Button, Drawer } from 'antd';
import '../stylesheets/NavBar.css';
import { getAnovaToken, removeAnovaToken } from '../utils/utils';
import { NavLink } from 'react-router-dom';

const logo = require('../stylesheets/logo.png');

const NavBar = props => {
  const { isMentor } = props;

  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const logOut = () => {
    removeAnovaToken();
  };

  if (getAnovaToken() === null) {
    return <div></div>;
  } else {
    return (
      <nav className="menuBar">
        <div className="navbar-logo">
          <NavLink to="/">
            <img src={logo} className="navbar-logo" alt={'Logo'} />
          </NavLink>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <Menu mode="horizontal">
              <Menu.Item className="menuItem" key="lessons">
                <NavLink to="/SiteLessons">Site Material</NavLink>
              </Menu.Item>
              {isMentor && (
                <Menu.Item className="menuItem" key="lessonpool">
                  <NavLink to="/LessonPool">Lesson Pool</NavLink>
                </Menu.Item>
              )}
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
                  <NavLink onClick={logOut} to="/Login">
                    Logout
                  </NavLink>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={hideDrawer}
            visible={drawerVisible}
          >
            <Menu mode="vertical">
              <Menu.Item className="menuItem" key="lessons">
                <NavLink onClick={hideDrawer} to="/SiteLessons">
                  Site Material
                </NavLink>
              </Menu.Item>
              {isMentor && (
                <Menu.Item className="menuItem" key="lessonpool">
                  <NavLink onClick={hideDrawer} to="/LessonPool">
                    Lesson Pool
                  </NavLink>
                </Menu.Item>
              )}
              <Menu.Item className="menuItem" key="roster">
                <NavLink onClick={hideDrawer} to="/Roster">
                  Roster
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="edit">
                <NavLink onClick={hideDrawer} to="/Profile">
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="logout">
                <NavLink onClick={logOut} to="/Login">
                  Logout
                </NavLink>
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </nav>
    );
  }
};

export default NavBar;
