import React, { Component } from 'react';
import { Avatar, List, Button, Modal, Row, Col } from 'antd';
import { DatePicker, Checkbox } from 'antd';
import { GoPlus } from 'react-icons/go';
import LessonComponent from './LessonComponent';
import MentorLessonComponent from './MentorLessonComponent';

import '../stylesheets/Lessons.css';

// TODO: Need to show lessons based on user's assigned ID'
// TODO: display site name at top
class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      mentor: true,
      showModal: false,
      siteLessons: [],
      allLessons: []
    };
  }

  // TODO
  // add protocol for when component doesn't mount
  // add is loaded: false handling in comopnent did mount
  // add documentation for each function

  // calls API setting state + preparing lessons
  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lesson_site/all')
      .then(res => res.json())
      .then(siteLessons => {
          this.setState({
            siteLessons
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    fetch('http://localhost:5000/api/v1/lessons/all')
      .then(res => res.json())
      .then(
        allLessons => {
          this.setState({
            allLessons
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  showModal(bool) {
    this.setState({ showModal: bool });
  }

  addLesson(item) {
    console.log(item);
    fetch('http://localhost:5000/api/v1/lesson_site/add', {
      method: 'POST',
      body: JSON.stringify({ lesson_id: item.id}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(_ => {
        this.showModal(false);
        this.setState(prevState => ({
          siteLessons: [...prevState.siteLessons, item]
        }));
      });
  }

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  onChangeCheck(e) {

    console.log('checked = ', e.target.checked);
  }

  // TODO: make items more descriptions .mentor should be is mentor (make smol function)
  // eg site lessons
  renderLessons = () => {
    const {
      mentor,
      siteLessons,
      allLessons,
      addLesson,
      showModal
    } = this.state;
    if (!mentor) {
      return (
        <div className="container">
          <div className="lessonsContainer">
            {siteLessons.map(item => (
              <LessonComponent lessonDetails={item} />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="lessonsContainer">
          {siteLessons.map(item => (
            <MentorLessonComponent lessonDetails={item} />
          ))}
          <div className="plusCard">
            <GoPlus
              onClick={() => this.showModal(true)}
              size={100}
              color="grey"
            />
            <Modal
              className="addModal"
              title="Add a Lesson"
              centered
              visible={showModal}
              onOk={() => this.applyChanges()}
              onCancel={() => this.showModal(false)}
            >
              <div className="addLesson">
                <List
                  dataSource={allLessons}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<p>{item.title}</p>}
                        description={item.summary}
                      />
                      <div> <DatePicker onChange={this.onChange}/> </div>
                      <div>
                        <Avatar
                          className="addButton"
                          onClick={() => this.addLesson(item)}
                          icon="plus-circle"
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  };

  // TODO: display loading/error message
  render() {
    const component = this.renderLessons();
    return <div>{component}</div>;
  }
}
export default Lessons;
