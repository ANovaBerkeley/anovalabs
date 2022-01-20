import React, { useState, useEffect } from 'react';
import { Modal, Input, Row, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../stylesheets/Profile.css';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';
import { handleErrors } from '../utils/helpers';

const Profile = () => {
  const profileimage = 'https://image.flaticon.com/icons/png/128/1141/1141771.png';
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [candy, setCandy] = useState('');
  const [hobby, setHobby] = useState('');
  const [fact, setFact] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var { id } = decode(getAnovaToken());
    var get_url = '/api/v1/profile/';
    var id_str = id.toString();
    fetch(get_url + id_str + '?uid=' + d_tok.id)
      .then(handleErrors)
      .then(profile => {
        setUsername(profile[0].name);
        setEmail(profile[0].email);
        setCandy(profile[0].candy);
        setHobby(profile[0].hobby);
        setFact(profile[0].fact);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to get profile.',
          centered: true,
        }),
      );
  }, []);

  const applyChanges = () => {
    const candyEdit = document.getElementById('candyEdit');
    const hobbyEdit = document.getElementById('hobbyEdit');
    const factEdit = document.getElementById('factEdit');
    fetch('/api/v1/profile/update', {
      method: 'POST',
      body: JSON.stringify({
        candy: candyEdit.value,
        hobby: hobbyEdit.value,
        fact: factEdit.value,
        id: decode(getAnovaToken()).id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => {
      setShowEdit(false);
      setCandy(candyEdit.value);
      setHobby(hobbyEdit.value);
      setFact(factEdit.value);
    });
  };

  const showModal = bool => {
    setShowEdit(bool);
  };

  return (
    <div className="profileContainer">
      <div className="profileBox">
        <div className="profileBody">
          <div className="profileLeft">
            <Avatar id="profileImage" src={profileimage} />
            <p id="username" className="profileName">
              {username}
            </p>
          </div>
          <div className="profileRight">
            <Col>
              <Row type="flex">
                <Col>
                  <p>
                    <span className="profileItem" id="emailBubble">
                      EMAIL
                    </span>{' '}
                    {email}
                  </p>
                </Col>
              </Row>
              <Row type="flex">
                <Col>
                  <p>
                    <span className="profileItem" id="candyBubble">
                      FAV CANDY
                    </span>{' '}
                    {candy}
                  </p>
                </Col>
              </Row>
              <Row type="flex">
                <Col>
                  <p>
                    <span className="profileItem" id="hobbyBubble">
                      FAV HOBBY
                    </span>{' '}
                    {hobby}
                  </p>
                </Col>
              </Row>
              <Row type="flex">
                <Col>
                  <p>
                    <span className="profileItem" id="factBubble">
                      FUN FACT
                    </span>{' '}
                    {fact}
                  </p>
                </Col>
              </Row>{' '}
            </Col>
          </div>
        </div>
        <div className="profileEdit">
        <Row>
              <Col>
                <Avatar
                  className="editIcon"
                  size={64}
                  onClick={() => showModal(true)}
                  icon="edit"
                />
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
                          addonBefore="Favorite Candy"
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
                          addonBefore="Favorite Hobby"
                          autosize="true"
                          defaultValue={hobby}
                        ></Input>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Input
                          id="factEdit"
                          allowClear={true}
                          addonBefore="Fun Fact"
                          autosize="true"
                          defaultValue={fact}
                        ></Input>
                      </Col>
                    </Row>
                  </div>
                </Modal>
              </Col>
            </Row>
        </div>    
      </div>
    </div>
  );
};

export default Profile;
