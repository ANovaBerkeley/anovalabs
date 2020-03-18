import React, { Component } from 'react';
import '../stylesheets/Roster.css';
import { Card, Button, Modal, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

export default class RosterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      userId: this.props.person.id,
      username: this.props.person.name,
      email: this.props.person.email,
      candy: this.props.person.candy,
      hobby: this.props.person.hobby,
      notes: this.props.person.notes,
      editedNotes: this.props.person.notes
    };
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.editStudentProfile = this.editStudentProfile.bind(this);
  }

  onChangeNotes(event) {
    this.setState({ editedNotes: event.target.value });
  }

  editStudentProfile() {
    const { editedNotes, userId } = this.state;
    if (editedNotes.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255).',
        centered: true
      });
      return;
    }
    fetch('http://localhost:5000/api/v1/roster/update', {
      method: 'POST',
      body: JSON.stringify({
        editedNotes,
        userId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          showEditModal: false,
          notes: editedNotes
        });
      });
  }

  renderDescription() {
    const { mentor } = this.props;
    const { username, email, notes, candy, hobby } = this.state;
    let description;
    if (mentor) {
      description = (
        <div>
          <h2>Name: {username}</h2>
          <p>Email: {email}</p>
          <p>Favorite Candy: {candy}</p>
          <p>Favorite Hobby: {hobby}</p>
          <p>Notes: {notes}</p>
        </div>
      );
    } else {
      description = (
        <div>
          <h2>Name: {username}</h2>
          <p>Email: {email}</p>
        </div>
      );
    }
    return description;
  }

  renderEditButton() {
    const { mentor } = this.props;
    const { showEditModal, notes } = this.state;
    let editButton;
    if (mentor) {
      editButton = (
        <div>
          <Button
            type="primary"
            onClick={() => this.setState({ showEditModal: true })}
          >
            Edit Student Notes
          </Button>
          <Modal
            visible={showEditModal}
            title="Edit Student Notes"
            okText="Update"
            onCancel={() => this.setState({ showEditModal: false })}
            onOk={this.editStudentProfile}
          >
            <Row>
              <Col>
                <Input
                  rows={4}
                  id="notes"
                  addonBefore="Notes:"
                  autosize="true"
                  defaultValue={notes}
                  onChange={this.onChangeNotes}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }
    return editButton;
  }

  render() {
    const description = this.renderDescription();
    const maybeEditButton = this.renderEditButton();
    return (
      <div className="grid-item">
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
              {description}
              {maybeEditButton}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

RosterCard.propTypes = {
  mentor: PropTypes.bool
};
RosterCard.defaultProps = {
  mentor: false
};
