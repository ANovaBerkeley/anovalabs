import React, { Component } from 'react';
import '../stylesheets/FeedbackPage.css';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { Redirect } from 'react-router-dom';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';
import FeedbackModal from "./FeedbackModal";


class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonId: this.props.id,
      showModal: false,
      text: "",
      gtext: "",
      rating: null,
      isMentor: this.props.ismentor,
      uid: this.props.userid,
      title: "",
      site: "",
      submitted: false,
      exists: false
    };
  }
  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var {id} = decode(getAnovaToken());

    fetch(`/api/v1/site/current?uid=${d_tok.id}`)
      .then(res => res.json())
      .then(siteFound => {
        this.setState({site: siteFound.schoolName})
      });

    fetch('/api/v1/lessons/' + this.state.lessonId + '?id=' + this.state.lessonId)
    .then(res => res.json())
    .then(lesson => {
        console.log(lesson[0].title);
        this.setState({title: lesson[0].title});
    })

    var id_str = id.toString();
    this.setState({uid: id_str});
    const get_url = '/api/v1/feedback/get_feedback/';
    fetch(get_url + id_str+ "?lesson_id=" + this.state.lessonId + "&uid=" + id_str)
    .then(res => res.json())
    .then(  
      result => {
        if (result.data.length > 0) {
          this.setState({text: result.data[0].text, gtext: result.data[0].gtext, rating: result.data[0].rating, exists: true})
        }
      },
      error => {
        console.log("no match found");
      },
    )
  }

  getClassFeedback() {
    fetch('/api/v1/feedback/get_class_feedback/' + "?class=" + this.state.site + "&lesson_id=" + this.state.lessonId)
    .then(res => res.json())
    .then(
      result => {
        console.log(result)
      }
    )
  }
  
  

  submitFeedback() {
    fetch('/api/v1/feedback/submit_feedback', {
      method: 'POST',
      body: JSON.stringify({
        uid: this.state.uid,
        lesson_id: this.state.lessonId,
        text: this.state.text,
        rating: this.state.rating,
        mentor: this.state.isMentor,
        gtext: this.state.gtext,
        site_name: this.state.site
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({ submitted: true }));
  }
 
  updateFeedback() {
    const { text, gtext, rating, uid, lessonId } = this.state;
    fetch('/api/v1/feedback/update', {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        gtext: gtext,
        uid: uid,
        rating: rating,
        lessonId: lessonId
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({ submitted: true }));
  }
 
  render() {
    if (this.state.submitted) {
      return <Redirect to="/SiteLessons" />;
    }
    return (
      <div className="page">
        <h1 id="lessonTitle">{this.state.title}</h1>
        <div className="feedbackBoxContainer">
          <h3>What did you think of today's lesson?</h3>
          <textarea
            className="feedbackTextarea"
            placeholder="Add feedback"
            defaultValue={this.state.text}
            onChange={event => this.setState({ text: event.target.value })}
          ></textarea>
        </div>
        <div className="feedbackBoxContainer">
          <h3>General Feedback/Thoughts?</h3>
          <textarea
            className="feedbackTextarea"
            placeholder="Add feedback"
            defaultValue={this.state.gtext}
            onChange={event => this.setState({ gtext: event.target.value })}
          ></textarea>
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
        
        <div className = "feedbackButtons">
          {this.state.isMentor ?
            <FeedbackModal 
              lesson_id={this.state.lessonId} 
              title={this.state.title}
              getClassFeedback={this.getClassFeedback}
              site={this.state.site}
            /> : 
            null
          }
          <button
            className="submitButton"
            onClick={() => {this.state.exists ? this.updateFeedback() : this.submitFeedback()}}
            type="button"
          >
            {this.state.exists ? 'Save Changes' : 'Submit Feedback'}
          </button>
          {/*<button onClick= {() => this.getClassFeedback()}>Get all feedback</button>*/}
        </div> 
      </div>
    );
  }
}
 
Feedback.defaultProps = {};
export default Feedback;