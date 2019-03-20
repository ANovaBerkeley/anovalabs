import React, { Component } from 'react'
import axios from 'axios';
import './Profile.css';
import { Button, Row, Col, Avatar } from 'antd';

export default class Profile extends Component {
     state = {
          // profileimage: '../images/student.png',
          profileimage: "https://image.flaticon.com/icons/png/128/1141/1141771.png",
          username: "John Smith",
          email: "potatofries@gmail.com",
          grade: "Senior",
          bio: "Once upon a time"
     }

     constructor(props) {
          super(props)
          this.handleClick = this.handleClick.bind(this);
          this.changeUser = this.changeUser.bind(this);
          this.changeBio = this.changeBio.bind(this);
          this.changeEmail = this.changeEmail.bind(this);
          this.changeGrade = this.changeGrade.bind(this);

     }

     handleClick(e) {
          var editButton = e.currentTarget;
          var editField = document.getElementById(editButton.id.slice(0,-4))
          var userEdit = prompt("What would you like to change your " + editField.id+ " to?", editField.innerText)
          let editFieldid = editField.id

          if (editFieldid == "username") {
               this.changeUser(userEdit.valueOf())
          } else if (editFieldid == "email") {
               this.changeEmail(userEdit.valueOf())
          } else if (editFieldid == "bio") {
               this.changeBio(userEdit.valueOf())
          } else if (editFieldid == "grade") {
               this.changeGrade(userEdit.valueOf())
          } else {
               alert("Something is amiss")
          }
     }

     changeUser(newusername) {
          this.setState(state => ({
               username: newusername
             }))
     }
     changeEmail(newemail) {
          this.setState(state => ({
               email: newemail
             }))
     }
     changeBio(newbio) {
          this.setState(state => ({
               bio: newbio
             }))
     }
     changeGrade(newgrade) {
          this.setState(state => ({
               grade: newgrade
             }))
     }

     render() {
          return (
               <div className="container">
                    <div className="profileBox">
                         <Row type="flex">
                              <Col>
                                   <Avatar src={this.state.profileimage} size="small" />
                              </Col>
                              <Col>
                                   <h1 id = "username" className="title">{this.state.username}</h1>
                              </Col>
                         </Row>
                         <Row type="flex">
                              <Col>
                                   <h1 id = "email" className="title">{this.state.email}</h1>
                              </Col>
                              <Col>
                              <Button className = "editButton" id = "emailedit" onClick = {(event) => this.handleClick(event)}><Avatar size={64} icon="edit" /></Button>
                              </Col>
                         </Row>
                         <Row type="flex">
                              <Col>
                                   <h1 id = "grade" className="title">{this.state.grade}</h1>
                              </Col>
                              <Col>
                              <Button className = "editButton" id = "gradeedit" onClick = {(event) => this.handleClick(event)}><Avatar size={64} icon="edit" /></Button>
                              </Col>
                         </Row>
                         <Row type="flex">
                              <Col>
                                   <p id = "bio">{this.state.bio}</p>
                              </Col>
                              <Col>
                                   <Button className = "editButton" id = "bioedit" onClick = {(event) => this.handleClick(event)}><Avatar size={64} icon="edit" /></Button>
                              </Col>
                         </Row>
                    </div>
               </div>
          )
     }
}
