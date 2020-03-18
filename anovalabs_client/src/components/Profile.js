import React, { Component } from 'react';
import '../stylesheets/Profile.css';
import { Modal, Input, Button, Row, Col, Card } from 'antd';
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
      showEdit: false
    };
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var { id } = decode(getJWT());
    var get_url = 'http://localhost:5000/api/v1/profile/';
    var id_str = id.toString();
    fetch(get_url + id_str + '?uid=' + d_tok.id)
      .then(res => res.json())
      .then(
        profile => {
          this.setState({
            isLoaded: true,
            username: profile[0].name,
            //TODO: picture, candy
            email: profile[0].email,
            candy: profile[0].candy,
            hobby: profile[0].hobby
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  applyChanges() {
    const candyEdit = document.getElementById('candyEdit');
    const hobbyEdit = document.getElementById('hobbyEdit');
    fetch('http://localhost:5000/api/v1/profile/update', {
      method: 'POST',
      body: JSON.stringify({
        candy: candyEdit.value,
        hobby: hobbyEdit.value,
        id: decode(getJWT()).id
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() => {
      this.setState({
        showEdit: false,
        candy: candyEdit.value,
        hobby: hobbyEdit.value
      });
    });
  }

  showModal(bool) {
    this.setState({ showEdit: bool });
  }

  render() {
    return (
      <div className="container">
        <div className="grid-container">
          <div className="grid-row">
            <div className="grid-item-profile">
              <div className="grid-item-wrapper">
                <div className="grid-item-container">
                  <Card
                    cover={
                      <img
                        alt=""
                        src="https://image.flaticon.com/icons/svg/1141/1141771.svg"
                      />
                    }
                  >
                    <div>
                      <h2>{this.state.username}</h2>
                      <p>Email: {this.state.email}</p>
                      <p>Favorite Candy: {this.state.candy}</p>
                      <p>Favorite Hobby: {this.state.hobby}</p>
                    </div>
                    <Button type="primary" onClick={() => this.showModal(true)}>
                      Edit Profile
                    </Button>
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
                            />
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
                            />
                          </Col>
                        </Row>
                      </div>
                    </Modal>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
