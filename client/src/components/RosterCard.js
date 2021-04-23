import React, { useState } from 'react';
import '../stylesheets/RosterCard.css';
import { Card, Button, Modal, Input, Row, Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { handleErrors } from '../utils/helpers';

const { TextArea } = Input;

const RosterCard = props => {
  const { isMentor, person, mentorCard, showActive, showAll } = props;
  const { id, name, email, candy, hobby, fact, notes } = person; // TODO: fetch candy and hobby to display here!
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [displayNotes, setDisplayNotes] = useState(notes);
  const [studentSemesters, setStudentSemesters] = useState(person.studentSemesters);
  const [editedStudentSemesters, setEditedStudentSemesters] = useState('');
  const [displayStudentSemesters, setDisplayStudentSemesters] = useState(
    studentSemesters,
  );

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

  const onChangeNotes = event => {
    setEditedNotes(event.target.value);
  };

  const onChangeStudentSemesters = event => {
    setEditedStudentSemesters(event.target.value);
  };

  const editStudentProfile = () => {
    if (editedNotes.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255) for Notes.',
        centered: true,
      });
      return;
    }
    if (editedStudentSemesters.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255) for Semesters.',
        centered: true,
      });
      return;
    }
    fetch('/api/v1/roster/update', {
      method: 'POST',
      body: JSON.stringify({
        editedStudentSemesters,
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
        setDisplayStudentSemesters(editedStudentSemesters);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to update student info.',
          centered: true,
        }),
      );
  };

  const renderDescription = () => {
    let description;
    if (!mentorCard && !studentSemesters) {
      fetch(`/api/v1/roster/getSite?uid=${id}`)
        .then(res => res.json())
        .then(userSemester => {
          setDisplayStudentSemesters(userSemester[0].semester);
          setStudentSemesters(userSemester[0].semester);
        });
    }
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
            {displayStudentSemesters}
          </p>
        </div>
      );
    } else {
      description = null;
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
            Edit Student Info
          </Button>
          <Modal
            visible={showEditModal}
            title="Edit Student Info"
            okText="Update"
            onCancel={() => setShowEditModal(false)}
            onOk={editStudentProfile}
            bodyStyle={{ paddingTop: '10px' }}
          >
            <Row>
              <Col style={{ marginBottom: '4px' }}> Notes:</Col>
              <Col>
                <TextArea
                  rows={4}
                  id="notes"
                  autosize="true"
                  defaultValue={notes}
                  onChange={onChangeNotes}
                  style={{ marginBottom: '12px' }}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginBottom: '4px' }}> Semesters Attended:</Col>
              <Col>
                <TextArea
                  rows={4}
                  id="studentSemesters"
                  autosize="true"
                  defaultValue={studentSemesters}
                  onChange={onChangeStudentSemesters}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      );
    }
    return editButton;
  };

  const currSemester = getCurrentSemester();
  const description = renderDescription();
  const maybeEditButton = renderEditButton();

  const maybeCard = (
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
    return maybeCard;
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
