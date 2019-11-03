
import React, { Component } from 'react';

import '../stylesheets/MentorLessonComponent.css';
import { Modal, Input, Button, Row, Col, Avatar } from 'antd';


import { GoPlus } from 'react-icons/go';
import { GoTrashcan } from 'react-icons/go';
// TODO: Need to show lessons based on user's assigned ID'
class LessonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      showModal: false
    };
    this.showModal = this.showModal.bind(this);
    this.delete = this.delete.bind(this);
  }

  showModal(){
    this.setState({showModal:true});
  }

  delete() {
    var showModal = false;
    console.log(this.props.lessonDetails.title);


    fetch('http://localhost:5000/api/v1/lessons/delete',
      { method: 'POST',
        body: JSON.stringify({ title: this.props.lessonDetails.title}),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(res => res.json())
      .then(
        deleteLesson => {
          this.setState({ showModal: false });
      });

    return {
      showModal
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const readable_date = new Date(this.props.lessonDetails.date).toLocaleDateString();
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    //TODO: popup for confirmation + onclick call delete api
        return (
              // <li key={123}>
              // <GoPlus/>
              // </li>
              <div className = "card">

                <div className = "titleContainer">
                  <div className = "lessonTitle">
                  {this.props.lessonDetails.title}

                  </div>
                  <button className = "deleteButton" onClick = {() => this.showModal(true)} >
                    <GoTrashcan size="20"/>
                  </button>
                  <Modal
                    className="deleteModal"
                    title="Delete this Lesson?"
                    centered
                    visible={this.state.showModal}
                    onOk={() => this.delete()}
                    onCancel={() => this.setState({showModal:false})}
                  >
                  </Modal>



                </div>
                <div className = "date">{readable_date}</div>
                <div className = "descriptionContainer">
                  <div className = "description">{this.props.lessonDetails.summary}</div>
                </div>
                <div className = "buttonContainer">
                  <div className = "viewAssignment">
                    <a href={this.props.lessonDetails.link}>View Assignment</a>
                  </div>



                </div>

              </div>
        );
  }
}
export default LessonComponent;
