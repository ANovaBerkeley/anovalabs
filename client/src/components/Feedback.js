import React, { Component } from 'react';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
import PropTypes from 'prop-types';
import * as decode from 'jwt-decode';
import '../stylesheets/FeedbackPage.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.matchParam,
      text: null,
      rating: null,
      isMentor: this.props.ismentor,
      uid: this.props.userid,
    };
  }
  componentDidMount() {
    var get_url = '/api/v1/lessons/get_feedback/';
    fetch(get_url + '?lessonId=' + this.lessonId)
      .then(res => res.json())
      .then(
        feedback => {
          this.setState({
            isLoaded: true,
            notes: feedback.mentor_feedback,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  submitFeedback() {
    var get_url = '/api/v1/feedback/submit_feedback/';
  }

  updateFeedback() {
    const { editedText, editedRating, uid, lid } = this.state;

    fetch('/api/v1/feedback/update', {
      method: 'POST',
      body: JSON.stringify({
        editedText,
        editedRating,
        uid,
        lid,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(values => {
        this.setState({
          showEditModal: false,
          text: editedText,
          rating: editedRating,
        });
      });
  }

  render() {
<<<<<<< Updated upstream
=======
    console.log(this.state.uid);
    console.log(this.state.text);
>>>>>>> Stashed changes
    return (
      <div className="page">
        <div className="feedbackBoxContainer">
          <h3>What did you think of today's lesson?</h3>
          <input
            className="feedbackInput"
            type="text"
            placeholder="Add feedback"
            // TODO: create API call to fetch previous feedback if it exists and set value=prevfeedback
            onChange={event => this.setState({ text: event.target.value })}
          ></input>
        </div>
        <div className="ratingContainer">
          <h3>Rate today's lesson on a scale from 1-5!</h3>
          <button className="rate" onClick={() => (this.rating = 1)} type="button">
            1
          </button>
          <button className="rate" onClick={() => (this.rating = 2)} type="button">
            2
          </button>
          <button className="rate" onClick={() => (this.rating = 3)} type="button">
            3
          </button>
          <button className="rate" onClick={() => (this.rating = 4)} type="button">
            4
          </button>
          <button className="rate" onClick={() => (this.rating = 5)} type="button">
            5
          </button>
        </div>
        <button
          className="submitButton"
          onClick={() => this.submitFeedback()}
          type="button"
        >
          Submit Feedback
        </button>
      </div>
    );
  }
}

Feedback.defaultProps = {};
export default Feedback;
