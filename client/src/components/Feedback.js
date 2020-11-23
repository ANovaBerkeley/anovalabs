import React, { Component } from 'react';
import '../stylesheets/FeedbackPage.css';
import { Redirect } from "react-router-dom";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.matchParam,
      text: null,
      rating: null,
      isMentor: this.props.ismentor,
      uid: this.props.userid,
      submitted: false
    };
  }
  componentDidMount() {
    // const get_url = '/api/v1/lessons/get_feedback/';
    // fetch(get_url + '?lessonId=' + this.state.lessonId)
    //   .then(res => res.json())
    //   .then(
    //     feedback => {
    //       this.setState({
    //         isLoaded: true,
    //         notes: feedback.mentor_feedback,
    //       });
    //     },
    //     error => {
    //       this.setState({
    //         isLoaded: true,
    //         error,
    //       });
    //     },
    //   );
  }

  submitFeedback() {
    fetch('/api/v1/feedback/submit_feedback', {
      method: 'POST',
      body: JSON.stringify({
        user_id: this.state.uid,
        lesson_id: this.state.lessonId,
        text: this.state.text,
        rating: this.state.rating,
        mentor: this.state.isMentor
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({submitted: true}));
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
    if (this.state.submitted) {
      return <Redirect to='/LessonPool'/>
    }
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
          <button className="rate" onClick={() => this.setState({rating: 1})} type="button">
            1
          </button>
          <button className="rate" onClick={() => this.setState({rating: 2})} type="button">
            2
          </button>
          <button className="rate" onClick={() => this.setState({rating: 3})} type="button">
            3
          </button>
          <button className="rate" onClick={() => this.setState({rating: 4})} type="button">
            4
          </button>
          <button className="rate" onClick={() => this.setState({rating: 5})} type="button">
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
