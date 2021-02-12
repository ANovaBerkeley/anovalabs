import React, { useState, useEffect } from 'react';
import { Modal, Input, Row, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../stylesheets/Profile.css';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';

const Profile = () => {
  const profileimage = 'https://image.flaticon.com/icons/png/128/1141/1141771.png';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [candy, setCandy] = useState('');
  const [hobby, setHobby] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var { id } = decode(getAnovaToken());
    var get_url = '/api/v1/profile/';
    var id_str = id.toString();
    fetch(get_url + id_str + '?uid=' + d_tok.id)
      .then(res => res.json())
      .then(
        profile => {
          setUsername(profile[0].name);
          setEmail(profile[0].email);
          setCandy(profile[0].candy);
          setHobby(profile[0].hobby);
        },
        error => {
          console.log(error);
        },
      );
  }, []);

  const applyChanges = () => {
    const candyEdit = document.getElementById('candyEdit');
    const hobbyEdit = document.getElementById('hobbyEdit');
    fetch('/api/v1/profile/update', {
      method: 'POST',
      body: JSON.stringify({
        candy: candyEdit.value,
        hobby: hobbyEdit.value,
        id: decode(getAnovaToken()).id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => {
      setShowEdit(false);
      setCandy(candyEdit.value);
      setHobby(hobbyEdit.value);
    });
  };

  const showModal = bool => {
    setShowEdit(bool);
  };

  return (
    <div className="profileContainer">
      <div className="profileBox">
        <Row type="flex">
          <Col>
            <Avatar style={{ marginRight: '20px' }} src={profileimage} size="large" />
          </Col>
          <Col>
            <p id="username" className="title">
              {username}
            </p>
          </Col>
        </Row>
        <Row type="flex">
          <Col>
            <p>Email:</p>
          </Col>
          <Col>
            <p id="email">{email}</p>
          </Col>
        </Row>
        <Row type="flex">
          <Col>
            <p>Favorite Candy:</p>
          </Col>
          <Col>
            <p id="candy">{candy}</p>
          </Col>
        </Row>
        <Row type="flex">
          <Col>
            <p>Hobbies:</p>
          </Col>
          <Col>
            <p id="hobby">{hobby}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Avatar size={64} onClick={() => showModal(true)} icon="edit" />
            <Modal
              className="editModal"
              title="Edit Your Profile"
              centered
              visible={showEdit}
              onOk={() => applyChanges()}
              onCancel={() => showModal(false)}
            >
              <div className="editFields">
                <Row>
                  <Col>
                    <Input
                      id="candyEdit"
                      allowClear={true}
                      addonBefore="Favorite Candy:"
                      autosize="true"
                      defaultValue={candy}
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      id="hobbyEdit"
                      allowClear={true}
                      addonBefore="Hobbies:"
                      autosize="true"
                      defaultValue={hobby}
                    ></Input>
                  </Col>
                </Row>
              </div>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
