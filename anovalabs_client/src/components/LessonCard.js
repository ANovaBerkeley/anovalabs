import React, { Component } from 'react';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
import PropTypes from 'prop-types';
import * as decode from 'jwt-decode';

import '../stylesheets/LessonCard.css';
const { TextArea } = Input;
class LessonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNotesModal: false,
      isMentor: this.props.isment,
      notes: this.props.lessonDetails.notes,
      editedNotes: this.props.lessonDetails.notes,
      lessonId: this.props.lessonDetails.id,

    };
    this.delete = this.delete.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.editLesson = this.editLesson.bind(this);
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    console.log(this.props.lessonDetails);

  }

  delete() {
    const { lessonDetails, deleteHandler } = this.props;
    this.setState({ showModal: false });
    deleteHandler(lessonDetails);
  }

  onChangeNotes(event) {
      this.setState({ editedNotes: event.target.value });

    }

    editLesson() {
      const tok = localStorage.getItem('anovaToken');
      const dTok = decode(tok);
      let userId;
      userId = dTok.id;
      const { editedNotes, lessonId } = this.state;
      if (editedNotes.length >= 255) {
        Modal.error({
          title: 'Exceeded maximum number of characters (255).',
          centered: true
        });
        return;
      }
      fetch('http://localhost:5000/api/v1/lesson_site/update', {
        method: 'POST',
        body: JSON.stringify({
          editedNotes,
          userId,
          lessonId
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .then(values => {
          this.setState({
            showNotesModal: false,
            notes: editedNotes
          });
        });
    }

    renderNotesButton() {
      const { isMentor } = this.state;
      const { showNotesModal, notes, editedNotes } = this.state;
      let notesButton;
      if (isMentor) {
        notesButton = (
          <div>
            <Button
              type="primary"
              onClick={() => this.setState({ showNotesModal: true })}
            >
              Notes
            </Button>
            <Modal
              visible={showNotesModal}
              title="Lesson Notes:"
              okText="Update"
              onCancel={() => this.setState({ showNotesModal: false })}
              onOk={this.editLesson}
            >
              <Row>
                <Col>
                  <TextArea
                    rows={4}
                    id="notes"
                    addonBefore="Notes:"
                    autosize
                    defaultValue={notes}
                    onChange={this.onChangeNotes}
                  />
                </Col>
              </Row>
            </Modal>
          </div>
        );
      }
      return notesButton;
    }

  render() {
    const { showModal, isMentor } = this.state;
    const { lessonDetails } = this.props;
    let maybeNotesButton;
    if (!this.props.pool) {
       maybeNotesButton = this.renderNotesButton();
    }
    let readableDate = '';
    if (lessonDetails.date && !this.props.pool) {
      readableDate = new Date(lessonDetails.date).toLocaleDateString();
    }
    let maybeDeleteButton;
    if (isMentor) {
      maybeDeleteButton =
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
    }
    return (
      <div className="card">
        <div className="titleContainer">
          <div className="lessonTitle">{lessonDetails.title}</div>
          {maybeDeleteButton}
        </div>
        <div className="date">{readableDate}</div>
        <div className="descriptionContainer">
          <div className="description">{lessonDetails.summary}</div>
        </div>
        <div>
           {maybeNotesButton}
           </div>
        <div className="buttonContainer">
          <div className="viewAssignment">
            <a href={lessonDetails.link}>View Assignment</a>
          </div>
        </div>
      </div>
    );
  }
}
LessonCard.propTypes = {
  deleteHandler: PropTypes.func
};
LessonCard.defaultProps = {};
export default LessonCard;
