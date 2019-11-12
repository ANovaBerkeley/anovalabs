import React, { Component } from 'react';
import '../stylesheets/Roster.css';
import { Icon, Card, Avatar } from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

class ProfileDescription extends React.Component {
     render() {
       return (
       <div className = "profileDescription">
            <h2>Name: {this.props.person.name}</h2>
            <p>Email: {this.props.person.email}</p>

            <p>Notes: {this.props.person.notes}</p>
            <p>Favorite Candy: {this.props.person.candy}</p>
       </div>
       )
     }
   }

export default class RosterCard extends Component {
     render() {
          if (this.props.mentor) {
               return (
                    <div>
                    <Card
                         style={{ width: 300 }}
                         cover={<img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg" />}
                         actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                         <Meta
                              avatar={<Avatar src="https://image.flaticon.com/icons/svg/148/148767.svg" />}
                              title={this.props.person.username}
                              description= {<ProfileDescription person = {this.props.person} />}
                         />
                    </Card>
                    </div>
               )
          } else {
               return (
                    <div>
                    <Card
                         style={{ width: 300 }}
                         cover={<img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg"/>}
                    >
                         <Meta
                              avatar={<Avatar src="https://image.flaticon.com/icons/svg/148/148767.svg" />}
                              title={this.props.person.username}
                              description= {<ProfileDescription person = {this.props.person} />}
                         />
                    </Card>
                    </div>
               )
          }
     }
}
