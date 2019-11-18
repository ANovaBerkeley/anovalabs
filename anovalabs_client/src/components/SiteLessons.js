import React, { Component } from 'react';
import { Modal, DatePicker, Select } from 'antd';
import * as decode from 'jwt-decode';
import { GoPlus } from 'react-icons/go';
import LessonCard from './LessonCard';
import '../stylesheets/SiteLessons.css';

const { Option } = Select;
// import '../stylesheets/Lessons.css';

// TODO reset modal values onOk
// add documentation

class SiteLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMentor: this.props.ismentor,
      showModal: false,
      siteLessons: [],
      site: '',
      otherLessons: [],
      modalSelectedValue: '',
      modalDate: ''
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);

    fetch(`http://localhost:5000/api/v1/site/current?uid=${dTok.id}`)
      .then(res => res.json())
      .then(site => {
        this.setState({
          site
        });
      });
    fetch(`http://localhost:5000/api/v1/lesson_site/all?uid=${dTok.id}`)
      .then(res => res.json())
      .then(siteLessons => {
        this.setState({
          siteLessons
        });
      });
    fetch(`http://localhost:5000/api/v1/lesson_site/all_but_current_site?uid=${dTok.id}`)
      .then(res => res.json())
      .then(otherLessons => {
        this.setState({
          otherLessons
        });
      });
  }

  onDateChange(date) {
    this.setState({ modalDate: date });
  }

  onSelectChange(value) {
    this.setState({ modalSelectedValue: value });
  }

  deleteHandler(lessonDetails) {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);
    fetch(`http://localhost:5000/api/v1/lesson_site/delete?uid=${dTok.id}`, {
      method: 'POST',
      body: JSON.stringify({ lesson_id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() =>
      this.setState(prevState => ({
        siteLessons: prevState.siteLessons.filter(
          lesson => lesson.id !== lessonDetails.id
        ),
        otherLessons: [...prevState.otherLessons, lessonDetails]
      }))
    );
  }

  addLessonToSite(lessonId, date) {
    const { siteLessons } = this.state;
    if (!lessonId || !date) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true
      });
    } else {
      const tok = localStorage.getItem('anovaToken');
      const dTok = decode(tok);
      fetch(`http://localhost:5000/api/v1/lesson_site/add?uid=${dTok.id}`, {
        method: 'POST',
        body: JSON.stringify({ lesson_id: lessonId, date }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .then(newLesson => {
          const newSiteLessons = [...siteLessons, { ...newLesson, date }];
          newSiteLessons.sort(
            (siteLesson1, siteLesson2) => siteLesson1.date > siteLesson2.date
          );
          this.setState(prevState => ({
            siteLessons: newSiteLessons,
            otherLessons: prevState.otherLessons.filter(
              otherLesson => otherLesson.id !== lessonId
            ),
            showModal: false,
            modalSelectedValue: '',
            modalDate: ''
          }));
        });
    }
  }

  renderLessons = () => {
    const {
      isMentor,
      siteLessons,
      showModal,
      modalSelectedValue,
      modalDate,
      otherLessons,
      site
    } = this.state;
    let maybeAddCard;
    if (isMentor) {
      maybeAddCard = (
        <div className="plusCard">
          <GoPlus
            onClick={() => this.setState({ showModal: true })}
            size={100}
            color="grey"
          />
          <Modal
            className="addModal"
            title="Add a Lesson"
            centered
            visible={showModal}
            onOk={() => this.addLessonToSite(modalSelectedValue, modalDate)}
            onCancel={() => this.setState({ showModal: false })}
          >
            <div className="addLesson">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a lesson"
                optionFilterProp="children"
                onChange={this.onSelectChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {otherLessons.map(lesson => (
                  <Option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </Option>
                ))}
              </Select>
              <br />
              <div>
                <DatePicker onChange={this.onDateChange} />
              </div>
            </div>
          </Modal>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="lessons_title">
          <h1>{site.schoolName} Lessons</h1>
        </div>
        <div className="lessonsContainer">
          {siteLessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              deleteHandler={this.deleteHandler}
              lessonDetails={lesson}
              pool={false}
              isment={isMentor}
            />
          ))}
          {maybeAddCard}
        </div>
      </div>
    );
  };

  render() {
    const component = this.renderLessons();
    return <div>{component}</div>;
  }
}
export default SiteLessons;