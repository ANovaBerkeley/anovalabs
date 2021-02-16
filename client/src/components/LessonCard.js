import React, { useState } from 'react';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
// import * as decode from 'jwt-decode';
import { Link } from 'react-router-dom';

import '../stylesheets/LessonCard.css';
// const { TextArea } = Input;
const LessonCard = props => {
  const { isMentor, lessonDetails, deleteHandler, pool } = props;
  const { id, title, summary, date } = lessonDetails; // get notes here

  const [showModal, setShowModal] = useState(false);
  // const [showNotesModal, setShowNotesModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [editedNotes, setEditedNotes] = useState(notes);
  const [shownTitle, setShownTitle] = useState(title);
  const [shownSummary, setShownSummary] = useState(summary);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSummary, setEditedSummary] = useState(summary);

  const deleteLesson = () => {
    setShowModal(false);
    deleteHandler(lessonDetails);
  };

  // const onChangeNotes = event => {
  //   setEditedNotes(event.target.value);
  // };

  const onChangeTitle = event => {
    setEditedTitle(event.target.value);
  };

  const onChangeSummary = event => {
    setEditedSummary(event.target.value);
  };

  // editLesson() {
  //   const tok = localStorage.getItem('anovaToken');
  //   const dTok = decode(tok);
  //   let userId;
  //   userId = dTok.id;
  //   const { editedNotes, lessonId } = this.state;
  //   if (editedNotes.length >= 255) {
  //     Modal.error({
  //       title: 'Exceeded maximum number of characters (255).',
  //       centered: true,
  //     });
  //     return;
  //   }
  //   fetch('/api/v1/lesson_site/update', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       editedNotes,
  //       userId,
  //       lessonId,
  //     }),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(values => {
  //       this.setState({
  //         showNotesModal: false,
  //         notes: editedNotes,
  //       });
  //     });
  // }

  const editLessonDetails = () => {
    if (editedSummary.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255).',
        centered: true,
      });
      return;
    }
    fetch('/api/v1/lessons/update', {
      method: 'POST',
      body: JSON.stringify({
        editedTitle,
        editedSummary,
        id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(() => {
        setShowEditModal(false);
        setShownTitle(editedTitle);
        setShownSummary(editedSummary);
      })
      .catch(err => {
        Modal.error({
          title: 'Unable to update lesson.',
          centered: true,
        });
      });
  };

  // renderNotesButton() {
  //   const { isMentor } = this.state;
  //   const { showNotesModal, notes } = this.state;
  //   let notesButton;
  //   if (isMentor) {
  //     notesButton = (
  //       <div>
  //         <Button type="primary" onClick={() => this.setState({ showNotesModal: true })}>
  //           Notes
  //         </Button>
  //         <Modal
  //           visible={showNotesModal}
  //           title="Lesson Notes:"
  //           okText="Update"
  //           onCancel={() => this.setState({ showNotesModal: false })}
  //           onOk={this.editLesson}
  //         >
  //           <Row>
  //             <Col>
  //               <TextArea
  //                 rows={4}
  //                 id="notes"
  //                 addonBefore="Notes:"
  //                 autosize="true"
  //                 defaultValue={notes}
  //                 onChange={this.onChangeNotes}
  //               />
  //             </Col>
  //           </Row>
  //         </Modal>
  //       </div>
  //     );
  //   }
  //   return notesButton;
  // }

  const renderEditButton = () => {
    let editButton;
    if (isMentor) {
      editButton = (
        <>
          <Button
            type="primary"
            className="lowerButton"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </Button>
          <Modal
            visible={showEditModal}
            title="Update Lesson Details:"
            okText="Update"
            onCancel={() => setShowEditModal(false)}
            onOk={editLessonDetails}
          >
            <div className="addFields">
              <Row>
                <Col>
                  <Input
                    id="titleAdd"
                    allowClear
                    addonBefore="Title:"
                    autosize="true"
                    defaultValue={title}
                    onChange={onChangeTitle}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    id="summaryAdd"
                    allowClear
                    addonBefore="Summary:"
                    autosize="true"
                    defaultValue={summary}
                    onChange={onChangeSummary}
                  />
                </Col>
              </Row>
            </div>
          </Modal>
        </>
      );
    }
    return editButton;
  };

  // let maybeNotesButton;
  let maybeEditButton;
  if (!pool) {
    // maybeNotesButton = this.renderNotesButton();
  } else {
    maybeEditButton = renderEditButton();
  }
  let readableDate = '';
  if (date && !pool) {
    readableDate = new Date(date).toLocaleDateString();
  }
  let maybeDeleteButton;
  if (isMentor) {
    maybeDeleteButton = (
      <Popconfirm
        className="deleteModal"
        title="Delete this Lesson?"
        centered
        visible={showModal}
        onConfirm={deleteLesson}
        onCancel={() => setShowModal(false)}
      >
        <button className="deleteButton" onClick={() => setShowModal(true)} type="button">
          <GoTrashcan size="20" />
        </button>
      </Popconfirm>
    );
  }
  return (
    <div className={pool ? 'cardPool' : 'card'}>
      <div className="titleContainer">
        <div className="lessonTitle">{shownTitle}</div>
        {maybeDeleteButton}
      </div>
      {readableDate && <div className="date">{readableDate}</div>}
      <div className="descriptionContainer">
        <div className="description">{shownSummary}</div>
      </div>
      <div className="buttonContainer">
        {maybeEditButton}
        <Link to={'/LessonPage/' + id}>
          <button className="lowerButton">View Assignment</button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
