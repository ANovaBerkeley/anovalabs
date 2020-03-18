import React, { Component } from 'react';
import { Modal, Input, Row, Col, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../stylesheets/Profile.css';
import * as decode from 'jwt-decode';
import { getJWT } from '../utils/utils';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileimage: 'https://image.flaticon.com/icons/png/128/1141/1141771.png',
      username: '',
      email: '',
      candy: '',
      hobby: '',
      showEdit: false,
    };
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var { id } = decode(getJWT());
    var get_url = '/api/v1/profile/';
    var id_str = id.toString();
    fetch(get_url + id_str + '?uid=' + d_tok.id)
      .then(res => res.json())
      .then(
        profile => {
          this.setState({
            isLoaded: true,
            username: profile[0].name,
            //TODO: picture
            email: profile[0].email,
            candy: profile[0].candy,
            hobby: profile[0].hobby,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  applyChanges() {
    const candyEdit = document.getElementById('candyEdit');
    const hobbyEdit = document.getElementById('hobbyEdit');
    fetch('/api/v1/profile/update', {
      method: 'POST',
      body: JSON.stringify({
        candy: candyEdit.value,
        hobby: hobbyEdit.value,
        id: decode(getJWT()).id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => {
      this.setState({
        showEdit: false,
        candy: candyEdit.value,
        hobby: hobbyEdit.value,
      });
    });
  }

  showModal(bool) {
    this.setState({ showEdit: bool });
  }

  render() {
    return (
      <div className="profileContainer">
        <div className="profileBox">
          <Row type="flex">
            <Col>
              <Avatar
                style={{ marginRight: '20px' }}
                src={this.state.profileimage}
                size="large"
              />
            </Col>
            <Col>
              <p id="username" className="title">
                {this.state.username}
              </p>
            </Col>
          </Row>
          <Row type="flex">
            <Col>
              <p>Email:</p>
            </Col>
            <Col>
              <p id="email">{this.state.email}</p>
            </Col>
          </Row>
          <Row type="flex">
            <Col>
              <p>Favorite Candy:</p>
            </Col>
            <Col>
              <p id="candy">{this.state.candy}</p>
            </Col>
          </Row>
          <Row type="flex">
            <Col>
              <p>Hobbies:</p>
            </Col>
            <Col>
              <p id="hobby">{this.state.hobby}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Avatar size={64} onClick={() => this.showModal(true)} icon="edit" />
              <Modal
                className="editModal"
                title="Edit Your Profile"
                centered
                visible={this.state.showEdit}
                onOk={() => this.applyChanges()}
                onCancel={() => this.showModal(false)}
              >
                <div className="editFields">
                  <Row>
                    <Col>
                      <Input
                        id="candyEdit"
                        allowClear={true}
                        addonBefore="Favorite Candy:"
                        autosize="true"
                        defaultValue={this.state.candy}
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
                        defaultValue={this.state.hobby}
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
  }
}
