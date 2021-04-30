import React, { Component } from 'react';
import '../stylesheets/FeedbackPage.css';
import { Redirect } from 'react-router-dom';
import { text } from 'body-parser';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'


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
      submitted: false,
      exists: false
    };
  }
  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    var {id} = decode(getAnovaToken());
    var id_str = id.toString();
    this.setState({uid: id_str});
    console.log(id_str);
    const get_url = '/api/v1/feedback/get_feedback/';
    console.log(get_url + id_str+ "?lesson_id="   +this.state.lessonId)
    fetch(get_url + id_str+ "?lesson_id=" + this.state.lessonId)
    .then(res => res.json())
    .then(  
      result => {
        if (result.data.length > 0) {
          console.log(result)
          this.setState({text: result.data[0].text, gtext: result.data[0].gtext, rating: result.data[0].rating, exists: true})
        }
        
    
      },
      error => {
        console.log("no match found");
      },
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
  summaryFeedback() {

  return (
    <Modal
      closeIcon
      open={this.state.showModal}
      trigger={<Button>summaryButton</Button>}
      onClose={() => this.setState({showModal: false})}
      onOpen={() => this.setState({showModal: true})}
    >
      <Header icon='archive' content='Feedback' />
      <Modal.Content>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='blue' onClick={() => this.setState({showModal: false})}>
          <Icon name='checkmark' /> Return Home
        </Button>
      </Modal.Actions>
    </Modal>
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
        gtext: this.state.gtext
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({ submitted: true }));
  }
 
  updateFeedback() {
    const { text, gtext, rating, uid, lid } = this.state;
    fetch('/api/v1/feedback/update', {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        gtext: gtext,
        uid: uid,
        rating: rating
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
        <div className="feedbackBoxContainer">
          {console.log(this.state.isMentor)}
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
            defaultValue={this.state.gtext}
            // TODO: create API call to fetch previous feedback if it exists and set value=prevfeedback
            onChange={event => this.setState({ gtext: event.target.value })}
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
        {this.state.isMentor? 
            <div>
              <button
                className="summaryButton"
                onClick={() => this.summaryFeedback()}
                type="button"
        >
              Summary
              </button>

            <button
                className="submitButton"
                onClick={() => this.updateFeedback()}
                type="button"
        >
              Submit Feedback
          </button></div> :
          <button
          className="submitButton"
          onClick={() => this.updateFeedback()}
          type="button"
        >
          Submit Feedback

        </button>
        }

          

        <button
          className="submitButton"
          onClick={() => {this.state.exists ? this.updateFeedback() : this.submitFeedback()}}
          type="button"
        >
          {this.state.exists ? 'Save Feedback Changes' : 'Submit Feedback'}
        </button>
      </div>
    );
  }
}
 
Feedback.defaultProps = {};
export default Feedback;