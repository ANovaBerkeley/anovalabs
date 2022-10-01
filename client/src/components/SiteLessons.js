import React, { useState, useEffect } from 'react';
import { Modal, DatePicker, Row, Input } from 'antd';
import * as decode from 'jwt-decode';
import { GoPlus } from 'react-icons/go';
import LessonCard from './LessonCard';
import '../stylesheets/SiteLessons.css';
import { getAnovaToken, removeAnovaToken } from '../utils/utils';
import { useHistory, withRouter } from 'react-router-dom';
import { handleErrors } from '../utils/helpers';

// TODO reset modal values onOk
const SiteLessons = props => {
  const { isMentor } = props;
  const [showModal, setShowModal] = useState(false);
  const [siteLessons, setSiteLessons] = useState([]);
  const [site, setSite] = useState('');
  const [otherLessons, setOtherLessons] = useState([]);
  const [modalDate, setModalDate] = useState('');
  const history = useHistory();
  const [dTok, setDTok] = useState({});
  const [newLessonId, setNewLessonId] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const tok = getAnovaToken();
        const decodedToken = await decode(tok);
        setDTok(decodedToken);
      } catch (err) {
        removeAnovaToken();
        history.push(`/login`);
      }
    };
    getToken();
  }, [history]);

  useEffect(() => {
    if (Object.keys(dTok).length > 0) {
      loadData();
    }
  }, [dTok]);

  useEffect(() => {
    if (newLessonId) {
      addLessonToSite();
    }
  }, [newLessonId]);

  const loadData = () => {
    fetch(`/api/v1/site/current?uid=${dTok.id}`)
      .then(res => res.json())
      .then(site => {
        setSite(site);
      });

    fetch(`/api/v1/lesson_site/all?uid=${dTok.id}`)
      .then(res => res.json())
      .then(siteLessons => {
        setSiteLessons(siteLessons);
      });

    fetch(`/api/v1/lesson_site/all_but_current_site?uid=${dTok.id}`)
      .then(res => res.json())
      .then(otherLessons => {
        setOtherLessons(otherLessons);
      });
  };

  const addLessonToSite = () => {
    if (!newLessonId || !modalDate) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
    } else {
      fetch(`/api/v1/lesson_site/add?uid=${dTok.id}`, {
        method: 'POST',
        body: JSON.stringify({ lesson_id: newLessonId, modalDate }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(handleErrors)
        .then(newLesson => {
          let newSiteLessons = [...siteLessons, { ...newLesson, date: modalDate }];
          var sorted_lessons = newSiteLessons.sort((siteLesson1, siteLesson2) => {
            return (
              new Date(siteLesson1.date).getTime() - new Date(siteLesson2.date).getTime()
            );
          });
          setSiteLessons(sorted_lessons);
          setOtherLessons(prevOtherLessons => {
            if (prevOtherLessons && otherLessons) {
              return prevOtherLessons.filter(
                otherLesson => otherLesson.id !== newLessonId,
              );
            }
          });
          setShowModal(false);
          setModalDate('');
          setNewLessonId('');
        })
        .catch(() =>
          Modal.error({
            title: 'Error adding lesson to site. Please try again.',
            centered: true,
          }),
        );
    }
  };

  const onDateChange = date => {
    setModalDate(date);
  };

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
        setSiteLessons(prevSiteLessons => {
          if (prevSiteLessons) {
            return prevSiteLessons.filter(lesson => lesson.id !== lessonDetails.id);
          }
        });
        setOtherLessons(prevOtherLessons => {
          if (prevOtherLessons) {
            return [...prevOtherLessons, lessonDetails];
          }
        });
      })
      .catch(() =>
        Modal.error({
          title: 'Error deleting lesson. Please try again.',
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
          setNewLessonId(newLessonInfo.id);
          setShowModal(false);
        })
        .catch(() =>
          Modal.error({
            title: 'Error adding lesson. Please try again.',
            centered: true,
          }),
        );
    }
  };

  const renderLessons = () => {
    let maybeAddCard;
    if (isMentor) {
      maybeAddCard = (
        <>
          <div className="plusCard" onClick={() => setShowModal(true)}>
            <GoPlus size={100} color="grey" />
          </div>
          <Modal
            className="addModal"
            title="Add a Lesson"
            centered
            visible={showModal}
            onOk={addLessonToPool}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
          >
            <div className="addLesson">
              <Row>
                <Input
                  id="titleAdd"
                  allowClear
                  addonBefore="Title:"
                  autosize="true"
                  defaultValue=""
                  maxLength={30}
                  showCount={true}
                />
              </Row>
              <Row>
                <Input
                  id="summaryAdd"
                  allowClear
                  addonBefore="Summary:"
                  autosize="true"
                  defaultValue=""
                  maxLength={200}
                  showCount={true}
                />
              </Row>
              <Row>
                <DatePicker onChange={onDateChange} />
              </Row>
            </div>
          </Modal>
        </>
      );
    }

    return (
      <div className="siteLessonsContainer">
        <div className="lessons_title">
          <h1>{site.schoolName} Lessons</h1>
        </div>
        <div className="lessonsContainer">
          {siteLessons &&
            siteLessons.length > 0 &&
            siteLessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                deleteHandler={deleteHandler}
                lessonDetails={lesson}
                pool={false}
                isMentor={isMentor}
              />
            ))}
          {maybeAddCard}
        </div>
      </div>
    );
  };

  return <div>{renderLessons()}</div>;
};

export default withRouter(SiteLessons);
