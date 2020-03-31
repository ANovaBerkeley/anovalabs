import React, { Component } from 'react';
import { Modal, Input, Row, Col } from 'antd';
import { GoPlus } from 'react-icons/go';
import '../stylesheets/LessonPool.css';
import LessonCard from './LessonCard';

class LessonPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      mentor: this.props.ismentor,
      showModal: false,
      allLessons: [],
    };
    this.addLessonToPool = this.addLessonToPool.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/lessons/all')
      .then(res => res.json())
      .then(allLessons => {
        this.setState({
          allLessons,
        });
      });
  }

  deleteHandler(lessonDetails) {
    fetch('/api/v1/lessons/delete', {
      method: 'POST',
      body: JSON.stringify({ id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() =>
      this.setState(prevState => ({
        allLessons: prevState.allLessons.filter(item => item.id !== lessonDetails.id),
      })),
    );
  }

  addLessonToPool() {
    const titleAdd = document.getElementById('titleAdd');
    const summaryAdd = document.getElementById('summaryAdd');
    const linkAdd = document.getElementById('linkAdd');

    if (!titleAdd.value || !summaryAdd.value || !linkAdd.value) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
    } else {
      const item = {
        title: titleAdd.value,
        summary: summaryAdd.value,
        link: linkAdd.value,
      };
      fetch('/api/v1/lessons/add', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .then(newLessonInfo => {
          item['id'] = newLessonInfo.id;
          this.setState(prevState => ({
            allLessons: [...prevState.allLessons, item],
            showModal: false,
          }));
        });
    }
  }

  render() {
    const { error, isLoaded, allLessons, mentor, showModal } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    let maybeAddCard;
    if (mentor) {
      maybeAddCard = (
        <div>
          <button
            type="button"
            className="plusCard"
            onClick={() => this.setState({ showModal: true })}
          >
            <GoPlus size={100} color="grey" />
          </button>

          <Modal
            className="addModal"
            title="Add a New Lesson"
            centered
            visible={showModal}
            onOk={() => this.addLessonToPool()}
            onCancel={() => this.setState({ showModal: false })}
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
              <Row>
                <Col>
                  <Input
                    id="linkAdd"
                    allowClear
                    addonBefore="Link:"
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
                deleteHandler={this.deleteHandler}
                lessonDetails={item}
                pool
                isment={this.state.mentor}
              />
            ))}
          {maybeAddCard}
        </div>
      </div>
    );
  }
}
export default LessonPool;
