import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Roster.css';
import { Icon, Card, Avatar, Menu, Dropdown, Modal, Button, Form, Input } from 'antd';
import "antd/dist/antd.css";
const { Meta } = Card;

class ProfileDescription extends React.Component {
     render() {
          return (
          <div className = "profileDescription">
               <h2>Name: {this.props.student.name}</h2>
               <p>Email: {this.props.student.email}</p>

               <p>Notes: {this.props.student.notes}</p>
               <p>Favorite Candy: {this.props.student.candy}</p>
          </div>
          )
     }
}

const EditModal = Form.create({ name: 'form_in_modal' })(
class extends React.Component {
     render() {
          const { visible, onCancel, onCreate, form } = this.props;
          const { getFieldDecorator } = form;

          return (
               <Modal
               visible={visible}
               title="Create a new collection"
               okText="Create"
               onCancel={onCancel}
               onOk={onCreate}>
                    <Form layout="vertical">
                         <Form.Item label="Name">
                         {getFieldDecorator('name', {
                              rules: [{ required: true, message: 'Please input student name!' }],
                         })(<Input />)}
                         </Form.Item>
                         <Form.Item label="Email">
                         {getFieldDecorator('email', {
                              rules: [{ required: true, message: 'Please input student name!' }],
                         })(<Input/>)}
                         </Form.Item>
                         <Form.Item label="Notes">
                              {getFieldDecorator('notes')(<Input type="textarea"/>)}
                         </Form.Item>
                         <Form.Item label="Favorite Candy">
                              {getFieldDecorator('candy')(<Input/>)}
                         </Form.Item>
                    </Form>
               </Modal>
          )
     }
},
);

export default class ProfileCard extends Component {
     state = {
          visible: false,
          username: this.props.student.name,
          email: this.props.student.email,
          notes: this.props.student.notes,
          candy: this.props.student.candy,
     };
     
     showModal = () => {
          this.setState({ visible: true });
     };
     
     handleCancel = () => {
          this.setState({ visible: false });
     };

     handleCreate = () => {
          const { form } = this.formRef.props;
          form.validateFields((err, values) => {
               if (err) {
                    return;
               }
               fetch('http://localhost:5000/api/v1/rosterStudent/update',
                    { method: 'POST',
                         body: JSON.stringify({ name: values.name, email: values.email, notes: values.notes, candy: values.candy }),
                         headers: new Headers({
                         'Content-Type': 'application/json'
                         }),
                    })
                    .then(res => res.json())
                    .then(
                         values => {
                         form.resetFields();
                         this.setState({ visible: false, username: values.name, email: values.email, notes: values.notes, candy: values.candy });
               });
          });
     };

     saveFormRef = formRef => {
          this.formRef = formRef;
     };
     
     render() {
          console.log(this.props.student);
          if (this.props.mentor) {
               return (
                    <div>
                    
                    <Card
                         style={{ width: 300 }}
                         cover={<img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg" />}
                    >
                    <h2>Name: {this.state.username}</h2>
                    <p>Email: {this.state.email}</p>
                    <p>Notes: {this.state.notes}</p>
                    <p>Favorite Candy: {this.state.candy}</p>
                    <Button type="primary" onClick={this.showModal}>
                         Edit Profile
                    </Button>
                    <EditModal
                         wrappedComponentRef={this.saveFormRef}
                         visible={this.state.visible}
                         onCancel={this.handleCancel}
                         onCreate={this.handleCreate}
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
                    <h2>Name: {this.state.username}</h2>
                    <p>Email: {this.state.email}</p>
                    <p>Notes: {this.state.notes}</p>
                    <p>Favorite Candy: {this.state.candy}</p>
                    </Card>
                    </div>
               )
          }
     }
}
