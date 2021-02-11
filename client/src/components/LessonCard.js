import React, { Component } from 'react';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
import PropTypes from 'prop-types';
// import * as decode from 'jwt-decode';
import { Link } from 'react-router-dom';

import '../stylesheets/LessonCard.css';
// const { TextArea } = Input;
class LessonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNotesModal: false,
      showEditModal: false,
      isMentor: this.props.isment,
      notes: this.props.lessonDetails.notes,
      editedNotes: this.props.lessonDetails.notes,
      lessonId: this.props.lessonDetails.id,
      title: this.props.lessonDetails.title,
      summary: this.props.lessonDetails.summary,
      editedTitle: this.props.lessonDetails.title,
      editedSummary: this.props.lessonDetails.summary,
    };
    this.delete = this.delete.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSummary = this.onChangeSummary.bind(this);
    // this.editLesson = this.editLesson.bind(this);
    this.editLessonDetails = this.editLessonDetails.bind(this);
  }

  delete() {
    const { lessonDetails, deleteHandler } = this.props;
    this.setState({ showModal: false });
    deleteHandler(lessonDetails);
  }

  onChangeNotes(event) {
    this.setState({ editedNotes: event.target.value });
  }

  onChangeTitle(event) {
    this.setState({ editedTitle: event.target.value });
  }

  onChangeSummary(event) {
    this.setState({ editedSummary: event.target.value });
  }

  // editLesson() {
  //   const tok = localStorage.getItem('anovaToken');
  //   const dTok = decode(tok);
  //   let userId;
  //   userId = dTok.id;
  //   const { editedNotes, lessonId } = this.state;
  //   if (editedNotes.length >= 255) {
  //     Modal.error({
  //       title: 'Exceeded maximum number of characters (255).',
  //       centered: true,
  //     });
  //     return;
  //   }
  //   fetch('/api/v1/lesson_site/update', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       editedNotes,
  //       userId,
  //       lessonId,
  //     }),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(values => {
  //       this.setState({
  //         showNotesModal: false,
  //         notes: editedNotes,
  //       });
  //     });
  // }

  editLessonDetails() {
    const { editedTitle, editedSummary, lessonId } = this.state;
    if (editedSummary.length >= 255) {
      Modal.error({
        title: 'Exceeded maximum number of characters (255).',
        centered: true,
      });
      return;
    }
    fetch('/api/v1/lessons/update', {
      method: 'POST',
      body: JSON.stringify({
        editedTitle,
        editedSummary,
        lessonId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(values => {
        this.setState({
          showEditModal: false,
          title: editedTitle,
          summary: editedSummary,
        });
      });
  }

  // renderNotesButton() {
  //   const { isMentor } = this.state;
  //   const { showNotesModal, notes } = this.state;
  //   let notesButton;
  //   if (isMentor) {
  //     notesButton = (
  //       <div>
  //         <Button type="primary" onClick={() => this.setState({ showNotesModal: true })}>
  //           Notes
  //         </Button>
  //         <Modal
  //           visible={showNotesModal}
  //           title="Lesson Notes:"
  //           okText="Update"
  //           onCancel={() => this.setState({ showNotesModal: false })}
  //           onOk={this.editLesson}
  //         >
  //           <Row>
  //             <Col>
  //               <TextArea
  //                 rows={4}
  //                 id="notes"
  //                 addonBefore="Notes:"
  //                 autosize="true"
  //                 defaultValue={notes}
  //                 onChange={this.onChangeNotes}
  //               />
  //             </Col>
  //           </Row>
  //         </Modal>
  //       </div>
  //     );
  //   }
  //   return notesButton;
  // }

  renderEditButton() {
    const { isMentor } = this.state;
    const { showEditModal, title, summary } = this.state;
    let editButton;
    if (isMentor) {
      editButton = (
        <>
          <Button
            type="primary"
            className="lowerButton"
            onClick={() => this.setState({ showEditModal: true })}
          >
            Edit
          </Button>
          <Modal
            visible={showEditModal}
            title="Update Lesson Details:"
            okText="Update"
            onCancel={() => this.setState({ showEditModal: false })}
            onOk={this.editLessonDetails}
          >
            <div className="addFields">
              <Row>
                <Col>
                  <Input
                    id="titleAdd"
                    allowClear
                    addonBefore="Title:"
                    autosize="true"
                    defaultValue={title}
                    onChange={this.onChangeTitle}
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
                    defaultValue={summary}
                    onChange={this.onChangeSummary}
                  />
                </Col>
              </Row>
            </div>
          </Modal>
        </>
      );
    }
    return editButton;
  }

  render() {
    const { showModal, isMentor, title, summary } = this.state;
    const { lessonDetails } = this.props;
    console.log(lessonDetails);
    // let maybeNotesButton;
    let maybeEditButton;
    if (!this.props.pool) {
      // maybeNotesButton = this.renderNotesButton();
    } else {
      maybeEditButton = this.renderEditButton();
    }
    let readableDate = '';
    if (lessonDetails.date && !this.props.pool) {
      readableDate = new Date(lessonDetails.date).toLocaleDateString();
    }
    let maybeDeleteButton;
    if (isMentor) {
      maybeDeleteButton = (
        <Popconfirm
          className="deleteModal"
          title="Delete this Lesson?"
          centered
          visible={showModal}
          onConfirm={() => this.delete()}
          onCancel={() => this.setState({ showModal: false })}
        >
          <button
            className="deleteButton"
            onClick={() => this.setState({ showModal: true })}
            type="button"
          >
            <GoTrashcan size="20" />
          </button>
        </Popconfirm>
      );
    }
    return (
      <div className={this.props.pool ? 'cardPool' : 'card'}>
        <div className="titleContainer">
          <div className="lessonTitle">{title}</div>
          {maybeDeleteButton}
        </div>
        {readableDate && <div className="date">{readableDate}</div>}
        <div className="descriptionContainer">
          <div className="description">{summary}</div>
        </div>
        <div className="buttonContainer">
          {maybeEditButton}
          <Link to={'/LessonPage/' + this.state.lessonId}>
            <button className="lowerButton">View Assignment</button>
          </Link>
        </div>
      </div>
    );
  }
}
LessonCard.propTypes = {
  deleteHandler: PropTypes.func,
};
LessonCard.defaultProps = {};
export default LessonCard;
