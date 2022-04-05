import React, { useState, useEffect } from 'react';
import { Menu, Button, Drawer } from 'antd';
import '../stylesheets/NavBar.css';
import { getAnovaToken, removeAnovaToken, removeGoogleToken } from '../utils/utils';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const logo = require('../stylesheets/logo.png');

const NavBar = props => {
  const { match } = props;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const clientId =
    '128601698558-80ae6kq3v7p8iuknfpkqu6bsfg05vgra.apps.googleusercontent.com';

  useEffect(() => {
    if (match.path === '/SiteLessons' || match.path === '/') {
      setSelectedKeys('lessons');
    } else if (match.path === '/Roster') {
      setSelectedKeys('roster');
    } else if (match.path === '/Profile') {
      setSelectedKeys('profile');
    } 
    // changes 
    else if (match.path === '/LessonPool') {
      setSelectedKeys('lessonpool');
    }
  }, [match.path]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const logOut = () => {
    removeAnovaToken();
    removeGoogleToken();
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
            <Menu mode="horizontal" selectedKeys={selectedKeys}>
              <Menu.Item className="menuItem" key="lessons">
                <NavLink to="/SiteLessons">Site Material</NavLink>
              </Menu.Item>
              {/* {isMentor && (
                <Menu.Item className="menuItem" key="lessonpool">
                  <NavLink to="/LessonPool">Lesson Pool</NavLink>
                </Menu.Item>
              )} */}
              <Menu.Item className="menuItem" key="roster">
                <NavLink to="/Roster">Roster</NavLink>
              </Menu.Item>
              
              {/* changes */}
              <Menu.Item className="menuItem" key="lessonpool">
                <NavLink to="/LessonPool">Lesson Pool</NavLink>
              </Menu.Item>

            </Menu>
          </div>
          <div className="rightMenu">
            <Menu mode="horizontal" selectedKeys={selectedKeys}>
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
                <Menu.Item className="menuItem" key="profile">
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
            <Menu mode="vertical" selectedKeys={selectedKeys}>
              <Menu.Item className="menuItem" key="lessons">
                <NavLink onClick={hideDrawer} to="/SiteLessons">
                  Site Material
                </NavLink>
              </Menu.Item>
              {/* {isMentor && (
                <Menu.Item className="menuItem" key="lessonpool">
                  <NavLink onClick={hideDrawer} to="/LessonPool">
                    Lesson Pool
                  </NavLink>
                </Menu.Item>
              )} */}
              <Menu.Item className="menuItem" key="roster">
                <NavLink onClick={hideDrawer} to="/Roster">
                  Roster
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="profile">
                <NavLink onClick={hideDrawer} to="/Profile">
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item className="menuItem" key="logout">
                <GoogleLogout
                  clientId={clientId}
                  render={() => <NavLink to="/Login">Logout</NavLink>}
                  buttonText="Logout"
                  onLogoutSuccess={logOut}
                />
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      </nav>
    );
  }
};

export default NavBar;
