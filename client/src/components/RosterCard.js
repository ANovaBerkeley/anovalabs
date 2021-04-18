import React, { useState } from 'react';
import '../stylesheets/RosterCard.css';
import { Card, Button, Modal, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { handleErrors } from '../utils/helpers';

const { TextArea } = Input;

const RosterCard = props => {
  const { isMentor, person, mentorCard } = props;

  const { id, name, email, candy, hobby, fact, studentSemesters, notes } = person; // TODO: fetch candy and hobby to display here!
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [displayNotes, setDisplayNotes] = useState(notes);
  const [editedStudentSemesters, setEditedSemesters] = useState('');
  const [displayStudentSemesters, setDisplaySemesters] = useState(studentSemesters);

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
        name,
        candy,
        hobby,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(handleErrors)
      .then(() => {
        setShowEditModal(false);
        setDisplayNotes(editedNotes);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to update student notes.',
          centered: true,
        }),
      );
  };

  const renderDescription = () => {
    let description;
    if (mentorCard) {
      description = (
        <div>
          <h2>{name}</h2>
          <p>
            <span className="rosterCardItem" id="emailBubble">
              EMAIL
            </span>{' '}
            {email}
          </p>
        </div>
      );
    } else if (isMentor) {
      description = (
        <div>
          <h2>{name}</h2>
          <p>
            <span className="rosterCardItem" id="emailBubble">
              EMAIL
            </span>{' '}
            {email}
          </p>
          <p>
            <span className="rosterCardItem" id="candyBubble">
              FAV CANDY
            </span>{' '}
            {candy}
          </p>
          <p>
            <span className="rosterCardItem" id="hobbyBubble">
              FAV HOBBY
            </span>{' '}
            {hobby}
          </p>
          <p>
            <span className="rosterCardItem" id="factBubble">
              FUN FACT
            </span>{' '}
            {fact}
          </p>
          <p>
            <span className="rosterCardItem" id="semestersAttendedBubble">
              SEMESTERS
            </span>{' '}
            {displayStudentSemesters}
          </p>
          <p>
            <span className="rosterCardItem" id="notesBubble">
              NOTES
            </span>{' '}
            {displayNotes}
          </p>
        </div>
      );
    } else {
      description = (
        <div>
          <h2>{name}</h2>
          <p>
            <span className="rosterCardItem" id="emailBubble">
              EMAIL
            </span>{' '}
            {email}
          </p>
          <p>
            <span className="rosterCardItem" id="candyBubble">
              FAV CANDY
            </span>{' '}
            {candy}
          </p>
          <p>
            <span className="rosterCardItem" id="hobbyBubble">
              FAV HOBBY
            </span>{' '}
            {hobby}
          </p>
          <p>
            <span className="rosterCardItem" id="factBubble">
              FUN FACT
            </span>{' '}
            {fact}
          </p>
          <p>
            <span className="rosterCardItem" id="semestersAttendedBubble">
              SEMESTERS
            </span>{' '}
            {displayStudentSemesters}
          </p>
        </div>
      );
    }
    return description;
  };

  const renderEditButton = () => {
    let editButton;
    if (!mentorCard && isMentor) {
      editButton = (
        <div className="buttonContainer">
          <Button
            type="primary"
            className="lowerButton"
            onClick={() => setShowEditModal(true)}
          >
            Edit Student Notes
          </Button>
          <Modal
            visible={showEditModal}
            title="Edit Student Info"
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
        style={{ borderRadius: '20px' }}
        cover={<img alt="" src="https://image.flaticon.com/icons/svg/1141/1141771.svg" />}
      >
        {description}
        {maybeEditButton}
      </Card>
    </div>
  );
};

RosterCard.propTypes = {
  isMentor: PropTypes.bool,
};

RosterCard.defaultProps = {
  isMentor: false,
};

export default RosterCard;
