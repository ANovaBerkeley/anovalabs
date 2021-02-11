import React, { useState, useEffect } from 'react';
import '../stylesheets/Roster.css';
import { Card, Button, Modal, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const { TextArea } = Input;

const RosterCard = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showEditModal: false,
  //     userId: this.props.person.id,
  //     username: this.props.person.name,
  //     email: this.props.person.email,
  //     candy: this.props.person.candy,
  //     hobby: this.props.person.hobby,
  //     notes: this.props.person.notes,
  //     editedNotes: this.props.person.notes,
  //   };
  //   this.onChangeNotes = this.onChangeNotes.bind(this);
  //   this.editStudentProfile = this.editStudentProfile.bind(this);
  // }
  const { userId, username, email, candy, hobby} = props.person;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [notes, setNotes] = useState(props.person.notes);
  const {mentor} = props; 


  const onChangeNotes = (event) => {
    setEditedNotes(event.target.value);
  }

  const editStudentProfile = () => {
    if (editedNotes.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255).',
        centered: true,
      });
      return;
    }
    fetch('/api/v1/roster/update', {
      method: 'POST',
      body: JSON.stringify({
        editedNotes,
        userId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(() => {
        setShowEditModal(false);
        setNotes(editedNotes);
      });
  }

  const renderDescription = () => {
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

  const renderEditButton = () => {
    // const { mentor } = this.props;
    // const { showEditModal, notes } = this.state;
    let editButton;
    if (mentor) {
      editButton = (
        <div>
          <Button type="primary" onClick={() => setShowEditModal(true)}>
            Edit Student Notes
          </Button>
          <Modal
            visible={showEditModal}
            title="Edit Student Notes"
            okText="Update"
            onCancel={() => setShowEditModal(false)}
            onOk={editStudentProfile()}
          >
            <Row>
              <Col>
                <TextArea
                  rows={4}
                  id="notes"
                  addonBefore="Notes:"
                  autosize="true"
                  defaultValue={notes}
                  onChange={onChangeNotes()}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }
    return editButton;
  }


  const description = renderDescription();
  const maybeEditButton = renderEditButton();
  
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg" />
        }
      >
        {description}
        {maybeEditButton}
      </Card>
    </div>
  );
}


RosterCard.propTypes = {
  mentor: PropTypes.bool,
};
RosterCard.defaultProps = {
  mentor: false,
};

export default RosterCard;