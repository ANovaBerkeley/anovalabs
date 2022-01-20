import React, { useState, useEffect } from 'react';
import { Modal, Input, Row, Col } from 'antd';
import { GoPlus } from 'react-icons/go';
import '../stylesheets/LessonPool.css';
import LessonCard from './LessonCard';
import { handleErrors } from '../utils/helpers';

const LessonPool = props => {
  const { isMentor } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    fetch('/api/v1/lessons/all')
      .then(handleErrors)
      .then(allLessons => {
        setAllLessons(allLessons);
        setIsLoaded(true);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to fetch lessons.',
          centered: true,
        }),
      );
  }, []);

  const deleteHandler = lessonDetails => {
    fetch('/api/v1/lessons/delete', {
      method: 'POST',
      body: JSON.stringify({ id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(handleErrors)
      .then(() => {
        const newAllLessons = allLessons.filter(item => item.id !== lessonDetails.id);
        setAllLessons(newAllLessons);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to delete lesson.',
          centered: true,
        }),
      );
  };

  const addLessonToPool = () => {
    const titleAdd = document.getElementById('titleAdd');
    const summaryAdd = document.getElementById('summaryAdd');

    if (!titleAdd.value || !summaryAdd.value) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
    } else {
      const item = {
        title: titleAdd.value,
        summary: summaryAdd.value,
      };
      fetch('/api/v1/lessons/add', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(handleErrors)
        .then(newLessonInfo => {
          item['id'] = newLessonInfo.id;
          setAllLessons([...allLessons, item]);
          setShowModal(false);
        })
        .catch(() =>
          Modal.error({
            title: 'Unable to add lesson.',
            centered: true,
          }),
        );
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  let maybeAddCard;
  if (isMentor) {
    maybeAddCard = (
      <div>
        <button type="button" className="plusCard" onClick={() => setShowModal(true)}>
          <GoPlus size={100} color="grey" />
        </button>

        <Modal
          className="addModal"
          title="Add a New Lesson"
          centered
          visible={showModal}
          onOk={addLessonToPool}
          onCancel={() => setShowModal(false)}
        >
          <div className="addFields">
            <Row>
              <Col>
                <Input
                  id="titleAdd"
                  allowClear
                  addonBefore="Title:"
                  autosize="true"
                  defaultValue=""
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
                  defaultValue=""
                />
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="fxLessonPoolContainer">
      <div className="lessons_title">
        <h1>All Lessons</h1>
      </div>
      <div className="lessonPoolContainer">
        {allLessons &&
          allLessons.map(item => (
            <LessonCard
              key={item.id}
              deleteHandler={deleteHandler}
              lessonDetails={item}
              pool
              isMentor={isMentor}
            />
          ))}
        {maybeAddCard}
      </div>
    </div>
  );
};
export default LessonPool;
