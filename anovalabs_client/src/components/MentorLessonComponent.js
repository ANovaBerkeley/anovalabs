import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import { GoTrashcan } from 'react-icons/go';

import '../stylesheets/MentorLessonComponent.css';

// TODO: Need to show lessons based on user's assigned ID'
class LessonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      showModal: false,
      items: []
    };
    this.showModal = this.showModal.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lessons/all')
      .then(res => res.json())
      .then(allLessons => {
          this.setState({
            isLoaded: true,
            items: allLessons
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

  showModal() {
    this.setState({ showModal: true });
  }

  delete() {
    const showModal = false;

    fetch('http://localhost:5000/api/v1/lessons/delete',
      { method: 'POST',
        body: JSON.stringify({ title: this.props.lessonDetails.title}),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(res => res.json())
      .then(deleteLesson => {
          this.setState({ showModal: false });
      });

    this.setState(state => {
      const items = state.items.filter(
        item => item.id != this.props.lessonDetails.id
      );
      return {
        items,
        showModal
      };
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const readableDate = new Date(this.props.lessonDetails.date).toLocaleDateString();
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="card">
        <div className="titleContainer">
          <div className="lessonTitle">{this.props.lessonDetails.title}</div>
          <Popconfirm
            className="deleteModal"
            title="Delete this Lesson?"
            centered
            visible={this.state.showModal}
            onConfirm={() => this.delete()}
            onCancel={() => this.setState({ showModal: false })}
          >
            <button
              className="deleteButton"
              onClick={() => this.showModal(true)}
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
export default LessonComponent;
