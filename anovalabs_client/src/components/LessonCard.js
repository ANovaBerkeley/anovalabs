import React, { Component } from 'react';
import { Popconfirm, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan, GoInfo, GoPlus } from 'react-icons/go';
import PropTypes from 'prop-types';
import * as decode from 'jwt-decode';

import '../stylesheets/LessonCard.css';

class LessonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showEditModal: false,
      isMentor: this.props.isment
    };
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);

  }

  delete() {
    const { lessonDetails, deleteHandler } = this.props;
    this.setState({ showModal: false });
    deleteHandler(lessonDetails);
  }

  render() {
    const { showEditModal, showModal, isMentor } = this.state;
    const { lessonDetails } = this.props;
    let readableDate = '';
    if (lessonDetails.date && !this.props.pool) {
      readableDate = new Date(lessonDetails.date).toLocaleDateString();
    }
    let maybeDeleteButton;
    let maybeAddCard;
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
        <Modal
            className="addModal"
            title="Add a New Lesson"
            centered
            visible={showEditModal}
            onOk={() => this.addLessonToPool()}
            onCancel={() => this.setState({ showEditModal: false })}
          >
            <div className="addFields">
              <Row>
                <Col>
                  <Input
                    id="titleAdd"
                    allowClear
                    addonBefore="Title:"
                    autosize
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
        <div className ="editButton">
          <button
              className="editButton"
              onClick={() => this.setState({ showEditModal: true })}
              type="button"
            >
              <GoInfo size="20" />
          </button>
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
