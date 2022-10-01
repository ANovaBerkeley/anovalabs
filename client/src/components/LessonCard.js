import React, { useState } from 'react';
import { Popconfirm, Button, Modal, Row, DatePicker, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
import * as decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { handleErrors } from '../utils/helpers';
import '../stylesheets/LessonCard.css';

const LessonCard = props => {
  const { isMentor, lessonDetails, deleteHandler, pool } = props;
  const { id, title, summary, date } = lessonDetails;

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [shownTitle, setShownTitle] = useState(title);
  const [shownSummary, setShownSummary] = useState(summary);
  const [shownDate, setShownDate] = useState(date);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [editedDate, setEditedDate] = useState(date);

  const deleteLesson = () => {
    setShowModal(false);
    deleteHandler(lessonDetails);
  };

  const onChangeTitle = event => {
    // if (event.target.value.length == 0) {
    //   Modal.error({
    //     title: 'Lesson must have > 0 characters.',
    //     centered: true,
    //   })
    //   //deleteLesson();
    //   return;
    // }
    setEditedTitle(event.target.value);
  };

  const onChangeSummary = event => {
    setEditedSummary(event.target.value);
  };

  const onChangeDate = date => {
    setEditedDate(date);
  };

  // const editTitle = () => {
  //   if (editedTitle.length == 0) {
  //     Modal.error({
  //       title: 'Exceeded maximum number of characters (255).',
  //       centered: true,
  //     });
  //     return;
  //   }
  // }

  const editLessonDetails = () => {
    if (editedTitle.length == 0) {
      Modal.error({
        title: 'Title must have > 0 characters.',
        centered: true,
      });
      return;
    }
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
      .then(handleErrors)
      .then(() => {
        setShownTitle(editedTitle);
        setShownSummary(editedSummary);
      })
      .catch(() => {
        Modal.error({
          title: 'Unable to update lesson details.',
          centered: true,
        });
      });

    if (!pool) {
      const tok = localStorage.getItem('anovaToken');
      const dTok = decode(tok);
      let userId;
      userId = dTok.id;

      fetch('/api/v1/lesson_site/update', {
        method: 'POST',
        body: JSON.stringify({
          editedDate,
          userId,
          id,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(handleErrors)
        .then(() => {
          setShowEditModal(false);
          setShownDate(editedDate);
        })
        .catch(() => {
          Modal.error({
            title: 'Unable to update lesson date.',
            centered: true,
          });
        });

        
    }
  };

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
                <Input
                  id="titleAdd"
                  allowClear
                  addonBefore="Title:"
                  autosize="true"
                  defaultValue={title}
                  onChange={onChangeTitle}
                  maxLength={30}
                />
              </Row>
              <Row>
                <Input
                  id="summaryAdd"
                  allowClear
                  addonBefore="Summary:"
                  autosize="true"
                  defaultValue={summary}
                  onChange={onChangeSummary}
                  maxLength={200}
                />
              </Row>
              {!pool && (
                <Row>
                  <DatePicker defaultValue={moment(date)} onChange={onChangeDate} />
                </Row>
              )}
            </div>
          </Modal>
        </>
      );
    }
    return editButton;
  };

  let readableDate = '';
  if (shownDate && !pool) {
    readableDate = new Date(shownDate).toLocaleDateString();
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
        {renderEditButton()}
        <Link to={'/LessonPage/' + id}>
          <button className="lowerButton">View Assignment</button>
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
