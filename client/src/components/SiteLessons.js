import React, { useState, useEffect } from 'react';
// import { useAsync } from "react-async"
import { Modal, DatePicker, Select } from 'antd';
import * as decode from 'jwt-decode';
import { GoPlus } from 'react-icons/go';
import LessonCard from './LessonCard';
import '../stylesheets/SiteLessons.css';
import { getAnovaToken, removeAnovaToken } from '../utils/utils';
import { useHistory, withRouter } from 'react-router-dom';

const { Option } = Select;
// TODO reset modal values onOk
const SiteLessons = props => {
  const { ismentor } = props;
  const [showModal, setShowModal] = useState(false);
  const [siteLessons, setSiteLessons] = useState([]);
  const [site, setSite] = useState('');
  const [otherLessons, setOtherLessons] = useState([]);
  const [modalSelectedValue, setModalSelectedValue] = useState('');
  const [modalDate, setModalDate] = useState('');
  const history = useHistory();
  const [dTok, setDTok] = useState({});

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

  const onDateChange = date => {
    setModalDate(date);
  };

  const onSelectChange = value => {
    setModalSelectedValue(value);
  };

  const deleteHandler = lessonDetails => {
    fetch(`/api/v1/lesson_site/delete?uid=${dTok.id}`, {
      method: 'POST',
      body: JSON.stringify({ lesson_id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => {
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
    });
  };

  const addLessonToSite = (lessonId, date) => {
    if (!lessonId || !date) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
    } else {
      fetch(`/api/v1/lesson_site/add?uid=${dTok.id}`, {
        method: 'POST',
        body: JSON.stringify({ lesson_id: lessonId, date }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .then(newLesson => {
          let newSiteLessons = [...siteLessons, { ...newLesson, date }];
          var sorted_lessons = newSiteLessons.sort((siteLesson1, siteLesson2) => {
            return (
              new Date(siteLesson1.date).getTime() - new Date(siteLesson2.date).getTime()
            );
          });
          setSiteLessons(sorted_lessons);
          setOtherLessons(prevOtherLessons => {
            if (prevOtherLessons && otherLessons) {
              return prevOtherLessons.filter(otherLesson => otherLesson.id !== lessonId);
            }
          });
          setShowModal(false);
          setModalSelectedValue('');
          setModalDate('');
        });
    }
  };

  const renderLessons = () => {
    let maybeAddCard;
    if (ismentor) {
      maybeAddCard = (
        <div className="plusCard">
          <GoPlus onClick={() => setShowModal(true)} size={100} color="grey" />
          <Modal
            className="addModal"
            title="Add a Lesson"
            centered
            visible={showModal}
            onOk={() => addLessonToSite(modalSelectedValue, modalDate)}
            onCancel={() => setShowModal(false)}
            destroyOnClose={true}
          >
            <div className="addLesson">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a lesson"
                optionFilterProp="children"
                onChange={onSelectChange}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {otherLessons &&
                  otherLessons.length > 0 &&
                  otherLessons.map(lesson => (
                    <Option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </Option>
                  ))}
              </Select>
              <br />
              <div>
                <DatePicker onChange={onDateChange} />
              </div>
            </div>
          </Modal>
        </div>
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
                isMentor={ismentor}
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
