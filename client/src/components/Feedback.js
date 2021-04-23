import React, { Component } from 'react';
import '../stylesheets/FeedbackPage.css';
import { Redirect } from 'react-router-dom';
import { text } from 'body-parser';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.id,
      text: "",
      rating: null,
      isMentor: this.props.ismentor,
      uid: this.props.userid,
      submitted: false,
    };
  }
  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var {id} = decode(getAnovaToken());
    var id_str = id.toString();
    this.setState({uid: id_str});
    console.log(id_str);
    const get_url = '/api/v1/feedback/get_feedback';
    fetch(get_url)
    .then(res => res.json())
    .then(  
      result => {
        console.log(result)
        this.setState({text: result.data[0].text, rating: result.data[0].rating})
      }
    )

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
        mentor: this.state.isMentor,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({ submitted: true }));
  }
 
  updateFeedback() {
    const { text, rating, uid, lid } = this.state;
    console.log(text);
    console.log("UID"+uid);
    console.log(this.state);
    fetch('/api/v1/feedback/update', {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        uid: uid,
        rating: rating
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
  }
 
  render() {
    if (this.state.submitted) {
      return <Redirect to="/SiteLessons" />;
    }
    return (
      <div className="page">
        <div className="feedbackBoxContainer">
          <h3>What did you think of today's lesson?</h3>
          <input
            className="feedbackInput"
            type="text"
            placeholder="Add feedback"
            defaultValue={this.state.text}
            // TODO: create API call to fetch previous feedback if it exists and set value=prevfeedback
            onChange={event => this.setState({ text: event.target.value })}
          ></input>
        </div>
        <div className="feedbackBoxContainer">
          <h3>General Feedback/Thoughts?</h3>
          <input
            className="feedbackInput"
            type="text"
            placeholder="Add feedback"
            defaultValue={this.state.text}
            // TODO: create API call to fetch previous feedback if it exists and set value=prevfeedback
            onChange={event => this.setState({ text: event.target.value })}
          ></input>
        </div>
        <div className="ratingContainer">
          <h3 className="rateText">Rate today's lesson on a scale from 1-5!</h3>
          <div className="buttonContainer">
            <button
              className={this.state.rating === 1 ? 'rate-selected' : 'rate'}
              onClick={() => this.setState({ rating: 1 })}
              type="button"
            >
              1
            </button>
            <button
              className={this.state.rating === 2 ? 'rate-selected' : 'rate'}
              onClick={() => this.setState({ rating: 2 })}
              type="button"
            >
              2
            </button>
            <button
              className={this.state.rating === 3 ? 'rate-selected' : 'rate'}
              onClick={() => this.setState({ rating: 3 })}
              type="button"
            >
              3
            </button>
            <button
              className={this.state.rating === 4 ? 'rate-selected' : 'rate'}
              onClick={() => this.setState({ rating: 4 })}
              type="button"
            >
              4
            </button>
            <button
              className={this.state.rating === 5 ? 'rate-selected' : 'rate'}
              onClick={() => this.setState({ rating: 5 })}
              type="button"
            >
              5
            </button>
          </div>
        </div>
        <button
          className="submitButton"
          onClick={() => this.updateFeedback()}
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