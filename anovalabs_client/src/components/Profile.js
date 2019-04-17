import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Profile.css';
import { Modal, Input, Button, Row, Col, Avatar } from 'antd';
import "antd/dist/antd.css";
import * as decode from 'jwt-decode';
import { getJWT } from '../utils/utils';

export default class Profile extends Component {

     constructor(props) {
          super(props)
          this.state = {
               // profileimage: '../images/student.png',
               profileimage: "https://image.flaticon.com/icons/png/128/1141/1141771.png",
               username: "",
               email: "",
               grade: "",
               bio: "Once upon a time",
               candy: "Twix",
               showEdit: false
          }
          // this.handleClick = this.handleClick.bind(this);
     }

     componentDidMount() {
          var { id } = decode(getJWT());
          var get_url = 'http://localhost:5000/api/v1/profile/';
          var id_str = id.toString();
          axios.get(get_url+id_str)
          .then(res => {
               this.setState(res.data)
          })
     }

     handleChange(e) {
          var editInput = e.currentTarget;
          var inputText = e.currentTarget.value;
          var editField = document.getElementById(editInput.id.slice(0, -5));
          var editFieldid = editField.id;
          if (editFieldid == "username") {
               this.changeUser(inputText.valueOf())
          } else if (editFieldid == "email") {
               this.changeEmail(inputText.valueOf())
          } else if (editFieldid == "bio") {
               this.changeBio(inputText.valueOf())
          } else if (editFieldid == "grade") {
               this.changeGrade(inputText.valueOf())
          } else {
               alert("Something is amiss")
          }
     }

     applyChanges() {
          var userEdit = document.getElementById("userEdit");
          var emailEdit = document.getElementById("emailEdit");
          var gradeEdit = document.getElementById("gradeEdit");
          var bioEdit = document.getElementById("bioEdit");
          var candyEdit = document.getElementById("candyEdit");

          this.setState({
               username: userEdit.value,
               email: emailEdit.value,
               grade: gradeEdit.value,
               bio: bioEdit.value,
               candy: candyEdit.value
          })

          this.showModal(false)
     }
     showModal(bool) {
          this.setState({ showEdit: bool });
     }
     // handleClick(e) {
     //      var editButton = e.currentTarget;
     //      var editField = document.getElementById(editButton.id.slice(0, -4))
     //      // var userEdit = prompt("What would you like to change your " + editField.id+ " to?", editField.innerText)
     //      let editFieldid = editField.id

     //      if (editFieldid == "username") {
     //           this.showUser()
     //      } else if (editFieldid == "email") {
     //           this.showEmail()
     //      } else if (editFieldid == "bio") {
     //           this.showBio()
     //      } else if (editFieldid == "grade") {
     //           this.showGrade()
     //      } else {
     //           alert("Something is amiss")
     //      }
     // }

     render() {
          return (
               <div className="container">
                    <div className="profileBox">
                         <Row type="flex">
                              <Col>
                                   <Avatar style={{marginRight : "20px"}}src={this.state.profileimage} size="large" />
                              </Col>
                              <Col>
                                   <p id="username" className="title">{this.state.username}</p>
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
                                   <p>Grade:</p>
                              </Col>
                              <Col>
                                   <p id="grade">{this.state.grade}</p>
                              </Col>
                         </Row>
                         <Row type="flex">
                         <Col>
                                   <p>Candy:</p>
                              </Col>
                              <Col>
                                   <p id="candy">{this.state.candy}</p>
                              </Col>
                         </Row>
                         <Row type="flex">
                              <Col>
                                   <p>Biography:</p>
                              </Col>
                              <Col>
                                   <p id="bio">{this.state.bio}</p>
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
                                                       <Input id="userEdit" allowClear={true} addonBefore="Username:" autosize={true} defaultValue={this.state.username}></Input>
                                                  </Col>
                                             </Row>
                                             <Row>
                                                  <Col>
                                                       <Input id="emailEdit" type="email" allowClear={true} addonBefore="Email:" autosize="true" defaultValue={this.state.email}></Input>
                                                  </Col>
                                             </Row>
                                             <Row>
                                                  <Col>
                                                       <Input id="gradeEdit" allowClear={true} addonBefore="Grade:" autosize="true" defaultValue={this.state.grade}></Input>
                                                  </Col>
                                             </Row>
                                             <Row>
                                                  <Col>
                                                       <Input id="candyEdit" allowClear={true} addonBefore="Candy:" autosize="true" defaultValue={this.state.candy}></Input>
                                                  </Col>
                                             </Row>
                                             <Row>
                                                  <Col>
                                                       <Input id="bioEdit" allowClear={true} addonBefore="Bio:" autosize="true" defaultValue={this.state.bio}></Input>
                                                  </Col>
                                             </Row>
                                        </div>
                                   </Modal>
                              </Col>
                         </Row>
                    </div>
               </div>
          )
     }
}
