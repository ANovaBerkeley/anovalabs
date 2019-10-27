import React, { Component } from 'react';
import LessonComponent from './LessonComponent';
import MentorLessonComponent from './MentorLessonComponent';
import { Avatar, List, Button, Modal, Row, Col } from 'antd';

import '../stylesheets/Lessons.css';
import { GoPlus } from 'react-icons/go';

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
      items: [],
      newLessons: []
    };
  }


  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lessons')
      .then(res => res.json())
      .then(siteLessons => {
          this.setState({
            items: siteLessons
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
      )

  }

  showModal(bool) {
    this.setState({ showModal: bool });
  }

  addLesson(item) {
    fetch('http://localhost:5000/api/v1/lessons/add',
      { method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(res => res.json())
      .then(
        addedLesson => {
          console.log(addedLesson);
          this.setState(state => {
          // const items = state.items.concat(item);
          this.showModal(false);
          // return {
          //   items
          // }
        })
      }); //unclear


  }

  renderLessons = () => {

    if (!this.state.mentor) {
      return (
        <div className = "container">
          <div className = "lessonsContainer">
            {this.state.items.map(item => (
              <LessonComponent lessonDetails={item}></LessonComponent>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className = "container">
          <div className = "lessonsContainer">

            {this.state.items.map(item => (
              <MentorLessonComponent lessonDetails={item}></MentorLessonComponent>
            ))}

            <div className = "plusCard">
              <GoPlus onClick={() => this.showModal(true)}size = {100} color='grey'/>
              <Modal
                  className="addModal"
                  title="Add a Lesson"
                  centered
                  visible={this.state.showModal}
                  onOk={() => this.applyChanges()}
                  onCancel={() => this.showModal(false)}
              >
                  <div className="addLesson">
                        <List
                          dataSource = {this.state.newLessons}
                          renderItem={item => (
                            <List.Item >
                              <List.Item.Meta
                                title={<p>{item.title}</p>}
                                description={item.summary}
                              />
                              <div>
                                <Avatar className = "addButton" onClick = {()=> this.addLesson(item)} icon = "plus-circle"></Avatar>
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
    }
  }

// TODO: display loading/error message
  render() {
    let component = this.renderLessons();
    return (
      <div>
      {component}
      </div>
    );
  }
}
export default Lessons;
