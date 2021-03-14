import React, { useState } from 'react';
import '../stylesheets/Roster.css';
import { Card, Button, Modal, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const { TextArea } = Input;

const RosterCard = props => {
  const { mentor, person } = props;

  const { id, username, email, candy, hobby, fact, notes } = person; // TODO: fetch candy and hobby to display here!
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [displayNotes, setDisplayNotes] = useState(notes);

  console.log(props);

  const onChangeNotes = event => {
    setEditedNotes(event.target.value);
  };

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
        id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(() => {
        setShowEditModal(false);
        setDisplayNotes(editedNotes);
      })
      .catch(err => console.log('unable to update roster'));
  };

  const renderDescription = () => {
    let description;
    if (mentor) {
      description = (
        <div>
          <h2>Name: {username}</h2>
          <p><span className="rosterCardItem" id="email">Email</span> {email}</p>
          <p><span className="rosterCardItem" id="candy">Favorite Candy</span> {candy}</p>
          <p><span className="rosterCardItem" id="hobby">Favorite Hobby</span> {hobby}</p>
          <p><span className="rosterCardItem" id="fact">Fun Fact</span> {fact}</p>
          <p><span className="rosterCardItem" id="notes">Notes</span> {displayNotes}</p>
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
  };

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
            onOk={editStudentProfile}
          >
            <Row>
              <Col>
                <TextArea
                  rows={4}
                  id="notes"
                  addonBefore="Notes:"
                  autosize="true"
                  defaultValue={notes}
                  onChange={onChangeNotes}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }
    return editButton;
  };

  const description = renderDescription();
  const maybeEditButton = renderEditButton();

  return (
    <div>
      <Card
        style={{ borderRadius: '20px'}}
        cover={<img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg" />}
      >
        {description}
        {maybeEditButton}
      </Card>
    </div>
  );
};

RosterCard.propTypes = {
  mentor: PropTypes.bool,
};
RosterCard.defaultProps = {
  mentor: false,
};

export default RosterCard;
