import React, { useState } from 'react';
import '../stylesheets/RosterCard.css';
import { Card, Button, Modal, Input, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { handleErrors } from '../utils/helpers';

const { TextArea } = Input;

const RosterCard = props => {
  const { isMentor, person, mentorCard, showActive, showAll } = props;
  const { id, name, email, candy, hobby, fact, notes } = person;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [displayNotes, setDisplayNotes] = useState(notes);
  const [studentSemesters, setStudentSemesters] = useState(JSON.parse(person.studentSemesters));
  const [editedStudentSemesters, setEditedStudentSemesters] = useState(studentSemesters);
  
  const getCurrentSemester = () => {
    const currDate = new Date();
    const month = currDate.getMonth();
    const year = Number(currDate.getYear()) + 1900;
    let semester;
    if (month < 7) {
      semester = `Spring ${year}`;
    } else {
      semester = `Fall ${year}`;
    }
    return semester;
  };

  const isToggleActive = () => {
    return editedStudentSemesters && editedStudentSemesters.includes(currSemester);
  };

  const onChangeNotes = event => {
    setEditedNotes(event.target.value);
  };

  const onChangeStudentSemesters = checked => {
    let edited = [...editedStudentSemesters] ? [...editedStudentSemesters] : [];
    if (checked && !isToggleActive()) {
      edited.push(currSemester);
    } else {
      edited.pop();
    }

    setEditedStudentSemesters(edited);
  };

  const editStudentProfile = () => {
    let updateNotes = editedNotes;
    if (!updateNotes) {
      updateNotes = notes;
    }
    if (updateNotes.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255) for Notes.',
        centered: true,
      });
      return;
    }
    fetch('/api/v1/roster/update', {
      method: 'POST',
      body: JSON.stringify({
        editedStudentSemesters,
        updateNotes,
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
        setEditedStudentSemesters(editedStudentSemesters);
        setStudentSemesters(editedStudentSemesters);
      })
      .catch(error => {
        console.log(error);
        Modal.error({
          title: 'Unable to update student info.',
          centered: true,
        });
      });
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
            Edit Student Info
          </Button>
          <Modal
            visible={showEditModal}
            title="Edit Student Info"
            okText="Update"
            onCancel={() => {
              setShowEditModal(false);
              setEditedStudentSemesters(studentSemesters);
            }}
            onOk={editStudentProfile}
            bodyStyle={{ paddingTop: '10px' }}
          >
            <Row>
              <Col style={{ marginBottom: '10px' }}>
                {' '}
                <span className="rosterCardItem" id="notesBubble">
                  NOTES
                </span>{' '}
              </Col>
              <Col>
                <TextArea
                  rows={4}
                  id="notes"
                  autosize="true"
                  defaultValue={notes}
                  onChange={onChangeNotes}
                  style={{ marginBottom: '15px' }}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginBottom: '10px' }}>
                {' '}
                <span className="rosterCardItem" id="semestersAttendedBubble">
                  SEMESTERS
                </span>{' '}
                <Switch
                  checkedChildren="Active Student"
                  unCheckedChildren="Inactive Student"
                  defaultChecked={
                    editedStudentSemesters &&
                    editedStudentSemesters.includes(currSemester)
                  }
                  checked={
                    editedStudentSemesters &&
                    editedStudentSemesters.includes(currSemester)
                  }
                  onChange={onChangeStudentSemesters}
                  disabled={isToggleActive() && studentSemesters.length == 1}
                />
              </Col>
              <Col>
                { editedStudentSemesters && editedStudentSemesters.length
                  ? editedStudentSemesters.join(", ")
                  : editedStudentSemesters}
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }
    return editButton;
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
        </div>
      );
    } else if (
      isMentor &&
      !mentorCard &&
      studentSemesters &&
      (showAll ||
        (showActive && !showAll && studentSemesters.includes(currSemester)) ||
        (!showActive && !showAll && !studentSemesters.includes(currSemester)))
    ) {
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
            { editedStudentSemesters && editedStudentSemesters.length
              ? editedStudentSemesters.join(", ")
              : editedStudentSemesters }{' '}
          </p>
          <p>
            <span className="rosterCardItem" id="notesBubble">
              NOTES
            </span>{' '}
            {displayNotes}
          </p>
        </div>
      );
    } else if (
      !isMentor &&
      !mentorCard &&
      studentSemesters &&
      studentSemesters.includes(currSemester)
    ) {
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
            { editedStudentSemesters && editedStudentSemesters.length
              ? editedStudentSemesters.join(", ")
              : editedStudentSemesters}{' '}
          </p>
        </div>
      );
    } else {
      description = null;
    }
    return description;
  };

  const currSemester = getCurrentSemester();
  const description = renderDescription();
  const maybeEditButton = renderEditButton();

  const userCard = (
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

  if (description) {
    return userCard;
  } else {
    return null;
  }
};

RosterCard.propTypes = {
  isMentor: PropTypes.bool,
  showActive: PropTypes.bool,
  showAll: PropTypes.bool,
};

RosterCard.defaultProps = {
  isMentor: false,
  showActive: true,
  showAll: false,
};

export default RosterCard;
