import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Roster.css';
import { Icon, Card, Avatar } from 'antd';
import "antd/dist/antd.css";
const { Meta } = Card;

class ProfileDescription extends React.Component {
     render() {
       return (
       <div className = "profileDescription">
            <p>Email: {this.props.student.email}</p>
            <p>Grade: {this.props.student.grade}</p>
            <p>Bio: {this.props.student.bio}</p>
            <p>Candy: {this.props.student.candy}</p>
       </div>
       )
     }
   }

export default class ProfileCard extends Component {
     render() {
          return (
               <div>
               <Card
                    style={{ width: 300 }}
                    cover={<img alt="" src={this.props.student.profileimage} />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
               >
                    <Meta
                         avatar={<Avatar src="https://image.flaticon.com/icons/svg/148/148767.svg" />}
                         title={this.props.student.username}
                         description= {<ProfileDescription student = {this.props.student} />}
                    />
               </Card>
               </div>
          )
     }
}
