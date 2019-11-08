import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import { GoTrashcan } from 'react-icons/go';

import '../stylesheets/MentorLessonComponent.css';

// TODO: Need to show lessons based on user's assigned ID
// TODO: only show date if for site specific lessons page
// TODO: different delete API calls depending on page
class MentorLessonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.deleteFromAllLessons = this.deleteFromAllLessons.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  deleteFromAllLessons() {
    fetch('http://localhost:5000/api/v1/lessons/delete', {
      method: 'POST',
      body: JSON.stringify({ title: this.props.lessonDetails.title }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() => this.showModal(false));

    this.props.deleteHandler(this.props.lessonDetails);
  }

  render() {
    const { showModal } = this.state;
    let readableDate = '';
    if (this.props.lessonDetails.date) {
      readableDate = new Date(this.props.lessonDetails.date).toLocaleDateString();
    }
    return (
      <div className="card">
        <div className="titleContainer">
          <div className="lessonTitle">{this.props.lessonDetails.title}</div>
          <Popconfirm
            className="deleteModal"
            title="Delete this Lesson?"
            centered
            visible={showModal}
            onConfirm={() => this.deleteFromAllLessons()}
            onCancel={() => this.showModal(false)}
          >
            <button
              className="deleteButton"
              onClick={() => this.showModal(true)}
              type="button"
            >
              <GoTrashcan size="20" />
            </button>
          </Popconfirm>
        </div>
        <div className="date">{readableDate}</div>
        <div className="descriptionContainer">
          <div className="description">{this.props.lessonDetails.summary}</div>
        </div>
        <div className="buttonContainer">
          <div className="viewAssignment">
            <a href={this.props.lessonDetails.link}>View Assignment</a>
          </div>
        </div>
      </div>
    );
  }
}
export default MentorLessonComponent;
